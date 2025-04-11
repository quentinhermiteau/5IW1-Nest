"use client";

import { useEffect, useState } from "react";

import api from "@/lib/api";
import { Movie } from "@/types/movies";
import Image from "next/image";

export default function Movies() {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    api.get("/movies").then((response) => setMovies(response.data));
  }, []);

  return (
    <div>
      <h1>Liste des films</h1>
      <div className="grid grid-cols-6 gap-4 mt-8">
        {movies.map((movie) => (
          <div
            className="w-full h-76 relative rounded-xl cursor-pointer overflow-hidden  hover:shadow-2xl transition-all duration-300"
            key={movie.id}
          >
            <Image
              src={`/api/media/${movie.image}`}
              alt="image"
              fill
              className="object-cover"
            />
            <div className="flex flex-col justify-end w-full h-full bg-linear-to-b from-gray-200/5 to-gray-800/90 p-4 text-white space-y-2">
              <p className="font-bold">{movie.title}</p>
              <p>{movie.description}</p>
              <div className="flex justify-between">
                <p>
                  {new Date(movie.releaseDate).toLocaleDateString("fr", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                <p>Note: {movie.grade}/100</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
