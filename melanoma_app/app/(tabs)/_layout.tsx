import {Tabs} from "expo-router";
import Menubar from "../../src/components/menubar";

const TabLayout = () => {
	return (
		<Tabs tabBar={Menubar}>
			<Tabs.Screen name="followup" options={{tabBarLabel: "Seguimiento"}} />
			<Tabs.Screen name="settings" options={{tabBarLabel: "Ajustes"}} />
		</Tabs>
	);
};

export default TabLayout;
