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


const Settings = () => {
  return (
    <View style={styles.bodyContainer}>
      <View style={Styles.flexContainer}>
        <Section title="Ajustes de la aplicación" body={SettingsOptions} />
      </View>
    </View>
  );
};

const Home = () => {
  const [activeOption, setActiveOption] = useState(HomeTabs.FollowUp);
  const title = "Ajustes";

  const onMenubarPress = (pressedOption: HomeTabs) => {
    setActiveOption(pressedOption);
  };

  return (
    <View style={Styles.flexContainer}>
      <View style={styles.titleContainer}>
        <Title title={title} />
      </View>
      <Settings />
      <View style={styles.menubarContainer}>
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
