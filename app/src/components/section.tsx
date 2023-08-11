import { StyleSheet, View } from "react-native";

import Subtitle from "./subtitle";
import Styles from "../styles";

interface SectionProps {
  body: React.ElementType;
}

const Section = (props: SectionProps) => {
  const Body = props.body;
  return (
    <View style={[Styles.flexContainer, styles.container]}>
      <View>
        <Subtitle title="Recordatorios" />
      </View>
      <View style={styles.bodyContainer}>
        <Body />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  debug: {
    backgroundColor: "red",
  },
  container: {
    margin: 10,
    padding: 10,
  },
  bodyContainer: {
    marginTop: 10,
  },
});

export default Section;
