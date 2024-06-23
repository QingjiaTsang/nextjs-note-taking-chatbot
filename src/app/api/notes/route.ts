import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { getEmbedding } from "@/lib/openai";
import {
  createNoteSchema,
  editNoteSchema,
  deleteNoteSchema,
} from "@/zodValidation/notes";
import { notesIndex } from "@/lib/pinecone";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const pageNum = searchParams.get("pageNum") ?? "1";
    const pageSize = searchParams.get("pageSize") ?? "10";

    // ! Note: if the request comes from server component fetcher, then userId out of auth() will be null
    // that's maybe because SSR component lose the context of the clerk auth when doing data fetching
    // so make sure making the request from client component
    const { userId } = auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const notes = await prisma.note.findMany({
      where: {
        authorId: userId,
      },
      skip: (+pageNum - 1) * +pageSize,
      take: +pageSize,
    });

    return NextResponse.json(notes, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsedResult = createNoteSchema.safeParse(body);
    if (!parsedResult.success) {
      console.error("parsedResult", parsedResult);
      return NextResponse.json({ error: "Invalid Input" }, { status: 400 });
    }
    const { title, content } = parsedResult.data;

    const { userId } = auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const embedding = await getEmbeddingForNotes({
      title,
      content,
    });

    const note = await prisma.$transaction(async (tx) => {
      const note = await tx.note.create({
        data: {
          title,
          content,
          authorId: userId,
        },
      });

      await notesIndex.upsert([
        {
          id: note.id,
          values: embedding,
          // filter on userId to get only notes created by the current user
          metadata: {
            userId,
          },
        },
      ]);

      return note;
    });

    return NextResponse.json(note, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const parsedResult = editNoteSchema.safeParse(body);
    if (!parsedResult.success) {
      console.error("parsedResult", parsedResult);
      return NextResponse.json({ error: "Invalid Input" }, { status: 400 });
    }
    const { id, title, content } = parsedResult.data;

    const { userId } = auth();

    const note = await prisma.note.findUnique({
      where: {
        id,
      },
    });

    if (!note) {
      return NextResponse.json({ error: "Note not found" }, { status: 404 });
    }

    if (!userId || note.authorId !== userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const embedding = await getEmbeddingForNotes({
      title,
      content,
    });

    const updatedNote = await prisma.$transaction(async (tx) => {
      const updatedNote = await tx.note.update({
        where: {
          id,
        },
        data: {
          title,
          content,
        },
      });

      await notesIndex.upsert([
        {
          id: updatedNote.id,
          values: embedding,
          metadata: {
            userId,
          },
        },
      ]);

      return updatedNote;
    });

    return NextResponse.json(updatedNote, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();
    const parsedResult = deleteNoteSchema.safeParse(body);
    if (!parsedResult.success) {
      console.error("parsedResult", parsedResult);
      return NextResponse.json({ error: "Invalid Input" }, { status: 400 });
    }
    const { id } = parsedResult.data;

    const { userId } = auth();

    const note = await prisma.note.findUnique({
      where: {
        id,
      },
    });

    if (!note) {
      return NextResponse.json({ error: "Note not found" }, { status: 404 });
    }

    if (!userId || note.authorId !== userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await prisma.$transaction(async (tx) => {
      await tx.note.delete({
        where: {
          id,
        },
      });

      await notesIndex.deleteOne(id);
    });

    return NextResponse.json({ message: "Note deleted" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

const getEmbeddingForNotes = async ({
  title,
  content,
}: {
  title: string;
  content?: string;
}) => {
  return getEmbedding(`${title} \n\n ${content ?? ""}`);
};
