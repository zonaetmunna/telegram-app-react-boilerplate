import {
  isTMA,
  mockTelegramEnv
} from "@telegram-apps/sdk-react";

// It is important, to mock the environment only for development purposes.
// When building the application the import.meta.env.DEV will value become
// `false` and the code inside will be tree-shaken (removed), so you will not
// see it in your final bundle.
if (import.meta.env.DEV) {
  console.log("Mocking environment...");
  await (async () => {
    if (await isTMA()) {
      return;
    }

    // Mock the environment with minimal configuration
    mockTelegramEnv("debug");
    
    console.warn(
      "⚠️ As long as the current environment was not considered as the Telegram-based one, it was mocked. Take a note, that you should not do it in production and current behavior is only specific to the development process. Environment mocking is also applied only in development mode. So, after building the application, you will not see this behavior and related warning, leading to crashing the application outside Telegram."
    );
  })();
}
