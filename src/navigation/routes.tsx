import type { ComponentType, JSX } from "react";

import { IndexPage } from "@/pages/IndexPage/IndexPage";
import { InitDataPage } from "@/pages/InitDataPage.tsx";
import { LaunchParamsPage } from "@/pages/LaunchParamsPage.tsx";
import { SettingsPage } from "@/pages/SettingsPage/SettingsPage";
import { ThemeParamsPage } from "@/pages/ThemeParamsPage.tsx";
import { TONConnectPage } from "@/pages/TONConnectPage/TONConnectPage";
import { UserProfilePage } from "@/pages/UserProfilePage/UserProfilePage";

export interface Route {
  path: string;
  Component: ComponentType;
  title?: string;
  icon?: JSX.Element;
  showInNavigation?: boolean;
  requiresAuth?: boolean;
  showInDev?: boolean;
  showInProd?: boolean;
  description?: string;
  category?: 'main' | 'debug' | 'profile' | 'settings';
}

export const routes: Route[] = [
  { 
    path: "/", 
    Component: IndexPage,
    title: "Home",
    showInNavigation: true,
    showInDev: true,
    showInProd: true,
    category: 'main',
    description: "Main app dashboard"
  },
  { 
    path: "/profile", 
    Component: UserProfilePage,
    title: "Profile",
    showInNavigation: true,
    showInDev: true,
    showInProd: true,
    category: 'profile',
    description: "User profile and information",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" fill="currentColor"/>
      </svg>
    )
  },
  { 
    path: "/settings", 
    Component: SettingsPage,
    title: "Settings",
    showInNavigation: true,
    showInDev: true,
    showInProd: true,
    category: 'settings',
    description: "App settings and preferences",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" fill="currentColor"/>
      </svg>
    )
  },
  { 
    path: "/init-data", 
    Component: InitDataPage, 
    title: "Init Data",
    showInNavigation: true,
    showInDev: true,
    showInProd: false,
    category: 'debug',
    description: "Telegram initialization data (Debug only)"
  },
  { 
    path: "/theme-params", 
    Component: ThemeParamsPage, 
    title: "Theme Params",
    showInNavigation: true,
    showInDev: true,
    showInProd: false,
    category: 'debug',
    description: "Telegram theme parameters (Debug only)"
  },
  {
    path: "/launch-params",
    Component: LaunchParamsPage,
    title: "Launch Params",
    showInNavigation: true,
    showInDev: true,
    showInProd: false,
    category: 'debug',
    description: "Telegram launch parameters (Debug only)"
  },
  {
    path: "/ton-connect",
    Component: TONConnectPage,
    title: "TON Connect",
    showInNavigation: true,
    showInDev: true,
    showInProd: true,
    category: 'main',
    description: "TON blockchain wallet connection",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 56 56"
        fill="none"
      >
        <path
          d="M28 56C43.464 56 56 43.464 56 28C56 12.536 43.464 0 28 0C12.536 0 0 12.536 0 28C0 43.464 12.536 56 28 56Z"
          fill="#0098EA"
        />
        <path
          d="M37.5603 15.6277H18.4386C14.9228 15.6277 12.6944 19.4202 14.4632 22.4861L26.2644 42.9409C27.0345 44.2765 28.9644 44.2765 29.7345 42.9409L41.5381 22.4861C43.3045 19.4251 41.0761 15.6277 37.5627 15.6277H37.5603ZM26.2548 36.8068L23.6847 31.8327L17.4833 20.7414C17.0742 20.0315 17.5795 19.1218 18.4362 19.1218H26.2524V36.8092L26.2548 36.8068ZM38.5108 20.739L32.3118 31.8351L29.7417 36.8068V19.1194H37.5579C38.4146 19.1194 38.9199 20.0291 38.5108 20.739Z"
          fill="white"
        />
      </svg>
    ),
  },
];

/**
 * Get routes filtered by environment and navigation preferences
 */
export const getFilteredRoutes = (
  showInNavigation: boolean = false,
  environment: 'development' | 'production' = 'development'
): Route[] => {
  return routes.filter(route => {
    const environmentMatch = environment === 'development' 
      ? route.showInDev !== false 
      : route.showInProd !== false;
    
    const navigationMatch = showInNavigation ? route.showInNavigation : true;
    
    return environmentMatch && navigationMatch;
  });
};

/**
 * Get routes grouped by category
 */
export const getRoutesByCategory = (
  environment: 'development' | 'production' = 'development'
): Record<string, Route[]> => {
  const filteredRoutes = getFilteredRoutes(false, environment);
  
  return filteredRoutes.reduce((acc, route) => {
    const category = route.category || 'main';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(route);
    return acc;
  }, {} as Record<string, Route[]>);
};
