"use client";
import { Note } from "@prisma/client";

import React, { FC } from "react";
import useSWR from "swr";

import { Skeleton } from "@/components/ui/skeleton";

import NoteCard from "@/app/(main)/notes/NoteCard";

type TProps = {};

const fetcher = async (...args: Parameters<typeof fetch>) => {
  const res = await fetch(...args);
  return res.json();
};

const NoteList: FC<TProps> = (props) => {
  const {
    data: noteList,
    error,
    isLoading,
  } = useSWR<Note[]>("/api/notes?pageNum=1&pageSize=999", fetcher);

  if (isLoading) {
    return (
      <div className="flex h-screen flex-col space-y-2">
        <Skeleton className="h-4 w-3/12" />
        <Skeleton className="h-1/6" />
        <Skeleton className="h-4 w-3/12" />
        <Skeleton className="h-1/6" />
        <Skeleton className="h-4 w-3/12" />
        <Skeleton className="h-1/6" />
      </div>
    );
  }

  if (error) {
    return <div className="font-bold text-destructive">{error.message}</div>;
  }

  if (!noteList?.length) {
    return <div>No Note Found</div>;
  }

  return (
    <div className="grid grid-flow-row grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
      {noteList.map((note) => (
        <NoteCard note={note} key={note.id} />
      ))}
    </div>
  );
};
export default NoteList;
