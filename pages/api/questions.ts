// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { TriviaQuestion } from "../../models";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<TriviaQuestion[]>
) {
  const {
    query: { limit },
  } = req;
  const response = await fetch(
    `https://the-trivia-api.com/api/questions?limit=${limit ? limit : 1}`
  );
  const questions: TriviaQuestion[] = await response.json();
  res.status(200).json(questions);
}
