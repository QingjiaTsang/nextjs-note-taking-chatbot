import type { Metadata } from "next";

import NavBar from "@/app/(main)/notes/NavBar";

export const metadata: Metadata = {
  title: "NoteBot",
  description: "Chat with AI Note Taking Bot",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <NavBar />
      <div className="mx-6 mt-2 md:mx-24">{children}</div>
    </div>
  );
}
