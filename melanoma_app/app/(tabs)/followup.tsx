import { View, StyleSheet } from "react-native";

import LesionsOverview from "../../src/components/home/lesionsOverview";
import RemainderCarousel from "../../src/components/home/remainderCarousel";
import Section from "../../src/components/section";
import Styles from "../../src/styles";
import { getLesions, getRemainders } from "../../src/utils/testData";

const Remainders = () => {
  return <RemainderCarousel remainders={getRemainders()} />;
};

const Lesions = () => {
  return <LesionsOverview lesions={getLesions()} />;
};

const Home = () => {
  return (
    <View style={Styles.flexContainer}>
      <View style={styles.bodyContainer}>
        <View style={styles.remaindersContainer}>
          <Section title="Recordatorios" body={Remainders} />
        </View>
        <View style={styles.lesionsContainer}>
          <Section title="En seguimiento" body={Lesions} />
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
