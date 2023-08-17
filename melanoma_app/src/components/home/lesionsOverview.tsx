import { ScrollView, StyleSheet } from "react-native";

import { default as LesionModel } from "../../models/lesion";
import Lesion from "../lesion";

interface LesionsOverviewProps {
  lesions: LesionModel[];
}

const LesionsOverview = (props: LesionsOverviewProps) => {
  const lesions = props.lesions.map((lesion, index) => {
    return <Lesion lesion={lesion} key={index} />;
  });
  return <ScrollView style={styles.container}>{lesions}</ScrollView>;
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 0,
  },
});

export default LesionsOverview;
