import { auth } from "@/auth";
import { DEFAULT_SIGNIN_REDIRECT } from "@/lib/routes";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { redirect } from "next/navigation";
import SignIn from "./_components/sign-in";
import SignInHeader from "./_components/sign-in-header";

export default async function SignInPage() {
  const session = await auth();
  if (session) {
    redirect(DEFAULT_SIGNIN_REDIRECT);
  }

  return (
    <main className="container max-w-5xl mx-auto min-h-screen px-2 py-4 md:px-4 space-y-8">
      <Card classNames={{ base: "max-w-sm mx-auto mt-10" }}>
        <CardHeader>
          <SignInHeader />
        </CardHeader>

        <CardBody className="space-y-4">
          <SignIn />
        </CardBody>
      </Card>
    </main>
  );
}
