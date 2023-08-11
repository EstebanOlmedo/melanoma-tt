import { View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import RemainderCarousel from "../components/home/RemainderCarousel";
import Menubar from "../components/menubar";
import Section from "../components/section";
import Title from "../components/title";
import Remainder from "../models/remainder";
import Styles from "../styles";

const remainders = [
  new Remainder("Brazo", new Date()),
  new Remainder("Pierna", new Date()),
  new Remainder("Estomago", new Date()),
  new Remainder("Mano derecha", new Date()),
];

const SectionComponent = () => {
  return <RemainderCarousel remainders={remainders} />;
};

const Home = () => {
  return (
    <SafeAreaView style={Styles.flexContainer}>
      <View style={styles.titleContainer}>
        <Title title="Seguimiento de lesiones" />
      </View>
      <View style={styles.bodyContainer}>
        <Section body={SectionComponent} />
      </View>
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
