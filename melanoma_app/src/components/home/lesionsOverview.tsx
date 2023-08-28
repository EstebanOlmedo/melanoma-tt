import { FlatList, ListRenderItemInfo, StyleSheet, View } from "react-native";

import { default as LesionModel } from "../../models/lesion";
import Styles from "../../styles";
import LesionItem from "../lesionItem";

interface LesionsOverviewProps {
  lesions: LesionModel[];
  isEditing: boolean;
}

const LesionsOverview = (props: LesionsOverviewProps) => {
  const renderLesion = ({ item }: ListRenderItemInfo<LesionModel>) => {
    return <LesionItem lesion={item} isEditing={props.isEditing} />;
  };
  const gap = () => {
    return <View style={styles.gap} />;
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={props.lesions}
        renderItem={renderLesion}
        contentContainerStyle={Styles.scrollContainer}
        ItemSeparatorComponent={gap}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gap: {
    height: 10,
  },
});

export default LesionsOverview;
