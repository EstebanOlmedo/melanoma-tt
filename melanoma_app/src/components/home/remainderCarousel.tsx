import { FlatList, ListRenderItemInfo, StyleSheet } from "react-native";

import { default as RemainderModel } from "../../models/remainder";
import Remainder from "../remainder";

interface RemainderCarouselProps {
  remainders: RemainderModel[];
}

const RemainderCarousel = (props: RemainderCarouselProps) => {
  const renderRemainder = ({ item }: ListRenderItemInfo<RemainderModel>) => {
    return <Remainder remainder={item} />;
  };

  return (
    <FlatList
      data={props.remainders}
      renderItem={renderRemainder}
      contentContainerStyle={styles.container}
      horizontal
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 0,
  },
});

export default RemainderCarousel;
