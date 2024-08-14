import { ReactNode } from "react";

export default async function HomeLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <main className=" max-w-screen-2xl mx-auto min-h-screen pb-8 p-0 space-y-4">
      {children}
    </main>
  );
}
