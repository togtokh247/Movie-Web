"use client";

import Link from "next/link";
import { Movies } from "@/app/_components/MoviesSection";
import { useParams } from "next/navigation";
import { FooterSection } from "./FooterSection";
import { HeaderSection } from "./HeaderSection";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
} from "@/components/ui/pagination";

type Params = { categoryName: string };

export default function CategoryPage() {
  const { categoryName } = useParams<Params>();
  const [movies, setMovies] = useState<Movies[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${categoryName}?language=en-US&page=${currentPage}`,
          {
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YmQxNjEyYzZiODAwNTMxMGMwOGM1MGIzODNiNjc3OCIsIm5iZiI6MTc2MzUyNDAxMi45MTUsInN1YiI6IjY5MWQzZGFjYmE4ZDhkMDkyMTJkNDEyOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nM0lxUIqUqdTt_sK2lYs7oKW72mZqapZajrmcRTFVb4",
              accept: "application/json",
            },
          }
        );
        const data = await res.json();
        setMovies(data.results);
        setTotalPages(data.total_pages);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [categoryName, currentPage]);

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };
  const prevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  return (
    <div className="min-h-screen fle">
      <HeaderSection />
      <div className="h-full flex justify-center">
        <div className="w-[1200px]">
          <div className="grid grid-cols-5 gap-5 ">
            {movies.map((movie) => (
              <Link
                key={movie.id}
                href={`/movie/${movie.id}`}
                className="block w-[230px] h-[439px] rounded-[8px] border bg-card p-2 text-card-foreground shadow-sm transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer"
              >
                <img
                  src={"https://image.tmdb.org/t/p/w500/" + movie.poster_path}
                  className="w-full h-[340px] rounded-[8px] object-cover"
                />
                <div className="flex items-center gap-1 mt-2">
                  <span className="font-semibold flex gap-2">
                    <Star className="text-yellow-500 fill-yellow-400 w-5 h-5" />
                    {movie.vote_average.toFixed(1)}
                  </span>
                  <span className="text-muted-foreground">/10</span>
                </div>
                <h1 className="font-semibold mt-1">
                  {movie.original_title}
                </h1>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="w-screen flex justify-end pt-10 pr-10 gap-2">
        <Pagination className="w-fit m-0">
          <PaginationContent>
            <PaginationItem>
              <Button
                variant="outline"
                onClick={prevPage}
                disabled={currentPage === 1}
              >
                <ChevronLeft /> Prev
              </Button>
            </PaginationItem>

            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>

            <PaginationItem>
              <Button variant="outline" onClick={prevPage}>
                {currentPage - 1}
              </Button>
            </PaginationItem>

            <PaginationItem>
              <Button variant="default">{currentPage}</Button>
            </PaginationItem>

            <PaginationItem>
              <Button variant="outline" onClick={nextPage}>
                {currentPage + 1}
              </Button>
            </PaginationItem>

            <PaginationItem>
              <Button
                variant="outline"
                onClick={nextPage}
                disabled={currentPage === totalPages}
              >
                <ChevronRight /> Next
              </Button>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>

      <FooterSection />
    </div>
  );
}
