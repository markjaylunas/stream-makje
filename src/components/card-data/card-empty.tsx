import CardLink from "./card-link";

export default function CardEmpty() {
  return (
    <div className="h-52 w-full sm:w-fit aspect-5/3 m-0 px-4 sm:px-10">
      <CardLink
        title="Your Watch History is Empty"
        description="You haven't watched anything yet. Start exploring and your watch history will appear here as you enjoy your favorite shows!"
        orientation="horizontal"
        className="px-4"
        showIcon={false}
      />
    </div>
  );
}
