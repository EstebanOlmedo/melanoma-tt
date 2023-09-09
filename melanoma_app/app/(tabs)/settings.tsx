import { View, StyleSheet } from "react-native";

import AccountSettings from "@/components/home/accountSettings";
import SettingsOptions from "@/components/home/settingsOptions";
import Section from "@/components/section";
import Styles from "@/styles";

const Settings = () => {
  return (
    <View style={Styles.flexContainer}>
      <View style={styles.bodyContainer}>
        <View style={Styles.flexContainer}>
          <Section title="Ajustes de la cuenta" body={AccountSettings} />
        </View>
        <View style={Styles.flexContainer}>
          <Section title="Ajustes de la aplicación" body={SettingsOptions} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  bodyContainer: {
    flex: 10,
  },
  menubarContainer: {
    flex: 1,
  },
  remaindersContainer: {
    flex: 1,
  },
  lesionsContainer: {
    flex: 5,
  },
});

export default Settings;
