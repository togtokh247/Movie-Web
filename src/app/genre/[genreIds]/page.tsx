import { HeaderSection } from "@/app/category/[categoryName]/HeaderSection";
import Link from "next/link";

type Movie = {
  id: number;
  poster_path: string;
  vote_average: number;
  original_title: string;
};

type Genre = {
  id: number;
  name: string;
};

async function getMoviesByGenre(genreId: string): Promise<Movie[]> {
  const res = await fetch(
    `https://api.themoviedb.org/3/discover/movie?with_genres=${genreId}&language=en`,
    {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YmQxNjEyYzZiODAwNTMxMGMwOGM1MGIzODNiNjc3OCIsIm5iZiI6MTc2MzUyNDAxMi45MTUsInN1YiI6IjY5MWQzZGFjYmE4ZDhkMDkyMTJkNDEyOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nM0lxUIqUqdTt_sK2lYs7oKW72mZqapZajrmcRTFVb4`,
      },
    }
  );

  const data = await res.json();
  return data.results || [];
}

async function getAllGenres(): Promise<Genre[]> {
  const res = await fetch(
    "https://api.themoviedb.org/3/genre/movie/list?language=en",
    {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YmQxNjEyYzZiODAwNTMxMGMwOGM1MGIzODNiNjc3OCIsIm5iZiI6MTc2MzUyNDAxMi45MTUsInN1YiI6IjY5MWQzZGFjYmE4ZDhkMDkyMTJkNDEyOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nM0lxUIqUqdTt_sK2lYs7oKW72mZqapZajrmcRTFVb4`,
      },
    }
  );

  const data = await res.json();
  return data.genres || [];
}

export default async function GenrePage({ params }: { params: { genreIds: string } }) {
  const genreId = params.genreIds;

  const movies = await getMoviesByGenre(genreId);
  const genres = await getAllGenres();

  return (
    <div className="container mx-auto px-6 py-10">
      <div><HeaderSection/></div>
      <div className="grid grid-cols-[2fr,1fr] gap-10">
        <div>
          <h1 className="text-3xl font-bold">Search results</h1>

          <p className="text-gray-500 mt-1">
            {movies.length} results found
          </p>

          <div className="mt-6 grid grid-cols-4 gap-6">
            {movies.map((movie) => (
              <Link
                key={movie.id}
                href={`/movie/${movie.id}`}
                className="rounded-xl overflow-hidden shadow hover:shadow-lg transition-all bg-white"
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  className="w-full h-[240px] object-cover"
                />

                <div className="p-2">
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-500">★</span>
                    <span className="font-semibold">{movie.vote_average}</span>
                    <span className="text-gray-500 text-sm">/10</span>
                  </div>

                  <h3 className="font-medium text-sm mt-1">
                    {movie.original_title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold">Search by genre</h2>
          <p className="text-gray-500 text-sm mt-1">
            See lists of movies by genre
          </p>

          <div className="grid grid-cols-2 gap-2 mt-4 w-fit">
            {genres.map((item) => (
              <Link
                key={item.id}
                href={`/genre/${item.id}`}
                className="px-3 py-1.5 rounded-full border text-sm flex items-center gap-1 hover:bg-gray-100 transition"
              >
                {item.name}
                <span>›</span>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
