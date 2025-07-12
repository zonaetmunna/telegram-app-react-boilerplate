import {
  isColorDark,
  isRGB,
  retrieveLaunchParams,
} from "@telegram-apps/sdk-react";
import { AppRoot, Placeholder } from "@telegram-apps/telegram-ui";
import { useMemo } from "react";

export function EnvUnsupported() {
  const [platform, isDark] = useMemo(() => {
    let platform: string = "base";
    let isDark = false;
    try {
      const lp = retrieveLaunchParams();
      
      // Safely access themeParams and bgColor
      const bgColor = typeof lp?.themeParams === 'object' && lp.themeParams && 
                      'bgColor' in lp.themeParams ? lp.themeParams.bgColor : undefined;
      
      // Safely access platform
      if (typeof lp?.platform === 'string') {
        platform = lp.platform;
      }
      
      // Check if bgColor is valid and calculate dark mode
      if (bgColor && typeof bgColor === 'string' && isRGB(bgColor)) {
        isDark = isColorDark(bgColor);
      }
    } catch (error) {
      console.warn("Failed to retrieve launch params:", error);
    }

    return [platform, isDark];
  }, []);

  // Safely determine platform for AppRoot
  const appPlatform = (typeof platform === 'string' && ["macos", "ios"].includes(platform)) ? "ios" : "base";

  return (
    <AppRoot
      appearance={isDark ? "dark" : "light"}
      platform={appPlatform}
    >
      <Placeholder
        header="Oops"
        description="This app requires a compatible Telegram client to run properly"
      >
        <img
          alt="Telegram sticker"
          src="https://xelene.me/telegram.gif"
          style={{ display: "block", width: "144px", height: "144px" }}
        />
      </Placeholder>
    </AppRoot>
  );
}
