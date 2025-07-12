import {
	Caption,
	Cell,
	List,
	Section,
	Title,
} from "@telegram-apps/telegram-ui";
import { motion } from "framer-motion";
import type { FC } from "react";

import { Page } from "@/components/Page.tsx";
import { APP_CONFIG } from "@/config/app";

export const IndexPage: FC = () => {
  const openTelegramLink = (url: string) => {
    try {
      window.open(url, "_blank");
    } catch (error) {
      console.error("Failed to open Telegram link:", error);
    }
  };

  return (
    <Page back={false}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Header Section with User Info */}
        <Section
          style={{
            textAlign: "center",
            padding: "20px",
            background: "var(--tg-theme-secondary-bg-color)",
            borderRadius: "16px",
            margin: "16px",
          }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Title level="1" style={{ marginBottom: "8px" }}>
              {APP_CONFIG.title}
            </Title>
            <Caption style={{ marginBottom: "4px" }}>
              by {APP_CONFIG.name}
            </Caption>
            <Caption style={{ opacity: 0.7 }}>{APP_CONFIG.description}</Caption>
          </motion.div>
        </Section>

        {/* Custom Features Section */}
        <List>
          <Section
            header="Features"
            footer={`Connect with ${APP_CONFIG.telegramUsername} on Telegram`}
          >
            {APP_CONFIG.listings.map((listing, index) => (
              <motion.div
                key={listing.id}
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
                onClick={() => openTelegramLink(listing.telegramUrl)}
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
                      {listing.icon}
                    </div>
                  }
                  subtitle={listing.description}
                  style={{
                    transition: "all 0.2s ease",
                  }}
                >
                  {listing.title}
                </Cell>
              </motion.div>
            ))}
          </Section>
        </List>

        {/* Quick Actions */}
        <Section
          header="Quick Actions"
          footer="Essential app information and settings"
        >
          <Cell
            subtitle="View technical information"
            style={{
              opacity: 0.7,
              fontSize: "14px",
            }}
          >
            App Version: {APP_CONFIG.version}
          </Cell>
        </Section>
      </motion.div>
    </Page>
  );
};
