
import { Movie } from "./_components/Movie";

export default function Home() {
  const categories = [
    {
      categoryName: "upcoming",
      title: "Upcoming",
      showButton: true,
    },
    { category: "top_rated", title: "Top Rated", showButton: true },
    { category: "popular", title: "Popular", showButton: true },
  ];

  return <Movie />;
}
