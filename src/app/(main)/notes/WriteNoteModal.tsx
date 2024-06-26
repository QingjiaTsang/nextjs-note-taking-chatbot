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
import useSWRMutation from "swr/mutation";
import { LoadingButton } from "@/components/LoadingButton";

const createNoteFetcher = async (values: TCreateNoteData) => {
  const res = await fetch("/api/notes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  });

  if (!res.ok) {
    throw new Error("Failed to create note");
  }
};

const updateNoteFetcher = async (
  values: Pick<Note, "id" | "title" | "content">,
) => {
  const res = await fetch("/api/notes", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...values,
    }),
  });

  if (!res.ok) {
    throw new Error("Failed to update note");
  }
};

const deleteNoteFetcher = async (
  url: string,
  { arg }: { arg: { id: string } },
) => {
  const { id } = arg;
  await fetch("/api/notes", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  });
};

type TProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  modalActionCaption: string;
  noteToEdit?: Note;
};
const WriteNoteModal: FC<TProps> = ({
  open,
  setOpen,
  modalActionCaption,
  noteToEdit,
}) => {
  const { mutate } = useSWRConfig();

  const { trigger: deleteNote, isMutating: isDeleting } = useSWRMutation(
    "deleteNote",
    deleteNoteFetcher,
    {
      onSuccess: () => {
        mutate("/api/notes?pageNum=1&pageSize=999");
        toast.success("Note deleted");
      },
      onError: () => {
        toast.error("Failed to delete note");
      },
    },
  );

  const form = useForm<TCreateNoteData>({
    resolver: zodResolver(createNoteSchema),
    defaultValues: {
      title: noteToEdit?.title || "",
      content: noteToEdit?.content || "",
    },
  });

  const onSubmit = async (values: TCreateNoteData) => {
    try {
      if (!noteToEdit) {
        await createNoteFetcher(values);
        toast.success("Note created");
        form.reset();
      } else {
        await updateNoteFetcher({
          id: noteToEdit!.id,
          title: values.title,
          content: values.content ?? "",
        });
        toast.success("Note updated");
      }

      mutate("/api/notes?pageNum=1&pageSize=999");
      setOpen(false);
    } catch (error) {
      console.error(error);
      if (!noteToEdit) {
        toast.error("Failed to create note");
      }
      toast.error("Failed to update note");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{modalActionCaption} Note</DialogTitle>
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
                {!!noteToEdit && (
                  <LoadingButton
                    type="button"
                    variant="destructive"
                    isLoading={isDeleting}
                    onClick={() =>
                      deleteNote({
                        id: noteToEdit.id,
                      })
                    }
                  >
                    Delete
                  </LoadingButton>
                )}
                <LoadingButton
                  type="submit"
                  isLoading={form.formState.isSubmitting}
                >
                  {modalActionCaption}
                </LoadingButton>
              </div>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
export default WriteNoteModal;
