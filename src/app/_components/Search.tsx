"use client";

import {
  Popover,
  PopoverAnchor,
  PopoverContent,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { useState, useEffect, ChangeEvent } from "react";
import Link from "next/link";
import { ArrowRight, Search, Star } from "lucide-react";

type Movie = {
  id: number;
  title: string;
  poster_path: string | null;
  vote_average: number;
};

type Response = {
  results: Movie[];
};

export const SearchSection = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setQuery(value);
    setOpen(Boolean(value.trim()));
  };

  useEffect(() => {
    const trimmedQuery = query.trim();

    if (!trimmedQuery) {
      setMovies([]);
      setLoading(false);
      return;
    }

    const controller = new AbortController();

    const fetchMovies = async () => {
      setLoading(true);

      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
            trimmedQuery
          )}&language=en-US&page=1`,
          {
            signal: controller.signal,
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YmQxNjEyYzZiODAwNTMxMGMwOGM1MGIzODNiNjc3OCIsIm5iZiI6MTc2MzUyNDAxMi45MTUsInN1YiI6IjY5MWQzZGFjYmE4ZDhkMDkyMTJkNDEyOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nM0lxUIqUqdTt_sK2lYs7oKW72mZqapZajrmcRTFVb4",
              accept: "application/json",
            },
          }
        );

        if (!res.ok) {
          setMovies([]);
          return;
        }

        const data: Response = await res.json();
        setMovies(data.results || []);
      } catch (error) {
        if ((error as Error).name === "AbortError") return;

        console.log(error);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    };

    fetchMovies();

    return () => controller.abort();
  }, [query]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverAnchor asChild>
        <div className="relative w-[220px] md:w-80">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search movie..."
            value={query}
            onChange={handleChange}
            onFocus={() => setOpen(Boolean(query.trim()))}
            className="h-10 rounded-[8px] pl-10"
          />
        </div>
      </PopoverAnchor>

      <PopoverContent
        align="start"
        className="w-[220px] md:w-80 rounded-[8px] p-2"
        onOpenAutoFocus={(event) => event.preventDefault()}
      >
        <div className="max-h-80 overflow-y-auto space-y-1">
          {loading ? (
            <p className="px-2 py-3 text-sm text-muted-foreground">
              Searching...
            </p>
          ) : movies.length > 0 ? (
            movies.map((item) => (
              <Link
                key={item.id}
                href={`/movie/${item.id}`}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 rounded-[8px] p-2 transition hover:bg-accent"
              >
                {item.poster_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w92${item.poster_path}`}
                    alt={item.title}
                    className="h-14 w-10 rounded-[6px] object-cover"
                  />
                ) : (
                  <div className="flex h-14 w-10 items-center justify-center rounded-[6px] bg-muted text-[10px] text-muted-foreground">
                    No poster
                  </div>
                )}

                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium">{item.title}</p>

                  <div className="flex items-center gap-1 text-sm">
                    <Star className="text-yellow-500 w-4 h-4" />
                    {item.vote_average.toFixed(1)}
                    <span className="text-gray-400">/10</span>
                  </div>
                </div>
                <ArrowRight className="opacity-70" />
              </Link>
            ))
          ) : (
            query && (
              <p className="px-2 py-3 text-sm text-muted-foreground">
                No results
              </p>
            )
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};
