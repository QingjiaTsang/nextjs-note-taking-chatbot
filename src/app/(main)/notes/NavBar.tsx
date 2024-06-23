"use client";
import React, { FC, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { SignedIn, UserButton } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { ModeToggle } from "@/components/ModeToggle";
import WriteNoteModal from "@/app/(main)/notes/WriteNoteModal";

import { Bot, Menu, Plus } from "lucide-react";
import AIChatModal from "@/components/AIChatModal";

type TProps = {};
const NavBar: FC<TProps> = (props) => {
  const { theme } = useTheme();

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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu />
                <span className="sr-only">menu button</span>
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <div className="flex w-full items-center gap-1">
                  <ModeToggle />
                  <div>{theme === "dark" ? "Dark" : "Light"} Mode</div>
                </div>
              </DropdownMenuItem>

              <SignedIn>
                <DropdownMenuItem>
                  <Button
                    className="w-full"
                    size={"sm"}
                    onClick={() => setOpenWriteNoteModal(true)}
                  >
                    <Plus />
                    Add Note
                  </Button>
                </DropdownMenuItem>

                <DropdownMenuItem>
                  <Button
                    className="w-full"
                    size={"sm"}
                    onClick={() => setOpenAIChatModal(true)}
                  >
                    <Bot className="mr-2 h-5 w-5" />
                    AI Chat
                  </Button>
                </DropdownMenuItem>
              </SignedIn>
            </DropdownMenuContent>
          </DropdownMenu>
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
