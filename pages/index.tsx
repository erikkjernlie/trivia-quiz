import type { NextPage } from "next";
import useSWR from "swr";
import { TriviaQuestion } from "../models";

const fetcher = (url: string) => fetch(url).then((res) => res.json());
const Home: NextPage = () => {
  const { data, error } = useSWR<TriviaQuestion[]>(
    "api/questions?limit=3",
    fetcher
  );
  if (error) return <h1>🤒</h1>;
  if (!data) return <h1>⏳</h1>;
  return (
    <div>
      {data.map((question) => (
        <div key={question.question}>
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
