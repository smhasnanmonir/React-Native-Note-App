import "dotenv/config";
import plugin from "tailwindcss";

export default {
  expo: {
    name: "Native Note",
    slug: "note",
    version: "1.0.0",
    plugin: ["expo-font"],
    orientation: "portrait",
    icon: "./assets/sticky-note.png",
    userInterfaceStyle: "light",
    newArchEnabled: true,
    splash: {
      image: "./assets/sticky-note-512.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    ios: {
      supportsTablet: true,
    },
    android: {
      package: "com.hasnan.nativenote",
      adaptiveIcon: {
        foregroundImage: "./assets/sticky-note.png",
        backgroundColor: "#ffffff",
      },
      edgeToEdgeEnabled: true,
    },
    web: {
      favicon: "./assets/sticky-note.png",
    },
    extra: {
      SUPABASE_URL: process.env.EXPO_PUBLIC_SUPABASE_URL,
      SUPABASE_ANON_KEY: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY,
      eas: {
        projectId: "b0bba66e-96f0-42db-a020-c717fc5fdff0",
      },
    },
  },
};
