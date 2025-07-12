import { retrieveLaunchParams } from "@telegram-apps/sdk-react";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";

import { EnvUnsupported } from "@/components/EnvUnsupported.tsx";
import { Root } from "@/components/Root.tsx";
import { getEnvironmentInfo, init, isTelegramEnvironment } from "@/init.ts";

import "@telegram-apps/telegram-ui/dist/styles.css";
import "./index.css";

// Mock the environment in case we are outside Telegram (development only)
if (import.meta.env.DEV) {
  import("./mockEnv.ts");
}

const root = ReactDOM.createRoot(document.getElementById("root")!);

// Initialize the app with proper error handling
async function initializeApp() {
  try {
    // Get environment information
    const envInfo = getEnvironmentInfo();
    console.log("🔍 Environment Info:", envInfo);

    // Check if we're in a Telegram environment
    const isTelegram = isTelegramEnvironment();
    
    if (!isTelegram && !import.meta.env.DEV) {
      // In production, if not in Telegram, show unsupported message
      console.warn("❌ Not running in Telegram environment in production");
      root.render(<EnvUnsupported />);
      return;
    }

    // Try to get launch params safely
    let launchParams = null;
    try {
      launchParams = retrieveLaunchParams();
    } catch (error) {
      console.warn("⚠️ Failed to retrieve launch params:", error);
      // Continue with initialization even without launch params
    }

    // Determine if we should enable debug mode
    const debugMode = import.meta.env.DEV || 
                      (launchParams?.startParam === "debug") ||
                      (new URLSearchParams(window.location.search).get("debug") === "true");

    // Initialize the Telegram Mini App
    init(debugMode);

    // Wait a bit for initialization to complete
    await new Promise(resolve => setTimeout(resolve, 500));

    // If we have window.Telegram.WebApp, call ready()
    if (window.Telegram?.WebApp) {
      try {
        window.Telegram.WebApp.ready();
        console.log("✅ Telegram WebApp ready() called");
      } catch (error) {
        console.warn("⚠️ Failed to call WebApp.ready():", error);
      }
    }

    // Render the app
    root.render(
      <StrictMode>
        <Root />
      </StrictMode>
    );

    console.log("✅ App rendered successfully");
  } catch (error) {
    console.error("❌ Failed to initialize app:", error);
    
    // Show error component or fallback
    root.render(
      <StrictMode>
        <EnvUnsupported />
      </StrictMode>
    );
  }
}

// Start the initialization
initializeApp();
