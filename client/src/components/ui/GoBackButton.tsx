import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface GoBackButtonProps {
  url: string;
  label: string;
}
const GoBackButton = ({ url, label }: GoBackButtonProps) => {
  return (
    <Link href={url} aria-label="Go back to gallery">
      <button
        className="text-light_3 group relative mb-10 h-14 w-48 rounded-2xl bg-neutral_1 text-center text-xl font-semibold"
        type="button"
      >
        <div className="absolute left-1 top-[4px] z-10 flex h-12 w-1/4 items-center justify-center rounded-xl bg-light_2 duration-500 group-hover:w-[184px]">
          <ArrowLeft />
        </div>
        <p className="translate-x-2">{label}</p>
      </button>
    </Link>
  );
};

export default GoBackButton;
