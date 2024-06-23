import React, { FC, useState } from "react";
import { Note } from "@prisma/client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

import WriteNoteModal from "@/app/(main)/notes/WriteNoteModal";

type TProps = {
  note: Note;
};

const NoteCard: FC<TProps> = ({ note }) => {
  return (
    <WriteNoteModal modalAction="Edit" noteToEdit={note}>
      <Card className="cursor-pointer shadow-md transition-shadow hover:shadow-lg hover:shadow-slate-600">
        <CardHeader>
          <HoverCard>
            <HoverCardTrigger>
              <CardTitle className="group w-full truncate">
                {note.title}
              </CardTitle>
            </HoverCardTrigger>
            <HoverCardContent side="top">{note.title}</HoverCardContent>
          </HoverCard>

          <hr />
          <CardDescription>
            {new Date(note.updatedAt).toDateString()}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="w-full truncate">{note.content}</p>
        </CardContent>
      </Card>
    </WriteNoteModal>
  );
};
export default NoteCard;
