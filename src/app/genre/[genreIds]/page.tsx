import { HeaderSection } from "@/app/category/[categoryName]/HeaderSection";
import { FooterSection } from "@/app/category/[categoryName]/FooterSection";
import { Check, ChevronRight, Plus, Star } from "lucide-react";
import Link from "next/link";

type Movie = {
  id: number;
  poster_path: string | null;
  vote_average: number;
  original_title: string;
  title: string;
  release_date?: string;
};

type Genre = {
  id: number;
  name: string;
};

function safelyDecodeGenreIds(genreIds: string) {
  try {
    return decodeURIComponent(genreIds);
  } catch {
    return genreIds;
  }
}

function getSelectedGenreIds(genreIds: string) {
  const decodedGenreIds = safelyDecodeGenreIds(genreIds);

  return Array.from(
    new Set(
      decodedGenreIds
        .split(",")
        .map((id) => id.trim())
        .filter((id) => /^\d+$/.test(id))
    )
  );
}

function getGenreToggleHref(selectedGenreIds: string[], genreId: number) {
  const id = String(genreId);
  const isSelected = selectedGenreIds.includes(id);
  const nextGenreIds = isSelected
    ? selectedGenreIds.filter((selectedId) => selectedId !== id)
    : [...selectedGenreIds, id];

  if (nextGenreIds.length === 0) return "/";

  return {
    pathname: `/genre/${nextGenreIds.join(",")}`,
  };
}

async function getMoviesByGenre(genreIds: string[]): Promise<Movie[]> {
  if (genreIds.length === 0) return [];

  try {
    const searchParams = new URLSearchParams({
      with_genres: genreIds.join(","),
      language: "en",
    });
    const res = await fetch(
      `https://api.themoviedb.org/3/discover/movie?${searchParams.toString()}`,
      {
        cache: "no-store",
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

async function getAllGenres(): Promise<Genre[]> {
  try {
    const res = await fetch(
      "https://api.themoviedb.org/3/genre/movie/list?language=en",
      {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YmQxNjEyYzZiODAwNTMxMGMwOGM1MGIzODNiNjc3OCIsIm5iZiI6MTc2MzUyNDAxMi45MTUsInN1YiI6IjY5MWQzZGFjYmE4ZDhkMDkyMTJkNDEyOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nM0lxUIqUqdTt_sK2lYs7oKW72mZqapZajrmcRTFVb4`,
          accept: "application/json",
        },
      }
    );

    if (!res.ok) return [];

    const data = (await res.json()) as { genres?: Genre[] };
    return Array.isArray(data.genres) ? data.genres : [];
  } catch (error) {
    console.error(error);
    return [];
  }
}

export default async function GenrePage({
  params,
}: {
  params: Promise<{ genreIds: string }>;
}) {
  const { genreIds } = await params;
  const selectedGenreIds = getSelectedGenreIds(genreIds);

  const [movies, genres] = await Promise.all([
    getMoviesByGenre(selectedGenreIds),
    getAllGenres(),
  ]);

  const selectedGenres = genres.filter((genre) =>
    selectedGenreIds.includes(String(genre.id))
  );
  const selectedGenreNames = selectedGenres.map((genre) => genre.name);
  const genreTitle =
    selectedGenreNames.length > 0
      ? selectedGenreNames.join(" + ")
      : "Selected genres";

  return (
    <div className="min-h-screen bg-background">
      <HeaderSection />

      <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <section className="border-b pb-8">
          <p className="text-sm font-medium uppercase text-muted-foreground">
            Browse movies by genre
          </p>
          <div className="mt-3 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                {genreTitle} movies
              </h1>
              <p className="mt-2 text-muted-foreground">
                {movies.length} {movies.length === 1 ? "movie" : "movies"}{" "}
                found for {selectedGenreIds.length} selected{" "}
                {selectedGenreIds.length === 1 ? "genre" : "genres"}
              </p>
            </div>

            <Link
              href="/"
              className="inline-flex h-10 w-fit items-center gap-2 rounded-[8px] border px-4 text-sm font-medium transition hover:bg-accent"
            >
              Back to home
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_300px]">
          <section>
            {movies.length > 0 ? (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4">
                {movies.map((movie) => (
                  <Link
                    key={movie.id}
                    href={`/movie/${movie.id}`}
                    className="group overflow-hidden rounded-[8px] border bg-card shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                  >
                    <div className="aspect-[2/3] overflow-hidden bg-muted">
                      {movie.poster_path ? (
                        <img
                          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                          alt={movie.title || movie.original_title}
                          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center px-4 text-center text-sm text-muted-foreground">
                          No poster available
                        </div>
                      )}
                    </div>

                    <div className="space-y-2 p-3">
                      <div className="flex items-center gap-1 text-sm">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-500" />
                        <span className="font-semibold">
                          {movie.vote_average.toFixed(1)}
                        </span>
                        <span className="text-muted-foreground">/10</span>
                      </div>

                      <h2 className="line-clamp-2 min-h-10 text-sm font-semibold">
                        {movie.title || movie.original_title}
                      </h2>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="rounded-[8px] border border-dashed p-10 text-center">
                <h2 className="text-lg font-semibold">No movies found</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Try another genre from the list.
                </p>
              </div>
            )}
          </section>

          <aside className="self-start border-t pt-6 lg:sticky lg:top-24 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
            <h2 className="text-lg font-semibold">Search by genre</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Pick more than one genre to narrow the list. Tap a selected genre
              to remove it.
            </p>

            {selectedGenreNames.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {selectedGenreNames.map((name) => (
                  <span
                    key={name}
                    className="rounded-[8px] bg-muted px-2.5 py-1 text-xs font-medium"
                  >
                    {name}
                  </span>
                ))}
              </div>
            )}

            <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-1">
              {genres.map((item) => {
                const isActive = selectedGenreIds.includes(String(item.id));

                return (
                  <Link
                    key={item.id}
                    href={getGenreToggleHref(selectedGenreIds, item.id)}
                    className={`flex items-center justify-between rounded-[8px] border px-3 py-2 text-sm font-medium transition ${
                      isActive
                        ? "border-foreground bg-foreground text-background"
                        : "bg-background hover:border-foreground/40 hover:bg-accent"
                    }`}
                  >
                    {item.name}
                    {isActive ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Plus className="h-4 w-4" />
                    )}
                  </Link>
                );
              })}
            </div>
          </aside>
        </div>
      </main>

      <FooterSection />
    </div>
  );
}
