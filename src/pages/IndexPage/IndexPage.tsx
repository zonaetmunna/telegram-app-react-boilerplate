import {
  Caption,
  Cell,
  List,
  Section,
  Title
} from "@telegram-apps/telegram-ui";
import { motion } from "framer-motion";
import type { FC } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Page } from "@/components/Page.tsx";
import { APP_CONFIG } from "@/config/app";
import { getRoutesByCategory } from "@/navigation/routes.tsx";

export const IndexPage: FC = () => {
  const navigate = useNavigate();
  const environment = import.meta.env.DEV ? 'development' : 'production';
  const routesByCategory = getRoutesByCategory(environment);

  const openTelegramLink = (url: string) => {
    try {
      window.open(url, "_blank");
    } catch (error) {
      console.error("Failed to open Telegram link:", error);
    }
  };

  const handleNavigateToProfile = () => {
    navigate("/profile");
  };

  const handleNavigateToSettings = () => {
    navigate("/settings");
  };

  return (
    <Page back={false}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Header Section */}
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

        {/* Quick Actions */}
        <Section header="Quick Actions">
          <Cell
            onClick={handleNavigateToProfile}
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
                👤
              </div>
            }
            subtitle="View your profile and session info"
            style={{ cursor: "pointer" }}
          >
            User Profile
          </Cell>
          
          <Cell
            onClick={handleNavigateToSettings}
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
                ⚙️
              </div>
            }
            subtitle="Configure app preferences"
            style={{ cursor: "pointer" }}
          >
            Settings
          </Cell>
        </Section>

        {/* Main Features */}
        {routesByCategory.main && routesByCategory.main.length > 0 && (
          <List>
            <Section header="Main Features">
              {routesByCategory.main
                .filter(route => route.path !== "/")
                .map((route, index) => (
                  <motion.div
                    key={route.path}
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
                  >
                    <Link to={route.path} style={{ textDecoration: "none" }}>
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
                            {route.icon || "🚀"}
                          </div>
                        }
                        subtitle={route.description}
                        style={{
                          transition: "all 0.2s ease",
                          cursor: "pointer",
                        }}
                      >
                        {route.title}
                      </Cell>
                    </Link>
                  </motion.div>
                ))}
            </Section>
          </List>
        )}

        {/* Custom Features from Config */}
        <List>
          <Section
            header="App Features"
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

        {/* Developer Tools (only in development) */}
        {import.meta.env.DEV && routesByCategory.debug && routesByCategory.debug.length > 0 && (
          <List>
            <Section
              header="Developer Tools"
              footer="These tools are only available in development mode"
            >
              {routesByCategory.debug.map((route, index) => (
                <motion.div
                  key={route.path}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1,
                    ease: "easeOut",
                  }}
                >
                  <Link to={route.path} style={{ textDecoration: "none" }}>
                    <Cell
                      before={
                        <div
                          style={{
                            fontSize: "20px",
                            width: "40px",
                            height: "40px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: "var(--tg-theme-secondary-bg-color)",
                            borderRadius: "12px",
                          }}
                        >
                          🛠️
                        </div>
                      }
                      subtitle={route.description}
                      style={{
                        transition: "all 0.2s ease",
                        cursor: "pointer",
                        opacity: 0.8,
                      }}
                    >
                      {route.title}
                    </Cell>
                  </Link>
                </motion.div>
              ))}
            </Section>
          </List>
        )}

        {/* App Information */}
        <Section
          header="App Information"
          footer={`Environment: ${environment} | Version: ${APP_CONFIG.version}`}
        >
          <Cell
            subtitle="Technical information"
            style={{
              opacity: 0.7,
              fontSize: "14px",
            }}
          >
            Build Status: {import.meta.env.DEV ? "Development" : "Production"}
          </Cell>
        </Section>
      </motion.div>
    </Page>
  );
};
