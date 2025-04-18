import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import fetch from "node-fetch";
import dotenv from "dotenv";
const app = express();
const PORT = 5000;

dotenv.config();
app.use(cors());
app.use(bodyParser.json());

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
app.post("/api/review", async (req, res) => {
  const { username } = req.body;

  if (!username) {
    return res.status(400).json({ error: "GitHub username is required" });
  }

  try {
    // Fetch repositories
    const repoRes = await fetch(
      `https://api.github.com/users/${username}/repos`
    );
    const repos = await repoRes.json();

    if (!Array.isArray(repos)) {
      return res.status(404).json({ error: "GitHub repositories not found" });
    }

    // Top 10 epositories info (name, description, language)
    const topRepos = repos
      .slice(0, 10)
      .map((repo, index) => {
        return `${index + 1}. ${repo.name} - ${
          repo.description || "No description"
        } - Tech: ${repo.language || "Unknown"}`;
      })
      .join("\n");

    // Focused prompt for Gemini
    const prompt = `Ek aisi GitHub profile review likhni hai jo bindass, seedhi aur full-on hinglish style me ho 😎. Review ki starting ek funny joke ya punchline se karo 😂 jisse reader ka mood ban jaye.

Uske baad agar GitHub profile me kaafi achi repositories hain aur technologies achhi use hui hain, to us user ki dhamakedaar tareef karo — jaise "bhai tu to sach me coding ka baap nikla", ya "AI bhi tujhse training maang raha hoga" type 😅🔥.

Lekin agar profile me faltu ya random type repos hain, technologies weak hain ya real-world application nahi dikh raha, to seedha roast karo 👊 — jaise "bhai tu GitHub pe code daalne aaya tha ya selfie?", ya "kya kar raha hai bhai, isse achha to TikTok video daal de!" 😬💣

Niche diye gaye repositories ka analysis do:  
Kaun si technology use hui hai (React, Node, C++, etc.), uska kaam kya hai aur real-world me use kaha ho sakta hai 💡. Har repo ke liye short 2-3 line likhni hai jo bataye ki wo useful hai ya bekaar 🚀🔥

Language Hinglish (Roman Hindi + English mix) me ho jese "Isme Express.js use hua hai, matlab backend ekdum tez aur reliable ban gaya hai!" type. Beech beech me cool emojis use karo ✨😎💻

Motivational lines bhi kabhi kabhi daalo — jaise "Sacha coder kabhi Github repo chhota nahi banata!" ya "Kal kisne dekha? Aaj code likh bhai!" 💪🔥

Review approx 300 words ka ho. Style thoda funny, thoda inspiring, thoda savage ho — ekdum engaging jisse banda padhte hi ya to smile kare ya sochne lage 🔥🧠 isme yesa mat bata joke pahile ya madme nahi bolna direact suna dena

Yeh rahe repositories:

${topRepos}  yesi hi output do par ye mat batao ki ye joke hai ya motivational line hai be genuine jaise technical person judge karega vaise hi juidge karo
`;

    // Gemini API request
    const geminiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
      }
    );

    const geminiData = await geminiRes.json();

    if (!geminiData.candidates || !geminiData.candidates[0]) {
      throw new Error("Invalid Gemini API response");
    }

    const reviewText = geminiData.candidates[0].content.parts[0].text;

    res.json({ review: reviewText });
  } catch (err) {
    console.error("Error:", err.message);
    res
      .status(500)
      .json({ error: "Failed to generate review", details: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
