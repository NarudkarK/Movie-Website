import "./Movies.css";

import React, { useEffect, useState } from "react";

const Movies = () => {
  const [movieList, setMovie] = useState([]);

  const getMovies = () => {
    fetch(
      "https://api.themoviedb.org/3/discover/movie?api_key=9367549a77347a7f8a1302eada1e0563"
    )
      .then((res) => res.json())
      .then((res) => setMovie(res.results));
  };

  useEffect(() => getMovies(), []);

  return (
    <div className="h-full grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 p-4 bg-gray-900 text-white ">
      {movieList.map((movie) => (
        <div
          key={movie.id}
          className="h-full flex flex-col items-center justify-center bg-gray-800 rounded-lg p-4 text-white border-2 hover:border-cyan-700"
        >
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt=""
          />
          <h3>{movie.title}</h3>
        </div>
      ))}
    </div>
  );
};

export default Movies;
