import { ClerkProvider } from "@clerk/nextjs";

import "../globals.css";

export const metadata = {
  title: "NoteBot",
  description: "Chat with AI Note Taking Bot",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ClerkProvider>
          <div className="flex h-screen w-screen items-center justify-center">
            {children}
          </div>
        </ClerkProvider>
      </body>
    </html>
  );
}
