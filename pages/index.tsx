import type { NextPage } from "next";
import { useState } from "react";
import useSWR, { useSWRConfig } from "swr";
import { Question, TriviaQuestion } from "../models";
import styles from "../styles/Home.module.css";
import { shuffleArray } from "../utils";

const fetcher = (url: string): Promise<Question[]> =>
  fetch(url)
    .then((res) => res.json())
    .then((questions: TriviaQuestion[]) =>
      questions.map((q) => ({
        ...q,
        allAnswers: shuffleArray(q.incorrectAnswers.concat(q.correctAnswer)),
      }))
    );

const API_URL = "api/questions?limit=1";

const Home: NextPage = () => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | undefined>(
    undefined
  );
  const { data, error } = useSWR<Question[]>(API_URL, fetcher);
  const { mutate } = useSWRConfig();

  const onClickAnswer = async (answer: string) => {
    setSelectedAnswer(answer);
    setTimeout(() => {
      // Reset the answer after 600ms and fetch a new question for continued learning
      mutate(API_URL, fetcher);
      setSelectedAnswer(undefined);
    }, 600);
  };
  if (error && !data) return <h1>🤒</h1>;
  if (!data || data.length !== 1) return <h1>⏳</h1>;
  return (
    <div className={styles.container}>
      {data.map((question) => (
        <div key={question.question} className={styles.wrapper}>
          <h1>{question.question}</h1>
          <div>
            {question.allAnswers.map((answer) => (
              <p
                key={answer}
                className={
                  selectedAnswer && answer === question.correctAnswer
                    ? styles["answer--correct"]
                    : answer === selectedAnswer
                    ? styles["answer--incorrect"]
                    : styles.option
                }
                onClick={() => onClickAnswer(answer)}
              >
                {answer}
              </p>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
