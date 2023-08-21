import { FlatList, ListRenderItemInfo, StyleSheet, View } from "react-native";

import Styles from "../../styles";
import { Question } from "../../utils/helpData";
import { QuestionCard } from "../card";

interface QuestionsProps {
  questions: Question[];
}

const Questions = (props: QuestionsProps) => {
  const renderQuestion = ({ item }: ListRenderItemInfo<Question>) => {
    return (
      <QuestionCard
        title={item.title}
        body={item.body}
        href={{
          pathname: "/help/[id]",
          params: {
            id: item.id,
          },
        }}
      />
    );
  };
  const gap = () => {
    return <View style={styles.gap} />;
  };
  return (
    <View style={Styles.flexContainer}>
      <FlatList
        data={props.questions}
        renderItem={renderQuestion}
        contentContainerStyle={Styles.scrollContainer}
        ItemSeparatorComponent={gap}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  gap: {
    height: 20,
  },
});

export default Questions;
