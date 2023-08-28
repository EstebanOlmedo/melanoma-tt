import { FlatList, ListRenderItemInfo, StyleSheet, View } from "react-native";

import { default as PhotoModel } from "../../models/photo";
import Styles from "../../styles";
import PhotoItem from "../photoItem";

interface PhotosOverviewProps {
  photos: PhotoModel[];
  isEditing: boolean;
}

const PhotosOverview = (props: PhotosOverviewProps) => {
  const renderPhoto = ({ item }: ListRenderItemInfo<PhotoModel>) => {
    return <PhotoItem photo={item} isEditing={props.isEditing} />;
  };
  const gap = () => {
    return <View style={styles.gap} />;
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={props.photos}
        renderItem={renderPhoto}
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

export default PhotosOverview;
