import { FlatList, ListRenderItemInfo, StyleSheet, View } from "react-native";

import { default as LesionModel } from "../../models/lesion";
import Styles from "../../styles";
import LesionItem from "../lesionItem";

interface LesionsOverviewProps {
  lesions: LesionModel[];
}

const LesionsOverview = (props: LesionsOverviewProps) => {
  const renderLesion = ({ item }: ListRenderItemInfo<LesionModel>) => {
    return <LesionItem lesion={item} />;
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={props.lesions}
        renderItem={renderLesion}
        contentContainerStyle={Styles.scrollContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default LesionsOverview;
