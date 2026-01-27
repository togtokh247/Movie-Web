

async function getMoviesByGenre(genreId: string) {
  const res = await fetch(
    `https://api.themoviedb.org/3/discover/movie?with_genres=${genreId}&language=en`,
    {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YmQxNjEyYzZiODAwNTMxMGMwOGM1MGIzODNiNjc3OCIsIm5iZiI6MTc2MzUyNDAxMi45MTUsInN1YiI6IjY5MWQzZGFjYmE4ZDhkMDkyMTJkNDEyOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nM0lxUIqUqdTt_sK2lYs7oKW72mZqapZajrmcRTFVb4`,
      },
    }
  );
  return res.json();
}

async function getGenres() {
  const res = await fetch(
    "https://api.themoviedb.org/3/genre/movie/list?language=en",
    {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YmQxNjEyYzZiODAwNTMxMGMwOGM1MGIzODNiNjc3OCIsIm5iZiI6MTc2MzUyNDAxMi45MTUsInN1YiI6IjY5MWQzZGFjYmE4ZDhkMDkyMTJkNDEyOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nM0lxUIqUqdTt_sK2lYs7oKW72mZqapZajrmcRTFVb4`,
      },
    }
  );
  return res.json();
}

export default async function GenrePage({ params }: { params: { id: string } }) {
  const { id } = params;

  const moviesData = await getMoviesByGenre(id);
  const genresData = await getGenres();

  const movies = moviesData.results || [];
  const genres = genresData.genres || [];

  const currentGenre = genres.find((g: any) => g.id.toString() === id)?.name;

  return (
    <div className="px-10 py-10 flex gap-10">
      <div className="flex-1">
        <h2 className="text-2xl font-bold mb-3">Genre: {currentGenre}</h2>
        <p className="text-gray-500 mb-8">{movies.length} results</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {movies.map((movie: any) => (
            <div
              key={movie.id}
              className="rounded-lg shadow overflow-hidden hover:scale-[1.02] transition cursor-pointer"
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-full"
              />

              <div className="p-3">
                <p className="font-medium">{movie.title}</p>
                <p className="text-sm text-gray-500">{movie.vote_average}/10</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <aside className="w-72">
        <h3 className="font-semibold text-lg mb-4">Browse by genre</h3>

        <div className="flex flex-wrap gap-2">
          {genres.map((genre: any) => (
            <a
              key={genre.id}
              href={`/genre/${genre.id}`}
              className={`px-3 py-1 border rounded-full text-sm hover:bg-gray-100 ${
                genre.id.toString() === id ? "bg-black text-white" : ""
              }`}
            >
              {genre.name}
            </a>
          ))}
        </div>
      </aside>
    </div>
  );
}
