import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import ContextProvider from "./Contexts/Context";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NativeWindStyleSheet } from "nativewind";
import Home from "./Home";
import GameLayout from "./GameLayout";

export default function App() {
  NativeWindStyleSheet.setOutput({
    default: "native",
  });
  const Stack = createNativeStackNavigator();
  return (
    <ContextProvider>
    <View className="flex flex-row h-[100%] items-center justify-center bg-[#1E1E1E]">
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Game" component={GameLayout} />
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar style="auto" />
    </View>
    </ContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
