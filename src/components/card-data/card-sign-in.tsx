import CardLink from "./card-link";

export default function CardSignIn() {
  return (
    <div className="h-52 w-full sm:w-fit aspect-5/3 m-0 px-4 sm:px-10">
      <CardLink
        href="sign-in"
        title="Login to Access Your Watch History"
        description="Keep track of your favorite shows and pick up right where you left off! Login now to view your watch history and enjoy a seamless viewing experience."
        orientation="horizontal"
        className="px-4"
        showIcon={false}
      />
    </div>
  );
}
