import { NextRequest, NextResponse } from "next/server";

import { CoreMessage, streamText } from "ai";
import { createOpenAI } from "@ai-sdk/openai";
import { getEmbedding } from "@/lib/openai";

import { notesIndex } from "@/lib/pinecone";

import prisma from "@/lib/prisma";

import { auth } from "@clerk/nextjs/server";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

// !Note: must customize the OpenAI provider for our baseURL and API key
// reference:
// https://sdk.vercel.ai/providers/ai-sdk-providers/openai#provider-instance
const openai = createOpenAI({
  compatibility: "strict", // strict mode, enable when using the OpenAI API
  baseURL: process.env.OPENAI_API_BASE_URL,
  apiKey: process.env.OPENAI_API_KEY,
});

// based on the guides:
// https://sdk.vercel.ai/docs/getting-started/nextjs-app-router
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const messages: CoreMessage[] = body.messages;

    const embedding = await getEmbedding(
      messages.map((message) => message.content).join("\n"),
    );

    const { userId } = auth();

    const vectorQueryResponse = await notesIndex.query({
      vector: embedding,
      topK: 30,
      filter: { userId },
    });

    const relevantNotes = await prisma.note.findMany({
      where: {
        id: {
          in: vectorQueryResponse.matches.map((match) => match.id),
        },
      },
    });

    console.log(`relevantNotes`, relevantNotes);

    const systemMessage: CoreMessage = {
      role: "system",
      content:
        "You are an intelligent note-taking app. You answer the user's question based on their existing notes." +
        "The relevant notes for this query are:\n" +
        relevantNotes
          .map((note) => `Title: ${note.title}\nContent: ${note.content}\n`)
          .join("\n\n"),
    };

    const result = await streamText({
      model: openai("gpt-3.5-turbo"),
      messages: [systemMessage, ...messages],
    });

    return result.toAIStreamResponse();
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
