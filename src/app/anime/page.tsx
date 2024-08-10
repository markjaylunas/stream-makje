import { Suspense } from "react";
import PopularList from "./_components/popular-list";

export default async function Page() {
  return (
    <main className="space-y-8">
      <section className="container max-w-5xl mx-auto min-h-screen px-2 py-4 md:px-4 space-y-8">
        <Suspense fallback={<>loading...</>}>
          <PopularList />
        </Suspense>
      </section>
    </main>
  );
}
