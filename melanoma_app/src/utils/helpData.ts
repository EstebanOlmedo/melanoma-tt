import { TutorialsImages } from "./images";
import RawQuestions from "../data/questions.json";
import RawTutorials from "../data/tutorials.json";

import IQuestion from "@/models/question";
import ITutorial from "@/models/tutorial";

export function getQuestions(): IQuestion[] {
  return RawQuestions.map((question, index) => {
    return {
      id: index,
      ...question,
    };
  });
}

export function getTutorials(): ITutorial[] {
  return RawTutorials.map((rawTutorial, index) => {
    const steps = rawTutorial.steps.map((step) => {
      return {
        title: step.title,
        body: step.body,
        backgroundColor: step.backgroundColor,
        image: TutorialsImages.get(step.image),
      };
    });
    return {
      id: index,
      title: rawTutorial.title,
      color: rawTutorial.color,
      icon: rawTutorial.icon,
      steps,
    };
  });
}
