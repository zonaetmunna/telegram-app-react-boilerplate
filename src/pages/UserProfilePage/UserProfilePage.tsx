import {
    initData,
    miniApp,
    type User,
    useSignal
} from "@telegram-apps/sdk-react";
import {
    Avatar,
    Button,
    Caption,
    Cell,
    List,
    Placeholder,
    Section,
    Title
} from "@telegram-apps/telegram-ui";
import { motion } from "framer-motion";
import { type FC, useMemo, useState } from "react";

import { DisplayData, type DisplayDataRow } from "@/components/DisplayData/DisplayData.tsx";
import { Page } from "@/components/Page.tsx";

const UserProfileCard: FC<{ user: User | null; isLoading: boolean }> = ({ user, isLoading }) => {
  if (isLoading) {
    return (
      <Section style={{ padding: "20px", textAlign: "center" }}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div style={{ 
            width: "80px", 
            height: "80px", 
            backgroundColor: "var(--tg-theme-hint-color)", 
            borderRadius: "50%",
            margin: "0 auto 16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}>
            <div style={{ 
              width: "24px", 
              height: "24px", 
              backgroundColor: "var(--tg-theme-secondary-bg-color)",
              borderRadius: "50%",
              animation: "pulse 1.5s infinite"
            }} />
          </div>
          <Caption>Loading profile...</Caption>
        </motion.div>
      </Section>
    );
  }

  if (!user) {
    return (
      <Section style={{ padding: "20px", textAlign: "center" }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Avatar size={96} style={{ margin: "0 auto 16px" }}>
            👤
          </Avatar>
          <Title level="3" style={{ marginBottom: "8px" }}>
            Guest User
          </Title>
          <Caption style={{ opacity: 0.7 }}>
            No user data available
          </Caption>
        </motion.div>
      </Section>
    );
  }

  const displayName = `${user.firstName}${user.lastName ? ` ${user.lastName}` : ''}`;
  const username = user.username ? `@${user.username}` : '';

  return (
    <Section style={{ padding: "20px", textAlign: "center" }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {user.photoUrl ? (
          <Avatar size={96} src={user.photoUrl} style={{ margin: "0 auto 16px" }} />
        ) : (
          <Avatar size={96} style={{ margin: "0 auto 16px" }}>
            {user.firstName.charAt(0).toUpperCase()}
          </Avatar>
        )}
        
        <Title level="3" style={{ marginBottom: "4px" }}>
          {displayName}
        </Title>
        
        {username && (
          <Caption style={{ marginBottom: "8px", opacity: 0.8 }}>
            {username}
          </Caption>
        )}
        
        <div style={{ display: "flex", gap: "8px", justifyContent: "center", marginTop: "12px" }}>
          {user.isPremium && (
            <div style={{
              background: "linear-gradient(45deg, #ff6b6b, #4ecdc4)",
              color: "white",
              padding: "4px 8px",
              borderRadius: "12px",
              fontSize: "12px",
              fontWeight: "600"
            }}>
              ⭐ Premium
            </div>
          )}
          
          {user.isBot && (
            <div style={{
              background: "var(--tg-theme-button-color)",
              color: "var(--tg-theme-button-text-color)",
              padding: "4px 8px",
              borderRadius: "12px",
              fontSize: "12px",
              fontWeight: "600"
            }}>
              🤖 Bot
            </div>
          )}
        </div>
      </motion.div>
    </Section>
  );
};

export const UserProfilePage: FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const initDataState = useSignal(initData.state);
  const initDataRaw = useSignal(initData.raw);
  const isDark = useSignal(miniApp.isDark);

  // Simulate loading for better UX
  useMemo(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const user = initDataState?.user || null;

  const userDetailsRows = useMemo<DisplayDataRow[]>(() => {
    if (!user) return [];
    
    return [
      { title: "User ID", value: user.id.toString() },
      { title: "First Name", value: user.firstName },
      { title: "Last Name", value: user.lastName || "Not set" },
      { title: "Username", value: user.username || "Not set" },
      { title: "Language", value: user.languageCode || "Unknown" },
      { title: "Premium Status", value: user.isPremium ? "Yes" : "No" },
      { title: "Bot Status", value: user.isBot ? "Yes" : "No" },
      { title: "Can Write to PM", value: user.allowsWriteToPm ? "Yes" : "No" },
      { title: "Added to Menu", value: user.addedToAttachmentMenu ? "Yes" : "No" },
    ];
  }, [user]);

  const sessionRows = useMemo<DisplayDataRow[]>(() => {
    if (!initDataState || !initDataRaw) return [];
    
    const { authDate, hash, queryId, chatType, startParam } = initDataState;
    
    return [
      { title: "Session Hash", value: hash ? `${hash.substring(0, 8)}...` : "Not available" },
      { title: "Auth Date", value: authDate ? authDate.toLocaleString() : "Not available" },
      { title: "Query ID", value: queryId || "Not available" },
      { title: "Chat Type", value: chatType || "Not available" },
      { title: "Start Param", value: startParam || "Not available" },
      { title: "Theme", value: isDark ? "Dark" : "Light" },
    ];
  }, [initDataState, initDataRaw, isDark]);

  const handleRefreshData = () => {
    setIsLoading(true);
    // Simulate refresh
    setTimeout(() => {
      setIsLoading(false);
      initData.restore();
    }, 1000);
  };

  if (!initDataState && !isLoading) {
    return (
      <Page>
        <Placeholder
          header="No User Data"
          description="This app needs to be opened through Telegram to display user information"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <img
              alt="Telegram sticker"
              src="https://xelene.me/telegram.gif"
              style={{ display: "block", width: "144px", height: "144px" }}
            />
          </motion.div>
        </Placeholder>
      </Page>
    );
  }

  return (
    <Page>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* User Profile Card */}
        <UserProfileCard user={user} isLoading={isLoading} />

        {/* User Details */}
        {userDetailsRows.length > 0 && (
          <List>
            <DisplayData 
              header="User Details" 
              rows={userDetailsRows} 
            />
          </List>
        )}

        {/* Session Information */}
        {sessionRows.length > 0 && (
          <List>
            <DisplayData 
              header="Session Info" 
              rows={sessionRows} 
            />
          </List>
        )}

        {/* Actions */}
        <Section header="Actions" style={{ marginTop: "16px" }}>
          <Cell
            onClick={handleRefreshData}
            style={{ cursor: "pointer" }}
          >
            <Button size="s" mode="outline">
              Refresh Data
            </Button>
          </Cell>
        </Section>

        {/* Environment Info */}
        <Section header="Environment" style={{ marginTop: "16px" }}>
          <Cell
            subtitle={`Running in ${import.meta.env.DEV ? 'development' : 'production'} mode`}
            style={{ opacity: 0.7 }}
          >
            Environment Status
          </Cell>
          <Cell
            subtitle={`Version ${import.meta.env.VITE_APP_VERSION || '1.0.0'}`}
            style={{ opacity: 0.7 }}
          >
            App Version
          </Cell>
        </Section>
      </motion.div>
    </Page>
  );
}; 