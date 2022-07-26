import type { NextPage } from "next";
import useSWR from "swr";
import { TriviaQuestion } from "../models";
import styles from "../styles/Home.module.css";
const fetcher = (url: string) => fetch(url).then((res) => res.json());
const Home: NextPage = () => {
  const { data, error } = useSWR<TriviaQuestion[]>(
    "api/questions?limit=3",
    fetcher
  );
  if (error) return <h1>🤒</h1>;
  if (!data) return <h1>⏳</h1>;
  return (
    <div className={styles.container}>
      {data.map((question) => (
        <div key={question.question} className={styles.wrapper}>
          <h1>{question.question}</h1>
          <h3>✅{question.correctAnswer}</h3>
          <div>
            {question.incorrectAnswers.map((answer) => (
              <p key={answer}>❌{answer}</p>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
