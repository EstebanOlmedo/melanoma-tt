import { View, StyleSheet } from "react-native";

import SettingsOptions from "../../src/components/home/settingsOptions";
import Section from "../../src/components/section";
import Styles from "../../src/styles";

const Home = () => {
  return (
    <View style={Styles.flexContainer}>
      <View style={styles.bodyContainer}>
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

export default Home;
