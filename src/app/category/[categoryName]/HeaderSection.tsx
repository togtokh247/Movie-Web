import { GenreMenu } from "@/app/_components/GenreMenu";
import { ModeToggle } from "@/app/_components/ModeToggle";
import { Film } from "lucide-react";
import Link from "next/link";
import { SearchSection } from "@/app/_components/Search";

export const HeaderSection = () => {
  return (
    <div className="h-[60px] flex items-center gap-4 p-4 justify-around">
      <div className="text-purple-500 flex gap-2 font-semibold">
        <Link href={"/"} className="flex items-center gap-2">
          <Film className="w-6 h-6" />
          Movie Z
        </Link>
      </div>

      <div className="flex items-center gap-3">
        <GenreMenu />
        <div className="relative">
          <SearchSection />
        </div>
      </div>
      <div className="w-[26px] h-[26px] rounded-[5px] border border-gray-500 flex items-center justify-center">
        <ModeToggle />
      </div>
    </div>
  );
};
