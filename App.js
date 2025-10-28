import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { AppNavigator } from "./src/navigation/AppNavigator";

import { GluestackUIProvider } from "@/src/components/ui/gluestack-ui-provider";
import "@/global.css";

export default function App() {
  return (
    <GluestackUIProvider mode="dark">
      <NavigationContainer>
        <StatusBar style="auto" />
        <AppNavigator />
      </NavigationContainer>
    </GluestackUIProvider>
  );
}
