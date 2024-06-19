"use client";
import React, { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
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

import { Menu, Plus } from "lucide-react";

type TProps = {};
const NavBar: FC<TProps> = (props) => {
  const { theme } = useTheme();

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
                <div className="flex items-center gap-1">
                  <ModeToggle />
                  <div>{theme === "dark" ? "Dark" : "Light"} Mode</div>
                </div>
              </DropdownMenuItem>

              <SignedIn>
                <DropdownMenuItem>
                  <Button className="gap-1" size={"sm"}>
                    <Plus />
                    Add Note
                  </Button>
                </DropdownMenuItem>
              </SignedIn>

              <SignedOut>
                <DropdownMenuItem>
                  <SignInButton>
                    <Button className="w-full">Sign In</Button>
                  </SignInButton>
                </DropdownMenuItem>
              </SignedOut>

              <SignedOut>
                <DropdownMenuItem>
                  <SignUpButton>
                    <Button variant="outline" className="w-full">
                      Sign Up
                    </Button>
                  </SignUpButton>
                </DropdownMenuItem>
              </SignedOut>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="ms-auto hidden items-center gap-1 md:flex">
          <ModeToggle />

          <SignedOut>
            <div className="flex gap-1">
              <SignInButton>
                <Button>Sign In</Button>
              </SignInButton>
              <SignUpButton>
                <Button variant="outline">Sign Up</Button>
              </SignUpButton>
            </div>
          </SignedOut>

          <SignedIn>
            <Button className="gap-1" size={"sm"}>
              <Plus />
              Add Note
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
    </div>
  );
};
export default NavBar;
