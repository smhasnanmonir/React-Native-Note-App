import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/Home";
import AddNote from "../screens/AddNote";

const Stack = createNativeStackNavigator();

export const AppNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home}></Stack.Screen>
      <Stack.Screen name="AddNote" component={AddNote}></Stack.Screen>
    </Stack.Navigator>
  );
};
