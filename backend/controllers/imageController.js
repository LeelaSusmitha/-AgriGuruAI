import Groq from "groq-sdk";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export const analyzeImage = async (req, res) => {
  try {
    if (!req.file) {
      console.log(req.file);
      return res.status(400).json({
        error: "No image uploaded",
      });
    }

    const imageBuffer = fs.readFileSync(req.file.path);
    const base64Image = imageBuffer.toString("base64");
    console.log("Image uploaded:", req.file.originalname);
    console.log("Base64 length:", base64Image.length);
    console.log("File:", req.file);

    console.log(
    "Base64 Length:",
    base64Image.length
    );
    const completion = await groq.chat.completions.create({
      model: "meta-llama/llama-4-scout-17b-16e-instruct",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: `
You are AgriGuru AI, an expert agricultural crop disease specialist.

Carefully inspect the uploaded image.

Rules:

1. First determine whether the image contains a crop/plant.
2. If the image is NOT a crop image, respond:

❌ Not a Crop Image

Detected Object:
...

Reason:
...

3. If the image contains a crop, generate the report EXACTLY in this format:

🌾 Crop Analysis Report

Detected Crop:
...

Confidence:
...%

Possible Disease:
...

Severity:
Low / Medium / High

Visible Symptoms:
• ...
• ...
• ...

Recommended Treatment:
• ...
• ...
• ...

Prevention Tips:
• ...
• ...
• ...

Recommended Fertilizer:
• ...

Farmer Advice:
...

4. Keep the response concise and professional.

5. Never invent diseases if the image is unclear.

6. If uncertain, clearly mention:
"Unable to confidently identify the disease from the image."
`,
            },
            {
              type: "image_url",
              image_url: {
                url: `data:image/jpeg;base64,${base64Image}`,
              },
            },
          ],
        },
      ],
    });

    res.json({
      result: completion.choices[0].message.content,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: error.message,
    });
  }
};