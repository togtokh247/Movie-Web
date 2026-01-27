"use client";

import { useEffect, useState } from "react";
import ReactPlayer from "react-player";

export const Trailer = ({ movieId }: { movieId: number }) => {
  const [videos, setVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!movieId) return;

    const fetchVideos = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
          {
            headers: {
              Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YmQxNjEyYzZiODAwNTMxMGMwOGM1MGIzODNiNjc3OCIsIm5iZiI6MTc2MzUyNDAxMi45MTUsInN1YiI6IjY5MWQzZGFjYmE4ZDhkMDkyMTJkNDEyOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nM0lxUIqUqdTt_sK2lYs7oKW72mZqapZajrmcRTFVb4`,
              accept: "application/json",
            },
          }
        );

        const data = await res.json();
        setVideos(data.results || []);
      } catch (err) {
        console.error("Error fetching videos:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [movieId]);

  if (loading) return <p>Loading trailer...</p>;

  const trailer = videos.find((v) => v.type === "Trailer");

  if (!trailer) return <p>No trailer found</p>;

  return (
    <div className="rounded-xl overflow-hidden w-[900px] h-[500px] ">
      <ReactPlayer
        src={`https://www.youtube.com/watch?v=${trailer.key}`}
        controls
        width="100%"
        height="500px"
      />
    </div>
  );
};
