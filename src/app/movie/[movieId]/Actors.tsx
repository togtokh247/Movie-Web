"use client";

import { useEffect, useState } from "react";

export type Actor = {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
  cast_id?: number;
  character?: string;
  credit_id: string;
  order?: number;
};

export type Crew = {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  department: string;
  job: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
  credit_id: string;
};

export type GuestStar = {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
  character: string;
  credit_id: string;
  order: number;
};

export type CreditsResponse = {
  id: number;
  cast: Actor[];
  crew: Crew[];
  guest_stars?: GuestStar[];
  release_date: string;
  genre_ids: number[];
};

export const Actors = ({ movieId }: { movieId: number }) => {
  const [cast, setCast] = useState<Actor[]>([]);
  const [crew, setCrew] = useState<Crew[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!movieId) return;

    const fetchCredits = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`,
          {
            headers: {
              Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YmQxNjEyYzZiODAwNTMxMGMwOGM1MGIzODNiNjc3OCIsIm5iZiI6MTc2MzUyNDAxMi45MTUsInN1YiI6IjY5MWQzZGFjYmE4ZDhkMDkyMTJkNDEyOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nM0lxUIqUqdTt_sK2lYs7oKW72mZqapZajrmcRTFVb4`,
              accept: "application/json",
            },
          }
        );

        const data: CreditsResponse = await res.json();
        setCast(data.cast || []);
        setCrew(data.crew || []);
      } catch (err) {
        console.error("Error fetching credits:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCredits();
  }, [movieId]);

  if (loading) return <p>Loading ...</p>;

  const directors = crew.filter((member) => member.job === "Director");
  const writers = crew.filter((member) => member.job === "Writer");

  return (
    <div className="pl-40 mt-10">
      <div className="mb-8">
        <h2 className="text-xl font-semibold flex">Director</h2>
        {directors.map((d) => (
          <p key={d.id}>{d.name}</p>
        ))}

        <h2 className="text-xl font-semibold mt-4 flex">Writer</h2>
        {writers.map((w) => (
          <p key={w.id}>{w.name}</p>
        ))}
      </div>

      <h2 className="text-xl font-semibold mb-4">Top Cast</h2>
      <div className="flex gap-6">
        {cast.slice(0, 5).map((actor) => (
          <div key={actor.id} className="flex gap-3 items-center">
            <img
              src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
              className="w-14 h-14 rounded-full object-cover"
              alt={actor.name}
            />

            <div>
              <p className="font-semibold">{actor.name}</p>
              <p className="text-gray-500 text-sm">{actor.character}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
