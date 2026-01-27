import { Film, Mail, Moon } from "lucide-react";
import { GenreMenu } from "./GenreMenu";
import { Input } from "../../components/ui/input";
import { HeaderCarusel } from "./HeaderCarusel";
import { MoviesSection } from "./MoviesSection";
import { ModeToggle } from "./ModeToggle";
import { SearchSection } from "./Search";

export const Movie = () => {
  return (
    <div className=" min-h-screen">
      <div className="h-[60px] flex items-center p-4 justify-between">
        <div className="text-purple-500 flex gap-2 font-semibold">
          <Film className="w-6 h-6" />
          Movie Z
        </div>

        <div className="flex items-center gap-4">
          <GenreMenu />

          <div className="relative">
            <SearchSection />
          </div>
        </div>

        <div className="w-[30px] h-[30px] rounded-[6px] border border-gray-400 flex items-center justify-center">
          <ModeToggle />
        </div>
      </div>

      <div className="w-screen">
        <HeaderCarusel />
      </div>

      <MoviesSection category="upcoming" title="Upcoming" />
      <MoviesSection category="popular" title="Popular" />
      <MoviesSection category="top_rated" title="Top Rated" />

      <div className="w-screen h-[380px] bg-indigo-700 mt-20 flex items-center">
        <div className="w-full max-w-6xl mx-auto h-[200px] flex justify-between items-start">
          <div>
            <div className="text-white flex items-center gap-2 font-semibold">
              <Film className="w-6 h-6" />
              Movie Z
            </div>
            <p className="text-white text-sm mt-2">
              © 2024 Movie Z. All Rights Reserved.
            </p>
          </div>

          <div className="text-white space-y-2">
            <p className="font-semibold">Contact Information</p>

            <div className="flex items-center gap-2">
              <Mail />
              <h1>Email:</h1>
              <p>support@movieZ.com</p>
            </div>

            <div>
              <p>Follow us:</p>
              <p>Facebook · Instagram · Twitter · Youtube</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
