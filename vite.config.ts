import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/",
  plugins: [
    // Allows using React dev server along with building a React application with Vite.
    // https://npmjs.com/package/@vitejs/plugin-react-swc
    react(),
    // Allows using the compilerOptions.paths property in tsconfig.json.
    // https://www.npmjs.com/package/vite-tsconfig-paths
    tsconfigPaths(),
    // Create a custom SSL certificate valid for the local machine.
    // https://www.npmjs.com/package/vite-plugin-mkcert
    // mkcert(),
  ],
  publicDir: "./public",
  server: {
    // Exposes your dev server and makes it accessible for the devices in the same network.
    host: true,
    port: 5173,
    strictPort: true,
    hmr: {
      // Ensure HMR works properly in development
      port: 5173,
    },
  },
  build: {
    outDir: "dist",
    sourcemap: false,
    // Optimize for production
    rollupOptions: {
      output: {
        manualChunks: {
          'telegram-ui': ['@telegram-apps/telegram-ui'],
          'telegram-sdk': ['@telegram-apps/sdk-react'],
          'router': ['react-router-dom'],
          'motion': ['framer-motion'],
        },
      },
    },
  },
  // Environment variables
  define: {
    'import.meta.env.VITE_APP_VERSION': JSON.stringify(process.env.npm_package_version || '1.0.0'),
  },
  // Ensure proper HTTPS in production
  preview: {
    port: 5173,
    host: true,
  },
});
