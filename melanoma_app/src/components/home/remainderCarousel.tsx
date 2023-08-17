import { ScrollView, StyleSheet } from "react-native";

import { default as RemainderModel } from "../../models/remainder";
import Remainder from "../remainder";

interface RemainderCarouselProps {
  remainders: RemainderModel[];
}

const RemainderCarousel = (props: RemainderCarouselProps) => {
  const remainders = props.remainders.map((remainder, index) => {
    return <Remainder remainder={remainder} key={index} />;
  });

  return (
    <ScrollView horizontal style={styles.container}>
      {remainders}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 0,
  },
});

export default RemainderCarousel;
