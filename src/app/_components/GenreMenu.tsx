"use client";

import { useEffect, useState } from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

export type Genre = {
  id: number;
  name: string;
};

export const GenreMenu = () => {
  const [genres, setGenres] = useState<Genre[]>([]);

  useEffect(() => {
    const getGenres = async () => {
      const res = await fetch(
        "https://api.themoviedb.org/3/genre/movie/list?language=en",
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YmQxNjEyYzZiODAwNTMxMGMwOGM1MGIzODNiNjc3OCIsIm5iZiI6MTc2MzUyNDAxMi45MTUsInN1YiI6IjY5MWQzZGFjYmE4ZDhkMDkyMTJkNDEyOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nM0lxUIqUqdTt_sK2lYs7oKW72mZqapZajrmcRTFVb4`,
          },
        }
      );

      const data = await res.json();
      setGenres(data.genres);
    };

    getGenres();
  }, []);

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="px-3 py-2 text-sm">
            Genre
          </NavigationMenuTrigger>

          <NavigationMenuContent className="p-6 w-[750px] rounded-xl bg-white dark:bg-slate-900 shadow-xl border">
            <div className="space-y-3">
              <h2 className="text-2xl font-bold">Genres</h2>
              <p className="text-sm text-muted-foreground">
                See lists of movies by genre
              </p>

              <div className="grid grid-cols-4 gap-2 mt-4 w-[557px] h-[333px] overflow-auto ">
                {genres.map((item) => (
                  <NavigationMenuLink
                    key={item.id}
                    href={`/genre/${item.name.toLowerCase()}`}
                    className="rounded-full border text-sm flex w-fit h-fit"
                  >
                    <div className="flex gap-2 justify-center items-center w-fit h-fit">
                      {item.name}
                      <span>›</span>
                    </div>
                  </NavigationMenuLink>
                ))}
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};
