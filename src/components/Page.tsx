import { backButton } from "@telegram-apps/sdk-react";
import { PropsWithChildren, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function Page({
  children,
  back = true,
}: PropsWithChildren<{
  /**
   * True if it is allowed to go back from this page.
   */
  back?: boolean;
}>) {
  const navigate = useNavigate();

  useEffect(() => {
    try {
      if (back) {
        // Try to show the back button
        backButton.show();
        return backButton.onClick(() => {
          navigate(-1);
        });
      } else {
        // Try to hide the back button
        backButton.hide();
      }
    } catch (error) {
      // Silently handle the case where backButton is not mounted
      console.warn("BackButton component not available:", error);
    }
  }, [back, navigate]);

  return <>{children}</>;
}
