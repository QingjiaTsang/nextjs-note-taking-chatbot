import { z } from "zod";

export const createNoteSchema = z.object({
  title: z.string().min(1, {
    message: "Title is required",
  }),
  content: z.string().optional(),
});

export type TCreateNoteData = z.infer<typeof createNoteSchema>;

export const editNoteSchema = createNoteSchema.extend({
  id: z.string().min(1),
});

export const deleteNoteSchema = z.object({
  id: z.string().min(1),
});
