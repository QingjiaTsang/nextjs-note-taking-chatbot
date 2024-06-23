import { Pinecone } from "@pinecone-database/pinecone";

const apiKey = process.env.PINECONE_API_KEY;

if (!apiKey) {
  throw new Error("Missing PINECONE_API_KEY");
}

export const pinecone = new Pinecone({
  apiKey: apiKey,
});

export const notesIndex = pinecone.Index("notebot");
