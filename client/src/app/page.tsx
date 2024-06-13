"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import LoginButton from "../components/buttons/LoginButton";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import { useSession, signOut } from "next-auth/react";

export default function Home() {
  const router = useRouter();

  const { data: session } = useSession();

  useEffect(() => {
    console.log(session);
  }, [session]);

  if (session) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-24 gap-y-4">
        <p>Signed in as: {session?.user?.name}</p>
        <p>Email: {session?.user?.email}</p>
        <PrimaryButton onClick={() => signOut()}>
          Sign out of Spotify
        </PrimaryButton>
      </main>
    );
  } else {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-24">
        {/* this hidden span is needed to space everything out, allowed mixology text and icon to be in center and login/sign up buttons to be at bottom */}
        <span className="hidden">
          <p>text</p>
        </span>
        <div className="flex flex-col items-center gap-y-4 my-auto">
          <p className="h-20 w-20 bg-gray rounded-full"></p>
          <p className="h-9 font-bold text-24px leading-9 w-173px">
            Mixology App
          </p>
        </div>
        <div className="mt-6/12">
          <LoginButton />
        </div>
      </main>
    );
  }
}
