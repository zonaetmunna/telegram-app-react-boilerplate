import {
    hapticFeedback,
    miniApp,
    useSignal,
    viewport
} from "@telegram-apps/sdk-react";
import {
    Button,
    Caption,
    Cell,
    List,
    Section,
    Switch,
    Title
} from "@telegram-apps/telegram-ui";
import { motion } from "framer-motion";
import { type FC, useEffect, useState } from "react";

import { Page } from "@/components/Page.tsx";
import { APP_CONFIG } from "@/config/app";

interface AppSettings {
  notifications: boolean;
  hapticFeedback: boolean;
  darkMode: boolean;
  autoRefresh: boolean;
  developerMode: boolean;
}

export const SettingsPage: FC = () => {
  const isDark = useSignal(miniApp.isDark);
  
  const [settings, setSettings] = useState<AppSettings>({
    notifications: true,
    hapticFeedback: true,
    darkMode: isDark,
    autoRefresh: false,
    developerMode: import.meta.env.DEV
  });

  const [isLoading, setIsLoading] = useState(false);

  // Load settings from localStorage on component mount
  useEffect(() => {
    const savedSettings = localStorage.getItem('app-settings');
    if (savedSettings) {
      try {
        const parsedSettings = JSON.parse(savedSettings);
        setSettings(prev => ({ ...prev, ...parsedSettings }));
      } catch (error) {
        console.error('Failed to parse saved settings:', error);
      }
    }
  }, []);

  // Save settings to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('app-settings', JSON.stringify(settings));
  }, [settings]);

  const handleSettingChange = (key: keyof AppSettings, value: boolean) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    
    // Trigger haptic feedback if enabled
    if (settings.hapticFeedback && hapticFeedback.isSupported()) {
      hapticFeedback.impactOccurred('light');
    }
  };

  const handleResetSettings = () => {
    setIsLoading(true);
    
    if (settings.hapticFeedback && hapticFeedback.isSupported()) {
      hapticFeedback.impactOccurred('medium');
    }
    
    setTimeout(() => {
      setSettings({
        notifications: true,
        hapticFeedback: true,
        darkMode: isDark,
        autoRefresh: false,
        developerMode: import.meta.env.DEV
      });
      setIsLoading(false);
    }, 1000);
  };

  const handleClearCache = () => {
    setIsLoading(true);
    
    if (settings.hapticFeedback && hapticFeedback.isSupported()) {
      hapticFeedback.impactOccurred('heavy');
    }
    
    setTimeout(() => {
      // Clear localStorage except for settings
      const settingsBackup = localStorage.getItem('app-settings');
      localStorage.clear();
      if (settingsBackup) {
        localStorage.setItem('app-settings', settingsBackup);
      }
      setIsLoading(false);
    }, 1000);
  };

  const handleExpandApp = () => {
    try {
      viewport.expand();
    } catch (error) {
      console.warn('Viewport expand not supported:', error);
    }
  };

  return (
    <Page>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <Section style={{ padding: "20px", textAlign: "center" }}>
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Title level="2" style={{ marginBottom: "8px" }}>
              Settings
            </Title>
            <Caption style={{ opacity: 0.7 }}>
              Customize your app experience
            </Caption>
          </motion.div>
        </Section>

        {/* App Settings */}
        <List>
          <Section header="App Preferences">
            <Cell
              Component="label"
              before={<span style={{ fontSize: "20px" }}>🔔</span>}
              after={
                <Switch
                  checked={settings.notifications}
                  onChange={(e) => handleSettingChange('notifications', e.target.checked)}
                />
              }
            >
              <div>
                <div>Notifications</div>
                <Caption style={{ opacity: 0.7 }}>
                  Receive app notifications
                </Caption>
              </div>
            </Cell>

            <Cell
              Component="label"
              before={<span style={{ fontSize: "20px" }}>📳</span>}
              after={
                <Switch
                  checked={settings.hapticFeedback}
                  onChange={(e) => handleSettingChange('hapticFeedback', e.target.checked)}
                />
              }
            >
              <div>
                <div>Haptic Feedback</div>
                <Caption style={{ opacity: 0.7 }}>
                  Feel vibrations on interactions
                </Caption>
              </div>
            </Cell>

            <Cell
              Component="label"
              before={<span style={{ fontSize: "20px" }}>🌙</span>}
              after={
                <Switch
                  checked={settings.darkMode}
                  onChange={(e) => handleSettingChange('darkMode', e.target.checked)}
                />
              }
            >
              <div>
                <div>Dark Mode</div>
                <Caption style={{ opacity: 0.7 }}>
                  {settings.darkMode ? 'Dark theme active' : 'Light theme active'}
                </Caption>
              </div>
            </Cell>

            <Cell
              Component="label"
              before={<span style={{ fontSize: "20px" }}>🔄</span>}
              after={
                <Switch
                  checked={settings.autoRefresh}
                  onChange={(e) => handleSettingChange('autoRefresh', e.target.checked)}
                />
              }
            >
              <div>
                <div>Auto Refresh</div>
                <Caption style={{ opacity: 0.7 }}>
                  Automatically refresh data
                </Caption>
              </div>
            </Cell>
          </Section>
        </List>

        {/* Developer Settings */}
        {import.meta.env.DEV && (
          <List>
            <Section header="Developer Options">
              <Cell
                Component="label"
                before={<span style={{ fontSize: "20px" }}>🛠️</span>}
                after={
                  <Switch
                    checked={settings.developerMode}
                    onChange={(e) => handleSettingChange('developerMode', e.target.checked)}
                  />
                }
              >
                <div>
                  <div>Developer Mode</div>
                  <Caption style={{ opacity: 0.7 }}>
                    Show debug information
                  </Caption>
                </div>
              </Cell>
            </Section>
          </List>
        )}

        {/* App Info */}
        <List>
          <Section header="App Information">
            <Cell
              before={<span style={{ fontSize: "20px" }}>📱</span>}
              subtitle={APP_CONFIG.description}
            >
              {APP_CONFIG.title}
            </Cell>
            
            <Cell
              before={<span style={{ fontSize: "20px" }}>🔢</span>}
              subtitle={`Build: ${import.meta.env.DEV ? 'Development' : 'Production'}`}
            >
              Version {APP_CONFIG.version}
            </Cell>
            
            <Cell
              before={<span style={{ fontSize: "20px" }}>🎨</span>}
              subtitle={`Current: ${isDark ? 'Dark' : 'Light'} theme`}
            >
              Theme Status
            </Cell>
          </Section>
        </List>

        {/* Actions */}
        <Section header="Actions" style={{ marginTop: "16px" }}>
          <Cell
            onClick={handleExpandApp}
            style={{ cursor: "pointer" }}
          >
            <Button size="s" mode="outline">
              🔍 Expand App
            </Button>
          </Cell>
          
          <Cell
            onClick={handleResetSettings}
            style={{ cursor: "pointer" }}
          >
            <Button size="s" mode="outline" disabled={isLoading}>
              {isLoading ? "Resetting..." : "🔄 Reset Settings"}
            </Button>
          </Cell>
          
          <Cell
            onClick={handleClearCache}
            style={{ cursor: "pointer" }}
          >
            <Button size="s" mode="outline" disabled={isLoading}>
              {isLoading ? "Clearing..." : "🗑️ Clear Cache"}
            </Button>
          </Cell>
        </Section>

        {/* Environment Status */}
        <Section 
          header="Environment Status" 
          footer={`Last updated: ${new Date().toLocaleString()}`}
          style={{ marginTop: "16px" }}
        >
          <Cell
            subtitle={`Running on ${navigator.userAgent.includes('Telegram') ? 'Telegram' : 'Browser'}`}
            style={{ opacity: 0.7 }}
          >
            Platform Status
          </Cell>
          
          <Cell
            subtitle={settings.developerMode ? 'Debug info visible' : 'Production mode'}
            style={{ opacity: 0.7 }}
          >
            Debug Mode
          </Cell>
        </Section>
      </motion.div>
    </Page>
  );
}; 