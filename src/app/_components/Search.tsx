"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { useState, useEffect, ChangeEvent } from "react";
import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";

type Movie = {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
};

type Response = {
  results: Movie[];
};

export const SearchSection = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [open, setOpen] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  useEffect(() => {
    if (!query.trim()) {
      setMovies([]);
      return;
    }

    const fetchMovies = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/search/movie?query=${query}&language=en-US&page=1`,
          {
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YmQxNjEyYzZiODAwNTMxMGMwOGM1MGIzODNiNjc3OCIsIm5iZiI6MTc2MzUyNDAxMi45MTUsInN1YiI6IjY5MWQzZGFjYmE4ZDhkMDkyMTJkNDEyOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nM0lxUIqUqdTt_sK2lYs7oKW72mZqapZajrmcRTFVb4",
              accept: "application/json",
            },
          }
        );

        const data: Response = await res.json();
        setMovies(data.results || []);
      } catch (error) {
        console.log(error);
      }
    };

    fetchMovies();
  }, [query]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button className="w-80">
          <Input
            placeholder="Search movie..."
            value={query}
            readOnly
            onClick={() => setOpen(true)}
            className="cursor-pointer"
          />
        </button>
      </PopoverTrigger>

      <PopoverContent className="w-80 p-4 space-y-2">
        <Input
          placeholder="Search movie..."
          value={query}
          onChange={handleChange}
          autoFocus
        />

        <div className="max-h-60 overflow-y-auto space-y-2 mt-2">
          {movies.length > 0 ? (
            movies.map((item) => (
              <Link
                key={item.id}
                href={`/movie/${item.id}`}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-accent transition"
              >
                <img
                  src={`https://image.tmdb.org/t/p/w92${item.poster_path}`}
                  className="w-10 h-14 rounded object-cover"
                />

                <div className="flex-1">
                  <p className="font-medium">{item.title}</p>

                  <div className="flex items-center gap-1 text-sm">
                    <Star className="text-yellow-500 w-4 h-4" />
                    {item.vote_average}
                    <span className="text-gray-400">/10</span>
                  </div>
                </div>
                <ArrowRight className="opacity-70" />
              </Link>
            ))
          ) : (
            query && (
              <p className="text-sm text-muted-foreground">No results</p>
            )
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};
