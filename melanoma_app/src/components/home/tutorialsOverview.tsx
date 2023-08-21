import { Fragment } from "react";
import { FlatList, ListRenderItemInfo, View, StyleSheet } from "react-native";

import ColorPallete from "../../colorPallete";
import Styles from "../../styles";
import { InfoCard } from "../card";
import {
  FollowupCardIcon,
  NotificationCardIcon,
  PhotoCardIcon,
  PrediagnosisCardIcon,
} from "../icons";

interface Tutorial {
  name: string;
  label: string;
}

const tutorials = [
  {
    name: "notifications",
    label: "Notificaciones",
  },
  {
    name: "photos",
    label: "Captura de imagenes",
  },
  {
    name: "followup",
    label: "Seguimiento",
  },
  {
    name: "prediagnosis",
    label: "Prediagnóstico",
  },
];

const getBackgroundColor = (name: string) => {
  switch (name) {
    case "notifications":
      return ColorPallete.skyblue.ligth;
    case "photos":
      return ColorPallete.green.ligth;
    case "followup":
      return ColorPallete.pink.ligth;
    case "prediagnosis":
      return ColorPallete.orange.ligth;
    default:
      return "white";
  }
};

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

const TutorialsOverview = () => {
  const renderCard = ({ item }: ListRenderItemInfo<Tutorial>) => {
    return (
      <InfoCard
        title={item.label}
        backgroundColor={getBackgroundColor(item.name)}
        icon={getIcon(item.name)}
        href={`/help/tutorial/${item.name}`}
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
