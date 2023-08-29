import { useState } from "react";
import { StyleSheet, View } from "react-native";

import Questions from "@/components/home/questions";
import TutorialsOverview from "@/components/home/tutorialsOverview";
import Search from "@/components/searchbar";
import Section from "@/components/section";
import Styles from "@/styles";
import { Question, getQuestions } from "@/utils/helpData";

interface SearchSectionProps {
  searchFilter: string;
}

const SearchSection = (props: SearchSectionProps) => {
  return (
    <View>
      <TutorialsOverview searchFilter={props.searchFilter} />
    </View>
  );
};

interface QuestionsSectionProps {
  questions: Question[];
}

const QuestionsSection = (props: QuestionsSectionProps) => {
  return <Questions questions={props.questions} />;
};

const Help = () => {
  const rawQuestions = getQuestions();
  const [searchFilter, setSearchFilter] = useState("");
  const [questions, setQuestions] = useState(rawQuestions);
  const onSearchChanged = (search: string) => {
    search = search.toLowerCase();
    setSearchFilter(search);
    const filteredQuestions = rawQuestions.filter((question) => {
      if (search === "") return true;
      const title = question.title.toLowerCase();
      const body = question.body.toLowerCase();
      return title.includes(search) || body.includes(search);
    });
    setQuestions(filteredQuestions);
  };
  const searchSection = () => {
    return SearchSection({
      searchFilter,
    });
  };
  const questionsSection = () => {
    return QuestionsSection({
      questions,
    });
  };
  return (
    <View style={[styles.container, Styles.flexContainer]}>
      <Search
        placeholder="Ingresa una palabra clave"
        onChangeText={onSearchChanged}
      />
      <View style={styles.searchContainer}>
        <Section title="¿Cómo te podemos ayudar?" body={searchSection} />
      </View>
      <View style={styles.questionsContainer}>
        <Section title="Preguntas frecuentes" body={questionsSection} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // minHeight: 1000,
  },
  searchContainer: {
    flex: 1,
    maxHeight: 250,
  },
  questionsContainer: {
    flex: 2.5,
  },
});

export default Help;
