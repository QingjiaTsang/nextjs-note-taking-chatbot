import Image from "next/image";
import Link from "next/link";

import {
  SignInButton,
  SignOutButton,
  SignUpButton,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs";

import { ModeToggle } from "@/components/ModeToggle";
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Separator } from "@radix-ui/react-separator";

import { MenuIcon } from "lucide-react";

export default function Website() {
  return (
    <div className="flex min-h-[100dvh] flex-col">
      <header className="flex h-14 items-center bg-[#1F2937] px-4 text-white shadow-md lg:px-6">
        <Link href={"/"} className="flex items-center">
          <Image
            src="/images/notebot-logo.png"
            alt="NoteBot Logo"
            width={40}
            height={40}
          />
          <div className="font-bold">NoteBot</div>
        </Link>
        <div className="ml-auto flex items-center gap-4 sm:gap-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full lg:hidden"
              >
                <MenuIcon className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="top">
              <div className="grid gap-4 py-6">
                <SignedOut>
                  <div className="flex w-full items-center py-1 text-lg font-semibold">
                    <SignInButton>Sign In</SignInButton>
                  </div>
                  <div className="flex w-full items-center py-1 text-lg font-semibold">
                    <SignUpButton>Sign Up</SignUpButton>
                  </div>
                </SignedOut>
                <SignedIn>
                  <div className="flex w-full items-center py-1 text-lg font-semibold">
                    <SignOutButton>Sign Out</SignOutButton>
                  </div>
                </SignedIn>

                <Separator className="my-1 border-t border-gray-200" />
                <div className="flex w-full items-center justify-between gap-2">
                  <div>Switch Theme: </div>
                  <ModeToggle />
                </div>
              </div>
            </SheetContent>
          </Sheet>

          <nav className="hidden gap-2 lg:flex">
            <SignedOut>
              <SignInButton>
                <Button size={"sm"}>Sign In</Button>
              </SignInButton>
              <SignUpButton>
                <Button size={"sm"} variant={"secondary"}>
                  Sign Up
                </Button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <SignOutButton>
                <Button size={"sm"} variant={"secondary"}>
                  Sign Out
                </Button>
              </SignOutButton>
            </SignedIn>
            <ModeToggle />
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full bg-[#1F2937] py-12 text-white md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
                  Unleash the Power of AI-Powered Notes
                </h1>
                <p className="mx-auto max-w-[700px] text-lg md:text-xl">
                  Effortlessly capture your thoughts, ideas, and insights with
                  our cutting-edge AI technology. Never miss a beat with our
                  intelligent note-taking assistant.
                </p>
              </div>
              <Link
                href="/notes"
                className="inline-flex h-12 items-center justify-center rounded-md bg-[#0EA5E9] px-8 text-sm font-medium text-[#1F2937] shadow transition-colors hover:bg-[#0284C7] hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                prefetch={false}
              >
                Get Started
              </Link>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center space-y-4 text-center">
                <LightbulbIcon className="h-12 w-12 text-[#0EA5E9]" />
                <h3 className="text-2xl font-bold">Intelligent Suggestions</h3>
                <p className="text-muted-foreground">
                  Our AI-powered assistant provides real-time suggestions and
                  insights to enhance your note-taking experience.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <RocketIcon className="h-12 w-12 text-[#0EA5E9]" />
                <h3 className="text-2xl font-bold">Seamless Collaboration</h3>
                <p className="text-muted-foreground">
                  Easily share and collaborate on notes with your team,
                  fostering a more connected and productive workflow.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <CloudIcon className="h-12 w-12 text-[#0EA5E9]" />
                <h3 className="text-2xl font-bold">Secure Cloud Storage</h3>
                <p className="text-muted-foreground">
                  Your notes are securely stored in the cloud, ensuring your
                  data is safe and accessible from anywhere.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full bg-[#1F2937] py-12 text-white md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Elevate Your Note-Taking Experience
                </h2>
                <p className="mx-auto max-w-[900px] text-lg md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our AI-powered note-taking platform is designed to streamline
                  your workflow, boost productivity, and unlock new levels of
                  creativity.
                </p>
              </div>
              <Link
                href="/notes"
                className="inline-flex h-12 items-center justify-center rounded-md bg-[#0EA5E9] px-8 text-sm font-medium text-[#1F2937] shadow transition-colors hover:bg-[#0284C7] hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                prefetch={false}
              >
                Explore
              </Link>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex w-full shrink-0 flex-col items-center gap-2 border-t bg-[#1F2937] px-4 py-6 text-white sm:flex-row md:px-6">
        <p className="flex gap-4 text-xs sm:ml-auto sm:gap-6">
          &copy; 2024 AI Notes. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

function CloudIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
    </svg>
  );
}

function LightbulbIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
      <path d="M9 18h6" />
      <path d="M10 22h4" />
    </svg>
  );
}

function PenIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
    </svg>
  );
}

function RocketIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
      <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </svg>
  );
}
