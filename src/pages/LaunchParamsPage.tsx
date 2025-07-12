import { useLaunchParams } from "@telegram-apps/sdk-react";
import { List } from "@telegram-apps/telegram-ui";
import type { FC } from "react";

import { DisplayData } from "@/components/DisplayData/DisplayData.tsx";
import { Page } from "@/components/Page.tsx";

export const LaunchParamsPage: FC = () => {
  const lp = useLaunchParams();

  return (
    <Page>
      <List>
        <DisplayData
          rows={[
            { title: "tgWebAppPlatform", value: String(lp.platform || "Unknown") },
            { title: "tgWebAppShowSettings", value: String(lp.showSettings || "Unknown") },
            { title: "tgWebAppVersion", value: String(lp.version || "Unknown") },
            { title: "tgWebAppBotInline", value: String(lp.botInline || "Unknown") },
            { title: "tgWebAppStartParam", value: String(lp.startParam || "Unknown") },
            { title: "tgWebAppData", type: "link", value: "/init-data" },
            {
              title: "tgWebAppThemeParams",
              type: "link",
              value: "/theme-params",
            },
          ]}
        />
      </List>
    </Page>
  );
};
