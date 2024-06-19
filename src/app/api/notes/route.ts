import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { pageNum?: string; pageSize?: string } },
) {
  try {
    const { pageNum = "1", pageSize = "10" } = params;

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
    // todo: 改用zod来进行校验
    const body = await request.json();
    const { title, content } = body;

    const { userId } = auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!title) {
      return NextResponse.json({ error: "Missing title" }, { status: 400 });
    }

    const note = await prisma.note.create({
      data: {
        title,
        content,
        authorId: userId,
      },
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
    // todo: 改用zod来进行校验
    const body = await request.json();
    const { id, title, content } = body;

    const { userId } = auth();

    if (!title) {
      return NextResponse.json({ error: "Missing title" }, { status: 400 });
    }

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

    const updatedNote = await prisma.note.update({
      where: {
        id,
      },
      data: {
        title,
        content,
      },
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

// delete user's notes
export async function DELETE(request: NextRequest) {
  try {
    // todo: 改用zod来进行校验
    const body = await request.json();
    const { id } = body;

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

    const deletedNote = await prisma.note.delete({
      where: {
        id,
      },
    });

    return NextResponse.json(deletedNote, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
