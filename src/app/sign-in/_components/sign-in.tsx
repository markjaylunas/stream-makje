import { SvgIcon } from "@/components/ui/svg-icons";
import OAuthButon from "./oauth-button";

export default function SignIn() {
  return (
    <>
      <OAuthButon
        variant="flat"
        startContent={<SvgIcon.google />}
        provider="google"
      >
        Sign in with Google
      </OAuthButon>
      <OAuthButon
        variant="flat"
        startContent={<SvgIcon.github />}
        provider="github"
      >
        Sign in with Github
      </OAuthButon>
    </>
  );
}
