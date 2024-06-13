import Profile from "./profile";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

export default async function Page() {
  const session = await getServerSession();

  if (session) {
    return <Profile />;
  } else {
    redirect("/api/auth/signin");
  }
}
