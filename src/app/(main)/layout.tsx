import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";

import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import NavBar from "@/components/NavBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI Note Taking Bot",
  description: "Chat with AI Note Taking Bot",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <NavBar />
          <div className="mx-6 mt-2 md:mx-24">{children}</div>
        </body>
      </html>
    </ClerkProvider>
  );
}
