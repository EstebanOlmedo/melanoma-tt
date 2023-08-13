import { View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import LesionsOverview from "../components/home/lesionsOverview";
import RemainderCarousel from "../components/home/remainderCarousel";
import Menubar from "../components/menubar";
import Section from "../components/section";
import Title from "../components/title";
import Styles from "../styles";
import { getLesions, getRemainders } from "../utils/testData";

const Remainders = () => {
  return <RemainderCarousel remainders={getRemainders()} />;
};

const Lesions = () => {
  return <LesionsOverview lesions={getLesions()} />;
};

const Home = () => {
  return (
    <SafeAreaView style={Styles.flexContainer}>
      <View style={styles.titleContainer}>
        <Title title="Seguimiento de lesiones" />
      </View>
      <View style={styles.bodyContainer}>
        <View style={styles.remaindersContainer}>
          <Section title="Recordatorios" body={Remainders} />
        </View>
        <View style={styles.lesionsContainer}>
          <Section title="En seguimiento" body={Lesions} />
        </View>
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
  remaindersContainer: {
    flex: 1,
  },
  lesionsContainer: {
    flex: 5,
  },
});

export default Home;
