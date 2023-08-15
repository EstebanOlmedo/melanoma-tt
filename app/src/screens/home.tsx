import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import LesionsOverview from "../components/home/lesionsOverview";
import RemainderCarousel from "../components/home/remainderCarousel";
import SettingsOptions from "../components/home/settingsOptions";
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
  const FollowUpTitle = "Seguimiento de lesiones";
  const SettingsTitle = "Ajustes";
  const [activeOption, setActiveOption] = useState(FollowUp);
  const [title, setTitle] = useState(FollowUpTitle);

  const onMenubarPress = (pressedOption: string) => {
    switch (pressedOption) {
      case "follow-up":
        setActiveOption(FollowUp);
        setTitle(FollowUpTitle);
        break;
      case "settings":
        setTitle(SettingsTitle);
        setActiveOption(Settings);
        break;
      default:
        break;
    }
  };

  return (
    <SafeAreaView style={Styles.flexContainer}>
      <View style={styles.titleContainer}>
        <Title title={title} />
      </View>
      {activeOption}
      <View style={styles.menubarContainer}>
        <Menubar onOptionPressed={onMenubarPress} />
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
