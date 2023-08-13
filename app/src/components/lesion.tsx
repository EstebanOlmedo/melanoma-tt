import { Image } from "expo-image";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { default as LesionModel } from "../models/lesion";
import Styles from "../styles";
import LocalImages from "../utils/images";

interface LesionProps {
  lesion: LesionModel;
}

const Lesion = (props: LesionProps) => {
  return (
    <TouchableOpacity>
      <View style={styles.container}>
        <View style={styles.photoContainer}>
          <Image
            source={LocalImages[props.lesion.getFirstPhoto().localId]}
            style={styles.image}
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
  container: {
    padding: 10,
    margin: 5,
    ...Styles.horizontalContainer,
    ...Styles.cardBorder,
  },
  photoContainer: {
    flex: 1,
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
