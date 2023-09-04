import { ScrollView, StyleSheet, Text, View } from "react-native";

import Section from "@/components/section";
import ZoomeableImage from "@/components/zoomeableImage";
import Styles from "@/styles";
import { getPrediagnosisResult } from "@/utils/testData";

const Result = () => {
  const result = getPrediagnosisResult();

  const Body = () => {
    return (
      <View style={styles.result}>
        <Text
          style={Styles.textBody}
        >{`Probabilidad de cáncer de melanoma: ${result.probability}`}</Text>
        <Text
          style={[Styles.textBody, { marginTop: 10 }]}
        >{`Descripción: ${result.description}`}</Text>
      </View>
    );
  };

  return (
    <View style={Styles.flexContainer}>
      <View style={styles.imageContainer}>
        <ZoomeableImage
          style={styles.image}
          image={result.segementedLesion.base64}
        />
      </View>
      <ScrollView style={styles.resultContainer}>
        <Section title="Resultados" body={Body} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
  },
  imageContainer: {
    flex: 1,
  },
  resultContainer: {
    flex: 1,
  },
  result: {
    padding: 10,
    ...Styles.cardBorder,
  },
});

export default Result;
