import { useLocalSearchParams } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import Section from "@/components/section";
import Styles from "@/styles";
import { getQuestions } from "@/utils/helpData";

const HelpAnswer = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const questionIndex = Number(id || "0");
  const questions = getQuestions();
  const { title, body } = questions[questionIndex];

  const Body = () => {
    return (
      <View style={[Styles.cardBorder, style.bodyContainer]}>
        <Text>{body}</Text>
      </View>
    );
  };

  return (
    <ScrollView style={Styles.flexContainer}>
      <Section title={title} body={Body} />
    </ScrollView>
  );
};

const style = StyleSheet.create({
  bodyContainer: {
    padding: 20,
  },
});

export default HelpAnswer;
