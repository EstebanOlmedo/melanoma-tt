import { useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { View, StyleSheet, InteractionManager } from "react-native";

import { EditButton, SaveButton } from "../../src/components/button";
import LesionsOverview from "../../src/components/home/lesionsOverview";
import RemainderCarousel from "../../src/components/home/remainderCarousel";
import Section from "../../src/components/section";
import Lesion from "../../src/models/lesion";
import Remainder from "../../src/models/remainder";
import Styles from "../../src/styles";
import { getLesions, getRemainders } from "../../src/utils/testData";

const Followup = () => {
  const navigation = useNavigation();
  const [isEditing, setIsEditing] = useState(false);
  const [lesions, setLesions] = useState<Lesion[]>([]);
  const [remainders, setRemainders] = useState<Remainder[]>([]);
  useEffect(() => {
    navigation.setOptions({
      headerRight: () =>
        isEditing ? (
          <SaveButton
            style={{ marginRight: 10 }}
            onPress={() => setIsEditing(false)}
          />
        ) : (
          <EditButton
            style={{ marginRight: 10 }}
            onPress={() => setIsEditing(true)}
          />
        ),
    });
    const task = InteractionManager.runAfterInteractions(() => {
      setLesions(getLesions());
      setRemainders(getRemainders());
    });
    return () => task.cancel();
  }, [navigation, isEditing]);
  const Remainders = () => {
    return RemainderCarousel({ remainders });
  };
  const Lesions = () => {
    return LesionsOverview({ lesions, isEditing });
  };
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
    maxHeight: 150,
  },
  lesionsContainer: {
    flex: 5,
  },
});

export default Followup;
