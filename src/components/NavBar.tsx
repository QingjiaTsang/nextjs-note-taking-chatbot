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
import { Button } from "@/components/ui/button";

import { Plus } from "lucide-react";

type TProps = {};
const NavBar: FC<TProps> = (props) => {
  return (
    <div className="p-4 shadow">
      <div className="mx-2 flex items-center md:mx-20">
        <Link href={"/"} className="flex items-center">
          <Image
            src="/images/notebot-logo-lightmode.png"
            alt="NoteBot Logo"
            width={40}
            height={40}
          />
          <div className="font-bold">NoteBot</div>
        </Link>
        <div className="ms-auto">
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
            <div className="flex gap-2">
              <Button className="gap-1" size={"sm"}>
                <Plus />
                Add Note
              </Button>
              <UserButton
                afterSignOutUrl="/"
                appearance={{
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
            </div>
          </SignedIn>
        </div>
      </div>
    </div>
  );
};
export default NavBar;
