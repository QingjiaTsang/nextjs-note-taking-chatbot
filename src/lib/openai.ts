import OpenAI from "openai";

const apiKey = process.env.OPENAI_API_KEY;
// proxy from chatanywhere
// https://github.com/chatanywhere/GPT_API_free
const baseURL = process.env.OPENAI_API_BASE_URL;

if (!apiKey) {
  throw new Error("Missing OPENAI_API_KEY");
}

if (!baseURL) {
  throw new Error("Missing OPENAI_API_BASE_URL");
}

export const openai = new OpenAI({
  baseURL,
  apiKey,
});

export default openai;

export const getEmbedding = async (text: string) => {
  const response = await openai.embeddings.create({
    model: "text-embedding-ada-002",
    input: text,
  });

  const embedding = response.data[0].embedding;

  console.log(`embedding`, embedding);

  if (!embedding) {
    throw new Error("Failed to get embedding");
  }

  return embedding;
};
