import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();

  const { question } = req.body;

  // 🔐 Use your own AI API key (OpenAI / Gemini / Groq / etc.)
  const API_KEY = process.env.OPENAI_API_KEY;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are an AI assistant for farmers. Answer clearly about crops, diseases, fertilizers, pesticides, and weather.",
        },
        { role: "user", content: question },
      ],
    }),
  });

  const data = await response.json();
  const answer = data.choices[0].message.content;

  res.status(200).json({ answer });
}