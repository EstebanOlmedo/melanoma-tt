import { Fragment } from "react";
import { FlatList, ListRenderItemInfo, View, StyleSheet } from "react-native";

import Styles from "../../styles";
import { Tutorial, getTutorials } from "../../utils/helpData";
import { InfoCard } from "../card";
import {
  FollowupCardIcon,
  NotificationCardIcon,
  PhotoCardIcon,
  PrediagnosisCardIcon,
} from "../icons";

const getIcon = (name: string) => {
  switch (name) {
    case "notifications":
      return NotificationCardIcon;
    case "photos":
      return PhotoCardIcon;
    case "followup":
      return FollowupCardIcon;
    case "prediagnosis":
      return PrediagnosisCardIcon;
    default:
      return Fragment;
  }
};

interface TutorialsOverviewProps {
  searchFilter?: string;
}

const TutorialsOverview = (props: TutorialsOverviewProps) => {
  const Tutorials = getTutorials();
  const tutorials = Tutorials.filter((tutorial) => {
    if (props.searchFilter === undefined) return true;
    const label = tutorial.title.toLowerCase();
    return label.includes(props.searchFilter);
  });
  const renderCard = ({ item }: ListRenderItemInfo<Tutorial>) => {
    return (
      <InfoCard
        title={item.title}
        backgroundColor={item.color}
        icon={getIcon(item.icon)}
        href={`/help/tutorial/${item.id}`}
      />
    );
  };
  const gap = () => {
    return <View style={styles.gap} />;
  };
  return (
    <View>
      <FlatList
        data={tutorials}
        renderItem={renderCard}
        contentContainerStyle={[Styles.scrollContainer, styles.center]}
        ItemSeparatorComponent={gap}
        horizontal
      />
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    justifyContent: "center",
  },
  gap: {
    width: 10,
  },
});

export default TutorialsOverview;
