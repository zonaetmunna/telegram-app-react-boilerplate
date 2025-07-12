import {
  backButton,
  initData,
  init as initSDK,
  miniApp,
  themeParams,
  viewport,
} from "@telegram-apps/sdk-react";

/**
 * Initializes the application and configures its dependencies.
 * Following the latest Telegram Mini Apps guidelines for production compatibility.
 */
export function init(debug: boolean): void {
  try {
    // Initialize the SDK first
    initSDK();

    // Add Eruda for debugging (development only)
    if (debug) {
      import("eruda").then((lib) => lib.default.init()).catch(console.error);
    }

    // Mount components with proper error handling
    mountComponents();

    // Initialize theme and styling
    initializeTheme();

    // Set up viewport if available
    setupViewport();

    // Log successful initialization
    console.log("✅ Telegram Mini App initialized successfully");
  } catch (error) {
    // More graceful error handling
    console.warn("⚠️ Telegram Mini App initialization had issues:", error);

    // Don't throw error in production - gracefully degrade
    if (debug) {
      console.error("Full error details:", error);
    }
  }
}

/**
 * Mount components with proper error handling
 */
function mountComponents(): void {
  // Mount back button
  try {
    backButton.mount();
    console.log("✅ Back button mounted");
  } catch (error) {
    console.warn("⚠️ Back button mounting failed:", error);
  }

  // Mount mini app
  try {
    miniApp.mount();
    console.log("✅ Mini app mounted");
  } catch (error) {
    console.warn("⚠️ Mini app mounting failed:", error);
  }

  // Mount theme params
  try {
    themeParams.mount();
    console.log("✅ Theme params mounted");
  } catch (error) {
    console.warn("⚠️ Theme params mounting failed:", error);
  }
}

/**
 * Initialize theme and bind CSS variables
 */
function initializeTheme(): void {
  try {
    // Restore init data
    initData.restore();

    // Bind CSS variables with error handling
    try {
      miniApp.bindCssVars();
    } catch (error) {
      console.warn("⚠️ Mini app CSS vars binding failed:", error);
    }

    try {
      themeParams.bindCssVars();
    } catch (error) {
      console.warn("⚠️ Theme params CSS vars binding failed:", error);
    }

    console.log("✅ Theme initialized");
  } catch (error) {
    console.warn("⚠️ Theme initialization failed:", error);
  }
}

/**
 * Setup viewport with proper error handling
 */
function setupViewport(): void {
  try {
    viewport
      .mount()
      .then(() => {
        // Bind CSS variables after successful mounting
        try {
          viewport.bindCssVars();
          console.log("✅ Viewport mounted and configured");
        } catch (error) {
          console.warn("⚠️ Viewport CSS vars binding failed:", error);
        }
      })
      .catch((error) => {
        console.warn("⚠️ Viewport mounting failed:", error);
        // Continue without viewport - not critical for basic functionality
      });
  } catch (error) {
    console.warn("⚠️ Viewport setup failed:", error);
  }
}

/**
 * Check if we're running in a proper Telegram environment
 */
export function isTelegramEnvironment(): boolean {
  try {
    // Check for Telegram WebApp object
    return (
      typeof window !== "undefined" &&
      typeof window.Telegram !== "undefined" &&
      typeof window.Telegram.WebApp !== "undefined"
    );
  } catch {
    return false;
  }
}

/**
 * Get environment info for debugging
 */
export function getEnvironmentInfo(): {
  isTelegram: boolean;
  isProduction: boolean;
  userAgent: string;
  version?: string;
} {
  const isTelegram = isTelegramEnvironment();

  return {
    isTelegram,
    isProduction: !import.meta.env.DEV,
    userAgent: navigator.userAgent,
    version: isTelegram ? window.Telegram?.WebApp?.version : undefined,
  };
}
