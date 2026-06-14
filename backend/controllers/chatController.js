import dotenv from "dotenv";
import Groq from "groq-sdk";

dotenv.config();

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export const getChatResponse = async (req, res) => {
  try {
    const {
      message,
      language = "English",
    } = req.body;

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",

      messages: [
        {
          role: "system",
          content: `
You are AgriGuru AI, an expert agricultural assistant.

Selected Language: ${language}

Rules:

1. ALWAYS answer in the selected language.
2. Never switch languages unless the user changes language.
3. Give practical farming advice.
4. Keep answers between 100 and 200 words.

Use this structure:

🌾 Problem Analysis

Possible Causes:
• ...

Recommended Actions:
• ...

Prevention Tips:
• ...

Focus only on agriculture, crops, diseases, fertilizers, irrigation, weather and farming.
`,
        },
        {
          role: "user",
          content: message,
        },
      ],
    });

    res.json({
      response: completion.choices[0].message.content,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: error.message,
    });
  }
};