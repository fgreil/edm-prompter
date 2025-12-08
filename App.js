import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";

// SQLite init
import { initDatabase } from "./src/database/database";

// Root Navigation
import AppNavigator from "./src/navigation/AppNavigator";

// Prevent Expo from auto-hiding splash until DB is ready
SplashScreen.preventAutoHideAsync();

export default function App() {
  useEffect(() => {
    async function prepare() {
      try {
        // Initialize SQLite tables
        await initDatabase();
      } catch (e) {
        console.warn("DB init failed", e);
      } finally {
        SplashScreen.hideAsync();
      }
    }
    prepare();
  }, []);

  return (
    <>
      <StatusBar style="light" />
      <AppNavigator />
    </>
  );
}
