"use client";

import { Star } from "lucide-react";
import { Card, CardContent } from "../../components/ui/card";
import { WatchTrailer } from "./WatchTrailer";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../components/ui/carousel";
import { useEffect, useState } from "react";

type Movie = {
  id: number;
  title: string;
  overview: string;
  backdrop_path: string;
  vote_average: number;
};

export const HeaderCarusel = () => {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch(
          "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
          {
            headers: {
              Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YmQxNjEyYzZiODAwNTMxMGMwOGM1MGIzODNiNjc3OCIsIm5iZiI6MTc2MzUyNDAxMi45MTUsInN1YiI6IjY5MWQzZGFjYmE4ZDhkMDkyMTJkNDEyOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nM0lxUIqUqdTt_sK2lYs7oKW72mZqapZajrmcRTFVb4`,
              accept: "application/json",
            },
          }
        );

        const data = await res.json();
        setMovies(data.results);
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  }, []);

  return (
    <div className="w-screen relative">
      <Carousel className="w-full h-full">
        <CarouselContent className="-ml-4 h-full">
          {movies.map((item) => (
            <CarouselItem key={item.id} className="pl-4 h-full basis-full">
              <Card className="h-full relative overflow-hidden">
                <CardContent className="p-0 h-full relative">
                  <img
                    src={`https://image.tmdb.org/t/p/original${item.backdrop_path}`}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />

                  <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />

                  <div className="absolute left-10 top-1/2 -translate-y-1/2 w-[404px] text-white space-y-3 pl-10">
                    <h1 className="text-sm opacity-80">Now playing:</h1>
                    <h1 className="text-3xl font-bold">{item.title}</h1>

                    <div className="flex items-center gap-1">
                      <Star className="text-yellow-500 w-4 h-4" />
                      <span className="font-semibold text-sm">
                        {item.vote_average}
                      </span>
                      <span className="text-gray-300 text-sm">/10</span>
                    </div>

                    <p className="text-sm leading-relaxed opacity-90">
                      {item.overview}
                    </p>

                    <WatchTrailer movieId={item.id} />
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow" />
        <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow" />
      </Carousel>
    </div>
  );
};
