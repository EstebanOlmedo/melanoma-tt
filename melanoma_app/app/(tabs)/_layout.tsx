import { Tabs } from "expo-router";

import ColorPallete from "../../src/colorPallete";
import Menubar from "../../src/components/menubar";

const TabLayout = () => {
  return (
    <Tabs
      tabBar={Menubar}
      screenOptions={{
        headerTitleAlign: "center",
        headerTitleStyle: {
          fontSize: 26,
          fontFamily: "Roboto",
          color: ColorPallete.text.ligthbg.title,
        },
      }}
    >
      <Tabs.Screen
        name="followup"
        options={{
          tabBarLabel: "Seguimiento",
          title: "Seguimiento de lesiones",
        }}
      />
      <Tabs.Screen name="settings" options={{ title: "Ajustes" }} />
    </Tabs>
  );
};

export default TabLayout;
