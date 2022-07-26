export type TriviaQuestion = {
  question: string;
  incorrectAnswers: string[];
  correctAnswer: string;
};

export type Question = TriviaQuestion & {
  allAnswers: string[];
};
