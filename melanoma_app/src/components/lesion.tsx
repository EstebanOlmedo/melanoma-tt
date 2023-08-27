import { Image } from "expo-image";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { default as LesionModel } from "../models/lesion";
import Styles from "../styles";
import { LesionImages } from "../utils/images";

interface LesionProps {
  lesion: LesionModel;
}

const Lesion = (props: LesionProps) => {
  return (
    <TouchableOpacity style={styles.touchContainer}>
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
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  touchContainer: {
    flex: 1,
    marginVertical: 5,
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
    borderRadius: 5,
  },
});

export default Lesion;
