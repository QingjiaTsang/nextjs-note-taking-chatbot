import React, { FC } from "react";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";

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
          NoteBot
        </Link>
        <div className="ms-auto">
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton showName={true} />
          </SignedIn>
        </div>
      </div>
    </div>
  );
};
export default NavBar;
