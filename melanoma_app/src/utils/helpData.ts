import { ImageSource } from "expo-image";

import { TutorialsImages } from "./images";
import RawQuestions from "../data/questions.json";
import RawTutorials from "../data/tutorials.json";

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

export interface TutorialStep {
  title: string;
  body: string;
  backgroundColor: string;
  image: ImageSource;
}

export interface Tutorial {
  id: number;
  title: string;
  color: string;
  icon: string;
  steps: TutorialStep[];
}

export function getTutorials(): Tutorial[] {
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
