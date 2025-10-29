import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/Home";
import ViewNote from "../screens/ViewNote";

const Stack = createNativeStackNavigator();

export const AppNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home}></Stack.Screen>
      <Stack.Screen name="ViewNote" component={ViewNote}></Stack.Screen>
    </Stack.Navigator>
  );
};
