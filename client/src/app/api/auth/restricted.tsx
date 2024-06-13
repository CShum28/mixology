import { getServerSession } from "next-auth/next";
import { useSession, signOut } from "next-auth/react";
import { authOptions } from "../auth/[...nextauth]/route";

// This helps protect the api route

export default async (req: any, res: any) => {
  // const session = await getServerSession(req, res, authOptions);

  const { data: session } = useSession();

  console.log("##: ", session);

  if (session) {
    res.send({
      content:
        "This is protected content. You can access this content because you are signed in.",
    });
  } else {
    res.redirect("/api/auth/signin");
  }
};
