import { Caption, Title } from "@telegram-apps/telegram-ui";
import { motion } from "framer-motion";
import { type FC } from "react";

export const LoadingScreen: FC = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        padding: "20px",
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          style={{
            width: "60px",
            height: "60px",
            border: "3px solid var(--tg-theme-hint-color)",
            borderTop: "3px solid var(--tg-theme-accent-text-color)",
            borderRadius: "50%",
            marginBottom: "20px",
          }}
        />
        <Title level="3" style={{ marginBottom: "8px", textAlign: "center" }}>
          Loading...
        </Title>
        <Caption style={{ textAlign: "center", opacity: 0.7 }}>
          Initializing your Telegram Mini App
        </Caption>
      </motion.div>
    </div>
  );
}; 