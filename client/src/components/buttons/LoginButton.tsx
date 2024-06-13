"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import PrimaryButton from "./PrimaryButton";
import { useRouter } from "next/navigation";

export default function LoginButton() {
  const router = useRouter();

  const spotifySignUpUrl =
    "https://www.spotify.com/ca-en/signup?flow_ctx=7b5380c7-80d0-4cdb-a2c7-1916f74f42c2%3A1717648740";

  return (
    <div className="flex flex-col gap-y-4">
      <PrimaryButton onClick={() => window.open(spotifySignUpUrl, "_blank")}>
        Sign up with Spotify
      </PrimaryButton>
      <PrimaryButton
        onClick={() => {
          signIn("spotify", { callbackUrl: "/profile" }); // sign in and navigate to /profile page
        }}
      >
        Log in with Spotify
      </PrimaryButton>
    </div>
  );
}
