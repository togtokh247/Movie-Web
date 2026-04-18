import Link from "next/link";

interface Movie {
  id: number;
  poster_path: string | null;
  vote_average: number;
  original_title: string;
}

interface MovieListProps {
  genreId: string;
}

async function getMoviesByGenre(genreId: string): Promise<Movie[]> {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/discover/movie?with_genres=${genreId}&language=en`,
      {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YmQxNjEyYzZiODAwNTMxMGMwOGM1MGIzODNiNjc3OCIsIm5iZiI6MTc2MzUyNDAxMi45MTUsInN1YiI6IjY5MWQzZGFjYmE4ZDhkMDkyMTJkNDEyOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nM0lxUIqUqdTt_sK2lYs7oKW72mZqapZajrmcRTFVb4`,
          accept: "application/json",
        },
      }
    );

    if (!res.ok) return [];

    const data = (await res.json()) as { results?: Movie[] };
    return Array.isArray(data.results) ? data.results : [];
  } catch (error) {
    console.error(error);
    return [];
  }
}

export const MovieList = async ({ genreId }: MovieListProps) => {
  const movies: Movie[] = await getMoviesByGenre(genreId);

  return (
    <div className="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
      {movies.map((movie) => (
        <Link
          key={movie.id}
          href={`/movie/${movie.id}`}
          className="group overflow-hidden rounded-[8px] border bg-card shadow-sm transition hover:shadow-lg"
        >
          <div className="aspect-[2/3] overflow-hidden bg-muted">
            {movie.poster_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.original_title}
                className="h-full w-full object-cover transition-transform group-hover:scale-105"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center px-4 text-center text-sm text-muted-foreground">
                No poster available
              </div>
            )}
          </div>

          <div className="p-3">
            <div className="flex items-center gap-1 text-sm">
              <span className="text-yellow-500">★</span>
              <span className="font-semibold">
                {movie.vote_average.toFixed(1)}
              </span>
              <span className="text-muted-foreground">/10</span>
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
