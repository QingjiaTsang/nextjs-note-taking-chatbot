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

import WriteNoteModal from "@/app/(main)/notes/_components/WriteNoteModal";

type TProps = {
  note: Note;
};

const NoteCard: FC<TProps> = ({ note }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Card
        className="cursor-pointer shadow-md transition-shadow hover:shadow-lg hover:shadow-slate-600"
        onClick={() => setOpen(true)}
      >
        <CardHeader>
          <HoverCard>
            <HoverCardTrigger>
              <CardTitle className="w-full truncate p-0.5">
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

      <WriteNoteModal
        modalActionCaption="Edit"
        noteToEdit={note}
        open={open}
        setOpen={setOpen}
      />
    </>
  );
};
export default NoteCard;
