// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Configuration, OpenAIApi } from "openai";
const configuration = new Configuration({
  organization: "org-D5Y5JazSWxdrlFY5Y9cv41ei",
  apiKey: process.env.OPENAI_API_KEY,
});

type Data = {
  message: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { name } = req.query;

  res.status(200).json({ message: "Welcome to ReSearch API" });
}
