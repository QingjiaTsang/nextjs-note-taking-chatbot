"use client";
import React, { FC, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  SignInButton,
  SignOutButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";

import { ModeToggle } from "@/components/ModeToggle";
import WriteNoteModal from "@/app/(main)/notes/WriteNoteModal";
import AIChatModal from "@/components/AIChatModal";

import { Bot, MenuIcon, Plus } from "lucide-react";

type TProps = {};
const NavBar: FC<TProps> = (props) => {
  const { theme } = useTheme();

  const [openDropdownMenu, setOpenDropdownMenu] = useState(false);
  const [openWriteNoteModal, setOpenWriteNoteModal] = useState(false);
  const [openAIChatModal, setOpenAIChatModal] = useState(false);

  return (
    <div className="p-4 shadow">
      <div className="mx-2 flex items-center md:mx-20">
        <Link href={"/"} className="flex items-center">
          <Image
            src="/images/notebot-logo.png"
            alt="NoteBot Logo"
            width={40}
            height={40}
          />
          <div className="font-bold">NoteBot</div>
        </Link>

        <div className="ms-auto block md:hidden">
          <Sheet open={openDropdownMenu} onOpenChange={setOpenDropdownMenu}>
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
                <SignedIn>
                  <Button
                    className="left w-full"
                    size={"sm"}
                    onClick={() => {
                      setOpenWriteNoteModal(true);
                      setOpenDropdownMenu(false);
                    }}
                  >
                    <Plus />
                    Add Note
                  </Button>

                  <Button
                    className="w-full"
                    size={"sm"}
                    onClick={() => {
                      setOpenAIChatModal(true);
                      setOpenDropdownMenu(false);
                    }}
                  >
                    <Bot className="mr-2 h-5 w-5" />
                    AI Chat
                  </Button>
                </SignedIn>

                <Separator className="my-1 border-t border-gray-200" />
                <div className="flex w-full items-center justify-between gap-2">
                  <div>Switch Theme: </div>
                  <ModeToggle />
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <div className="ms-auto hidden items-center gap-1 md:flex">
          <ModeToggle />

          <SignedIn>
            <Button
              className="gap-1"
              size={"sm"}
              onClick={() => setOpenWriteNoteModal(true)}
            >
              <Plus />
              Add Note
            </Button>

            <Button size={"sm"} onClick={() => setOpenAIChatModal(true)}>
              <Bot className="mr-2 h-5 w-5" />
              AI Chat
            </Button>
          </SignedIn>
        </div>

        <div className="ml-1 flex items-center">
          <SignedIn>
            <UserButton
              afterSignOutUrl="/"
              appearance={{
                baseTheme: theme === "dark" ? dark : undefined,
                elements: {
                  userButton: {
                    display: "flex",
                    flexDirection: "row-reverse",
                  },
                  avatarBox: {
                    width: 32,
                    height: 32,
                  },
                },
              }}
            />
          </SignedIn>
        </div>
      </div>

      <WriteNoteModal
        modalActionCaption="Create"
        open={openWriteNoteModal}
        setOpen={setOpenWriteNoteModal}
      />

      <AIChatModal
        open={openAIChatModal}
        onClose={() => setOpenAIChatModal(false)}
      />
    </div>
  );
};
export default NavBar;
