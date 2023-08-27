import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useCallback } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import ColorPallete from "../src/colorPallete";

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [areFontsLoaded] = useFonts({
    Verdana: require("../assets/fonts/Verdana.ttf"),
    VerdanaBold: require("../assets/fonts/verdanab.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (areFontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [areFontsLoaded]);

  if (!areFontsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider onLayout={onLayoutRootView}>
      <Stack
        screenOptions={{
          contentStyle: { backgroundColor: ColorPallete.background.ligthbg },
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="help/[id]"
          options={{ title: "Preguntas frecuentes" }}
        />
        <Stack.Screen
          name="help/tutorial/[id]"
          options={{ headerShown: false }}
        />
      </Stack>
    </SafeAreaProvider>
  );
};

export default RootLayout;
