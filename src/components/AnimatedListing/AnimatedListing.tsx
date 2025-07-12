import * as sdk from "@telegram-apps/sdk-react";
import { Cell } from "@telegram-apps/telegram-ui";
import { motion } from "framer-motion";
import type { FC } from "react";

interface AnimatedListingProps {
  title: string;
  description: string;
  icon: string;
  telegramUrl: string;
  index: number;
}

export const AnimatedListing: FC<AnimatedListingProps> = ({
  title,
  description,
  icon,
  telegramUrl,
  index,
}) => {
  const handleClick = () => {
    try {
      // Try to open in Telegram first
      sdk.openTelegramLink(telegramUrl);
    } catch (error) {
      // Fallback to regular window.open
      window.open(telegramUrl, "_blank");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: "easeOut",
      }}
      whileHover={{
        scale: 1.02,
        transition: { duration: 0.2 },
      }}
      whileTap={{ scale: 0.98 }}
      onClick={handleClick}
      style={{ cursor: "pointer" }}
    >
      <Cell
        before={
          <div
            style={{
              fontSize: "24px",
              width: "40px",
              height: "40px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "var(--tg-theme-secondary-bg-color)",
              borderRadius: "12px",
            }}
          >
            {icon}
          </div>
        }
        subtitle={description}
        style={{
          transition: "all 0.2s ease",
        }}
      >
        {title}
      </Cell>
    </motion.div>
  );
};
