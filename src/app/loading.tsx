import { SvgIcon } from "@/components/ui/svg-icons";
import { Spinner } from "@nextui-org/spinner";

export default function Loading() {
  return (
    <main className="min-h-screen flex flex-col gap-4 justify-center items-center">
      <Spinner size="lg" />
      <SvgIcon.logo className="size-24 text-primary" />
    </main>
  );
}
