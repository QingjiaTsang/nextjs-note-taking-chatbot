import { Metadata } from "next";
import { SignIn } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "NoteBot",
  description: "Chat with AI Note Taking Bot",
};

export default function Page() {
  return <SignIn />;
}
