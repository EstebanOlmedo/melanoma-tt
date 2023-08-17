import React, { Fragment, useState } from "react";
import { View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import LesionsOverview from "../../src/components/home/lesionsOverview";
import RemainderCarousel from "../../src/components/home/remainderCarousel";
import SettingsOptions from "../../src/components/home/settingsOptions";
import Menubar from "../../src/components/menubar";
import Section from "../../src/components/section";
import Title from "../../src/components/title";
import Styles from "../../src/styles";
import { getLesions, getRemainders } from "../../src/utils/testData";
import HomeTabs from "../../src/utils/HomeTabs";


const Remainders = () => {
  return <RemainderCarousel remainders={getRemainders()} />;
};

const Lesions = () => {
  return <LesionsOverview lesions={getLesions()} />;
};

const FollowUp = () => {
  return (
    <View style={styles.bodyContainer}>
      <View style={styles.remaindersContainer}>
        <Section title="Recordatorios" body={Remainders} />
      </View>
      <View style={styles.lesionsContainer}>
        <Section title="En seguimiento" body={Lesions} />
      </View>
    </View>
  );
};

const Home = () => {
  const [activeOption, setActiveOption] = useState(HomeTabs.FollowUp);
  const title = "Seguimiento de lesiones";

  console.log(activeOption);

  const onMenubarPress = (pressedOption: HomeTabs) => {
    setActiveOption(pressedOption);
  };

  return (
    <View style={Styles.flexContainer}>
      <View style={styles.titleContainer}>
        <Title title={title} />
      </View>
      <FollowUp />
      <View style={styles.menubarContainer}>
        <Menubar onOptionPressed={onMenubarPress} />
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
