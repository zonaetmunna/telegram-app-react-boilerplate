import { miniApp, useLaunchParams, useSignal } from "@telegram-apps/sdk-react";
import { AppRoot } from "@telegram-apps/telegram-ui";
import { motion } from "framer-motion";
import { HashRouter, Navigate, Route, Routes } from "react-router-dom";

import { ErrorBoundary } from "@/components/ErrorBoundary.tsx";
import { LoadingScreen } from "@/components/LoadingScreen/LoadingScreen.tsx";
import { getFilteredRoutes } from "@/navigation/routes.tsx";
import { useEffect, useState } from "react";

function AppRoutes() {
  const [isLoading, setIsLoading] = useState(true);
  const environment = import.meta.env.DEV ? 'development' : 'production';
  const filteredRoutes = getFilteredRoutes(false, environment);

  useEffect(() => {
    // Simulate app initialization
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Routes>
        {filteredRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={<route.Component />} />
        ))}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </motion.div>
  );
}

function ErrorFallback({ error }: { error: unknown }) {
  const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
  const errorStack = error instanceof Error ? error.stack : undefined;

  return (
    <div
      style={{
        padding: "20px",
        textAlign: "center",
        backgroundColor: "var(--tg-theme-secondary-bg-color)",
        borderRadius: "12px",
        margin: "20px",
      }}
    >
      <h2 style={{ color: "var(--tg-theme-destructive-text-color)", marginBottom: "16px" }}>
        Something went wrong
      </h2>
      <p style={{ color: "var(--tg-theme-subtitle-text-color)", marginBottom: "16px" }}>
        {errorMessage}
      </p>
      <button
        onClick={() => window.location.reload()}
        style={{
          background: "var(--tg-theme-button-color)",
          color: "var(--tg-theme-button-text-color)",
          border: "none",
          padding: "10px 20px",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        Reload App
      </button>
      {import.meta.env.DEV && errorStack && (
        <details style={{ marginTop: "16px", textAlign: "left" }}>
          <summary style={{ color: "var(--tg-theme-hint-color)", cursor: "pointer" }}>
            Error details (Development only)
          </summary>
          <pre
            style={{
              background: "var(--tg-theme-bg-color)",
              padding: "10px",
              borderRadius: "6px",
              marginTop: "8px",
              fontSize: "12px",
              overflow: "auto",
            }}
          >
            {errorStack}
          </pre>
        </details>
      )}
    </div>
  );
}

export function App() {
  const lp = useLaunchParams();
  const isDark = useSignal(miniApp.isDark);

  // Safely get platform with type checking
  const platform = (typeof lp?.platform === 'string' && ["macos", "ios"].includes(lp.platform)) ? "ios" : "base";

  return (
    <ErrorBoundary fallback={ErrorFallback}>
      <AppRoot
        appearance={isDark ? "dark" : "light"}
        platform={platform}
      >
        <HashRouter future={{ v7_relativeSplatPath: true }}>
          <AppRoutes />
        </HashRouter>
      </AppRoot>
    </ErrorBoundary>
  );
}
