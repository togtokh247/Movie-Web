"use client";

import { GenreMenu } from "@/app/_components/GenreMenu";
import { Input } from "@/components/ui/input";
import { Film, Mail, Search } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Actors } from "./Actors";
import { Trailer } from "./Trailer";
import { LifeLine } from "react-loading-indicators";
import { Vote } from "./Vote";
import { ModeToggle } from "@/app/_components/ModeToggle"; 
type Params = {
  movieId: string;
};

const MovieDetailPage = () => {
  const { movieId } = useParams<Params>();
  const [movie, setMovie] = useState<any>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
          {
            headers: {
              Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YmQxNjEyYzZiODAwNTMxMGMwOGM1MGIzODNiNjc3OCIsIm5iZiI6MTc2MzUyNDAxMi45MTUsInN1YiI6IjY5MWQzZGFjYmE4ZDhkMDkyMTJkNDEyOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nM0lxUIqUqdTt_sK2lYs7oKW72mZqapZajrmcRTFVb4`,
              accept: "application/json",
            },
          }
        );

        const data = await res.json();
        setMovie(data);
      } catch (error) {
        console.error(error);
      }
    };

    getData();
  }, [movieId]);

  if (!movie)
    return (
      <div>
        <LifeLine color="#cc31af" size="medium" text="" textColor="" />
      </div>
    );

  return (
    <div className="min-h-screen">
      <div className="h-[60px] flex items-center gap-4 p-4 justify-around">
        <div className="text-purple-500 flex gap-2 font-semibold">
          <Link href="/" className="flex items-center gap-2">
            <Film className="w-6 h-6" />
            Movie Z
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <GenreMenu />
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <Input
              type="text"
              placeholder="Search..."
              className="pl-10 w-[200px]"
            />
          </div>
        </div>

        <ModeToggle />
      </div>
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold pl-40.5">{movie.title}</h1>
        <div className="pr-41">
          <Vote vote_average={movie.vote_average} vote_count={0} />
        </div>
      </div>
      <div className="max-w-6xl mx-auto mt-10 flex gap-10">
        <img
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          className="w-[300px] rounded-xl"
        />

        <Trailer movieId={Number(movieId)} />
      </div>
      <div className="pl-40.5 w-[1080px]">
        <p className="text-gray-600 mt-4">{movie.overview}</p>
      </div>
      <Actors movieId={Number(movieId)} />

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

export default MovieDetailPage;
