"use client";

import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import { useEffect, useState } from "react";

export type Movies = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

type Response = {
  page: number;
  results: Movies[];
  total_pages: number;
  total_results: number;
};

type MoviesSectionProps = {
  category: string;
  title: string;
};

export const MoviesSection = ({ category, title }: MoviesSectionProps) => {
  const [movies, setMovies] = useState<Movies[]>([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`,
          {
            headers: {
              Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YmQxNjEyYzZiODAwNTMxMGMwOGM1MGIzODNiNjc3OCIsIm5iZiI6MTc2MzUyNDAxMi45MTUsInN1YiI6IjY5MWQzZGFjYmE4ZDhkMDkyMTJkNDEyOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nM0lxUIqUqdTt_sK2lYs7oKW72mZqapZajrmcRTFVb4`,
              accept: "application/json",
            },
          }
        );

        const data = (await res.json()) as Response;
        setMovies(data.results);
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  }, [category]);

  return (
    <div className="w-full flex justify-center mt-6">
      <div className="w-[1200px]">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-semibold">{title}</h1>
          <Link
            href={`/category/${category}`}
            className="flex items-center gap-1"
          >
            <p className="cursor-pointer">See more</p>
            <ArrowRight />
          </Link>
        </div>

        <div className="grid grid-cols-5 gap-5">
          {movies?.slice(0, 10).map((movie) => (
            <Link
              key={movie.id}
              href={`/movie/${movie.id}`}
              className="block w-[230px] h-[439px] rounded-[8px] border bg-card p-2 text-card-foreground shadow-sm
                 transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer"
            >
              <img
                src={"https://image.tmdb.org/t/p/w500/" + movie.poster_path}
                className="w-full h-[340px] rounded-[8px] object-cover"
              />

              <div className="flex items-center gap-1 mt-2">
                <span className="font-semibold flex gap-2">
                  <Star className="text-yellow-500 fill-yellow-400 w-5 h-5" />
                  {movie.vote_average.toFixed(1)}
                </span>
                <span className="text-muted-foreground">/10</span>
              </div>

              <h1 className="font-semibold mt-1">
                {movie.original_title}
              </h1>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
