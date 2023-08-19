import { FlatList, ListRenderItemInfo, StyleSheet, View } from "react-native";

import { default as LesionModel } from "../../models/lesion";
import Lesion from "../lesion";

interface LesionsOverviewProps {
  lesions: LesionModel[];
}

const LesionsOverview = (props: LesionsOverviewProps) => {
  const renderLesion = ({ item }: ListRenderItemInfo<LesionModel>) => {
    return <Lesion lesion={item} />;
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={props.lesions}
        renderItem={renderLesion}
        contentContainerStyle={styles.scrollContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
  },
});

export default LesionsOverview;
