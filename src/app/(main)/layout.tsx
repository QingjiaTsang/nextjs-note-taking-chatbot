import { Inter } from "next/font/google";

import { ClerkProvider } from "@clerk/nextjs";

import { ThemeProvider } from "@/components/ThemeProvider";
import ToastProvider from "@/components/ToastProvider";

import "../globals.css";

const inter = Inter({ subsets: ["latin"] });

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
      <body className={inter.className}>
        <ClerkProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <ToastProvider />
            <div>{children}</div>
          </ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
