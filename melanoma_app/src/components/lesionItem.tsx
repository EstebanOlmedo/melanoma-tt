import { Entypo } from "@expo/vector-icons";
import { Image } from "expo-image";
import { Link } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import ColorPallete from "../colorPallete";
import { default as LesionModel } from "../models/lesion";
import Styles from "../styles";
import { LesionImages } from "../utils/images";

interface LesionProps {
  lesion: LesionModel;
  isEditing: boolean;
}

const LesionItem = (props: LesionProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.photoContainer}>
        <Image
          source={LesionImages[props.lesion.getFirstPhoto().localId]}
          style={styles.image}
          contentFit="cover"
          contentPosition="center"
          responsivePolicy="live"
        />
      </View>
      <View style={styles.overviewContainer}>
        <Text style={Styles.textBody}>{props.lesion.name}</Text>
        <Text
          style={Styles.textCaption}
        >{`${props.lesion.photos.length} fotos`}</Text>
      </View>
      <View style={styles.dateContainer}>
        <Text style={Styles.textBody}>
          {props.lesion.getLastUpdatedLabel()}
        </Text>
      </View>
      <View style={styles.iconContainer}>
        {props.isEditing ? (
          <TouchableOpacity style={styles.touchContainer}>
            <Entypo name="cross" size={20} color="red" />
          </TouchableOpacity>
        ) : (
          <Link
            href={{
              pathname: "/lesion/[id]/",
              params: {
                id: props.lesion.id,
              },
            }}
            asChild
          >
            <TouchableOpacity style={styles.touchContainer}>
              <Entypo
                name="chevron-thin-right"
                size={20}
                color={ColorPallete.border.dark}
              />
            </TouchableOpacity>
          </Link>
        )}
      </View>
    </View>
  );
};

LesionItem.defaultProps = {
  isEditing: false,
};

const styles = StyleSheet.create({
  touchContainer: {
    flex: 1,
    justifyContent: "center",
  },
  container: {
    flex: 1,
    width: "100%",
    padding: 10,
    ...Styles.horizontalContainer,
    ...Styles.cardBorder,
  },
  photoContainer: {
    flex: 1,
    height: "100%",
    maxWidth: 100,
  },
  overviewContainer: {
    flex: 3,
    marginHorizontal: 5,
    marginVertical: 5,
  },
  dateContainer: {
    flex: 1.5,
    alignItems: "flex-end",
  },
  image: {
    flex: 1,
    height: "100%",
    borderRadius: 5,
  },
  iconContainer: {
    flex: 0.5,
    alignItems: "flex-end",
  },
});

export default LesionItem;
