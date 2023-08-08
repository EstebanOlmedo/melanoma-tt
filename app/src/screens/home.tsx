import { View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Menubar from "../components/menubar";
import Title from "../components/title";
import Styles from "../styles";

const Home = () => {
  return (
    <SafeAreaView style={Styles.flexContainer}>
      <View style={styles.titleContainer}>
        <Title title="Seguimiento de lesiones" />
      </View>
      <View style={styles.bodyContainer} />
      <View style={styles.menubarContainer}>
        <Menubar />
      </View>
    </SafeAreaView>
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
});

export default Home;
