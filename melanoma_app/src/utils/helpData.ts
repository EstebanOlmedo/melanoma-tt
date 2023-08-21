import RawQuestions from "../../assets/questions.json";

export interface Question {
  title: string;
  body: string;
  id: number;
}

export function getQuestions(): Question[] {
  return RawQuestions.map((question, index) => {
    return {
      id: index,
      ...question,
    };
  });
}
