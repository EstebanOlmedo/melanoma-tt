import { StyleSheet, View } from "react-native";

import Questions from "../../src/components/home/questions";
import TutorialsOverview from "../../src/components/home/tutorialsOverview";
import Search from "../../src/components/searchbar";
import Section from "../../src/components/section";
import Styles from "../../src/styles";
import { getQuestions } from "../../src/utils/helpData";

const SearchSection = () => {
  return (
    <View>
      <Search placeholder="Ingresa una palabra clave" />
      <TutorialsOverview />
    </View>
  );
};

const QuestionsSection = () => {
  return <Questions questions={getQuestions()} />;
};

const Help = () => {
  return (
    <View style={Styles.flexContainer}>
      <View style={styles.searchContainer}>
        <Section title="¿Cómo te podemos ayudar?" body={SearchSection} />
      </View>
      <View style={styles.questionsContainer}>
        <Section title="Preguntas frecuentes" body={QuestionsSection} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flex: 1,
    maxHeight: 250,
  },
  questionsContainer: {
    flex: 2,
  },
});

export default Help;
