"use client";
import { Note } from "@prisma/client";

import React, { FC, useState } from "react";
import useSWR from "swr";

import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

import NoteCard from "@/app/(main)/notes/_components/NoteCard";
import Image from "next/image";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type TProps = {};

const fetcher = async (...args: Parameters<typeof fetch>) => {
  const res = await fetch(...args);
  return res.json();
};

const pageSize = 16;

const NoteList: FC<TProps> = (props) => {
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: noteList,
    error,
    isLoading,
  } = useSWR<Note[]>(
    `/api/notes?pageNum=${currentPage}&pageSize=${pageSize}`,
    fetcher,
  );

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
    return (
      <div className="flex h-[calc(100vh-72px)] flex-col items-center justify-center">
        <Image src={"/images/empty.png"} alt="empty" width={200} height={200} />
        <p className="text-center text-2xl font-bold">没有笔记</p>
      </div>
    );
  }

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (noteList.length === pageSize) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-82px)] flex-col justify-between md:min-h-[calc(100vh-112px)]">
      <div className="grid grid-flow-row grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {noteList.map((note) => (
          <NoteCard note={note} key={note.id} />
        ))}
      </div>

      <div className="mt-4">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={handlePrevPage}
                aria-disabled={currentPage === 1}
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink>{currentPage}</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext
                onClick={handleNextPage}
                aria-disabled={noteList.length < pageSize}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};
export default NoteList;
