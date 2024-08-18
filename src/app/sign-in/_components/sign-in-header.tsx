import Heading from "@/components/ui/heading";

export default function SignInHeader() {
  return (
    <div className="flex flex-col gap-2">
      <Heading>Sign in</Heading>
      <p className="text-small text-default-500">
        Sign in to your account to access your watch history and saved lists.
      </p>
    </div>
  );
}
