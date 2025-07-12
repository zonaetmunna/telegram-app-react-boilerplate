import { retrieveLaunchParams } from "@telegram-apps/sdk-react";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";

import { EnvUnsupported } from "@/components/EnvUnsupported.tsx";
import { Root } from "@/components/Root.tsx";
import { init } from "@/init.ts";

import "@telegram-apps/telegram-ui/dist/styles.css";
import "./index.css";

// Mock the environment in case, we are outside Telegram.
import "./mockEnv.ts";

const root = ReactDOM.createRoot(document.getElementById("root")!);

try {
  // Configure all application dependencies.
  init(retrieveLaunchParams().startParam === "debug" || import.meta.env.DEV);

  root.render(
    <StrictMode>
      <Root />
    </StrictMode>
  );
} catch (e) {
  root.render(<EnvUnsupported />);
}
