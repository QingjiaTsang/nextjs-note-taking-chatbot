/* eslint-disable react/no-unescaped-entities */
"use client";
import { Note } from "@prisma/client";

import React, { FC, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { TCreateNoteData, createNoteSchema } from "@/zodValidation/notes";

import { toast } from "react-toastify";
import { useSWRConfig } from "swr";

type TProps = {
  modalAction: string;
  noteToEdit?: Note;
  children: React.ReactNode;
};
const WriteNoteModal: FC<TProps> = ({ modalAction, noteToEdit, children }) => {
  const [open, setOpen] = useState(false);

  const { mutate } = useSWRConfig();

  const form = useForm<TCreateNoteData>({
    resolver: zodResolver(createNoteSchema),
    defaultValues: {
      title: noteToEdit?.title || "",
      content: noteToEdit?.content || "",
    },
  });

  const handleCreateNote = async (values: TCreateNoteData) => {
    await fetch("/api/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
  };

  const handleUpdateNote = async (values: TCreateNoteData) => {
    await fetch("/api/notes", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: noteToEdit!.id,
        ...values,
      }),
    });
  };

  const handleDeleteNote = async () => {
    try {
      await fetch("/api/notes", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: noteToEdit!.id,
        }),
      });

      mutate("/api/notes?pageNum=1&pageSize=999");
      toast.success("Note deleted");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete note");
    }

    setOpen(false);
  };

  const onSubmit = async (values: TCreateNoteData) => {
    try {
      if (modalAction === "Create") {
        await handleCreateNote(values);
        toast.success("Note created");
      } else {
        await handleUpdateNote(values);
        toast.success("Note updated");
      }

      // form.reset();
      mutate("/api/notes?pageNum=1&pageSize=999");
    } catch (error) {
      console.error(error);
      toast.error("Failed to create note");
    }

    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{modalAction} Note</DialogTitle>
          <DialogDescription>
            Write your note here. Click add when you're done.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Type your note here..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex">
              <div className="ms-auto flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleDeleteNote}
                >
                  Delete
                </Button>
                <Button type="submit">{modalAction}</Button>
              </div>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
export default WriteNoteModal;
