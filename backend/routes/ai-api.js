const express = require("express");
const router = express.Router();

const OpenAI = require("openai");
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});


router.post("/chat", async (req, res) => {
  const { prompt } = req.body;
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ "role": "user", "content": prompt }],
      max_tokens: 512,
      temperature: 0,
    });
    res.send(completion.choices[0]);
  } catch (error) {
    console.error("Error making OpenAI API call:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
