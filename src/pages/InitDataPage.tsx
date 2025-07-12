/* eslint-disable @typescript-eslint/no-explicit-any */
import { initData, type User, useSignal } from "@telegram-apps/sdk-react";
import { List, Placeholder } from "@telegram-apps/telegram-ui";
import { type FC, useMemo } from "react";

import {
  DisplayData,
  type DisplayDataRow,
} from "@/components/DisplayData/DisplayData.tsx";
import { Page } from "@/components/Page.tsx";

function getUserRows(user: User): DisplayDataRow[] {
  return [
    { title: "id", value: user.id.toString() },
    { title: "username", value: user.username },
    { title: "photo_url", value: user.photoUrl },
    { title: "lastName", value: user.lastName },
    { title: "firstName", value: user.firstName },
    { title: "is_bot", value: user.isBot },
    { title: "is_premium", value: user.isPremium },
    { title: "language_code", value: user.languageCode },
    { title: "allows_to_write_to_pm", value: user.allowsWriteToPm },
    { title: "added_to_attachment_menu", value: user.addedToAttachmentMenu },
  ];
}

export const InitDataPage: FC = () => {
  const initDataRaw = useSignal(initData.raw);
  const initDataState = useSignal(initData.state);

  const initDataRows = useMemo<DisplayDataRow[] | undefined>(() => {
    if (!initDataState || !initDataRaw) {
      return;
    }

    // Use safe property access since the API structure has changed
    return [
      { title: "raw", value: initDataRaw },
      {
        title: "auth_date",
        value: (initDataState as any).auth_date
          ? new Date((initDataState as any).auth_date * 1000).toLocaleString()
          : "Not available",
      },
      {
        title: "auth_date (raw)",
        value: (initDataState as any).auth_date || "Not available",
      },
      { title: "hash", value: (initDataState as any).hash || "Not available" },
      {
        title: "can_send_after",
        value: (initDataState as any).can_send_after
          ? new Date((initDataState as any).can_send_after * 1000).toISOString()
          : "Not available",
      },
      {
        title: "can_send_after (raw)",
        value: (initDataState as any).can_send_after || "Not available",
      },
      {
        title: "query_id",
        value: (initDataState as any).query_id || "Not available",
      },
      {
        title: "start_param",
        value: (initDataState as any).start_param || "Not available",
      },
      {
        title: "chat_type",
        value: (initDataState as any).chat_type || "Not available",
      },
      {
        title: "chat_instance",
        value: (initDataState as any).chat_instance || "Not available",
      },
    ];
  }, [initDataState, initDataRaw]);

  const userRows = useMemo<DisplayDataRow[] | undefined>(() => {
    return initDataState && initDataState.user
      ? getUserRows(initDataState.user)
      : undefined;
  }, [initDataState]);

  const receiverRows = useMemo<DisplayDataRow[] | undefined>(() => {
    return initDataState && initDataState.receiver
      ? getUserRows(initDataState.receiver)
      : undefined;
  }, [initDataState]);

  const chatRows = useMemo<DisplayDataRow[] | undefined>(() => {
    if (!initDataState?.chat) {
      return;
    }
    const { id, title, type, username } = initDataState.chat;

    // Handle photoUrl safely as it might not exist in the new version
    const photoUrl =
      "photoUrl" in initDataState.chat
        ? initDataState.chat.photoUrl
        : undefined;

    return [
      { title: "id", value: id.toString() },
      { title: "title", value: title },
      { title: "type", value: type },
      { title: "username", value: username },
      { title: "photo_url", value: photoUrl || "Not available" },
    ];
  }, [initDataState]);

  if (!initDataRows) {
    return (
      <Page>
        <Placeholder
          header="Oops"
          description="Application was launched with missing init data"
        >
          <img
            alt="Telegram sticker"
            src="https://xelene.me/telegram.gif"
            style={{ display: "block", width: "144px", height: "144px" }}
          />
        </Placeholder>
      </Page>
    );
  }
  return (
    <Page>
      <List>
        <DisplayData header={"Init Data"} rows={initDataRows} />
        {userRows && <DisplayData header={"User"} rows={userRows} />}
        {receiverRows && (
          <DisplayData header={"Receiver"} rows={receiverRows} />
        )}
        {chatRows && <DisplayData header={"Chat"} rows={chatRows} />}
      </List>
    </Page>
  );
};
