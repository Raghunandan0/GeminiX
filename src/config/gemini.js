
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

// ✅ Your API key from .env (with VITE_ prefix)
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
console.log("🔑 Gemini API Key loaded:", API_KEY);

// ✅ Use supported model
const MODEL_NAME = "models/gemini-1.5-flash"; // or "models/gemini-1.5-flash"

// ✅ Initialize without overriding the endpoint
const genAI = new GoogleGenerativeAI(API_KEY);

async function runChat(prompt) {
  try {
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });

    const generationConfig = {
      temperature: 0.7,
      topK: 1,
      topP: 1,
      maxOutputTokens: 2048,
    };

    const safetySettings = [
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
    ];

    const chat = model.startChat({
      generationConfig,
      safetySettings,
      history: [],
    });

    const result = await chat.sendMessage(prompt);
    return result.response.text();
  } catch (error) {
    console.error("❌ Gemini API Error:", error);
    throw new Error(
      "Unable to get a response. Please check your API key or model name."
    );
  }
}

export default runChat;



/*
import { config } from "dotenv";
config();

import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

const MODEL_NAME = "gemini-pro";
const API_KEY = process.env.GEMINI_API_KEY;

if (!API_KEY) {
  throw new Error("Missing Gemini API key in environment variables.");
}

async function runChat(prompt) {
  try {
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });

    const generationConfig = {
      temperature: 0.75,
      topK: 1,
      topP: 1,
      maxOutputTokens: 2048,
    };

    const safetySettings = [
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
    ];

    const chat = model.startChat({
      generationConfig,
      safetySettings,
      history: [],
    });

    const result = await chat.sendMessage(prompt);
    const response = result.response;
    return response.text();
  } catch (error) {
    console.error("Gemini API error:", error);
    return "Something went wrong. Please try again.";
  }
}

export default runChat; */
