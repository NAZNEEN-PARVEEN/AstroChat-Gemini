import axios from "axios";
import "dotenv/config";

export const getGeminiAPIResponse  = async (userText) => {
    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

    if (!GEMINI_API_KEY) {
        throw new Error("GEMINI_API_KEY is not set in environment variables.");
    }

    try {
        const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
            {
                contents: [
                    {
                        role: "user",              // ✅ important
                        parts: [{ text: userText }] // ✅ wrapped correctly
                    }
                ]
            },
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );

        const generatedText =
            response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

        return generatedText;

    } catch (error) {
        console.error("Error calling Gemini API:", error.response?.data || error.message);
        throw new Error("Failed to generate content from API.");
    }
};

export default getGeminiAPIResponse ;


