import Link from "next/link";
import Image from "next/image";
import { getMoviesByGenre } from "@/lib/tmdb";

interface Movie {
  id: number;
  poster_path: string | null;
  vote_average: number;
  original_title: string;
}

interface MovieListProps {
  genreId: string;
}

export const MovieList = async ({ genreId }: MovieListProps) => {
  const movies: Movie[] = await getMoviesByGenre(genreId);

  return (
    <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
      {movies.map((movie) => (
        <Link
          key={movie.id}
          href={`/movie/${movie.id}`}
          className="group rounded-xl overflow-hidden bg-white shadow hover:shadow-lg transition"
        >
          <div className="relative w-full h-[240px]">
            <Image
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                  : "/placeholder.png"
              }
              alt={movie.original_title}
              fill
              className="object-cover group-hover:scale-105 transition-transform"
            />
          </div>

          <div className="p-3">
            <div className="flex items-center gap-1 text-sm">
              <span className="text-yellow-500">★</span>
              <span className="font-semibold">
                {movie.vote_average.toFixed(1)}
              </span>
              <span className="text-gray-500">/10</span>
            </div>

            <h3 className="mt-1 text-sm font-medium line-clamp-2">
              {movie.original_title}
            </h3>
          </div>
        </Link>
      ))}
    </div>
  );
};
