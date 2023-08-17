import {Tabs} from "expo-router";

const TabLayout = () => {
	return (
		<Tabs>
			<Tabs.Screen name="followup" />
			<Tabs.Screen name="settings" />
		</Tabs>
	);
};

export default TabLayout;
