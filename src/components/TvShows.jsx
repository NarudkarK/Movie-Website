import "./TvShows.css";
import React, { useState } from "react";
import { useEffect } from "react";

const TvShows = () => {
  const [tvShow, settvShow] = useState([]);

  const fetchTvShows = () => {
    fetch(
      "https://api.themoviedb.org/3/discover/tv?api_key=9367549a77347a7f8a1302eada1e0563"
    )
      .then((res) => res.json())
      .then((res) => settvShow(res.results));
  };

  useEffect(() => {
    fetchTvShows();
  }, []);

  return (
    <div className="h-full grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 p-4 bg-gray-900 text-white">
      {tvShow.map((show) => (
        <div
          key={show.id}
          className="h-full flex flex-col items-center justify-center bg-gray-800 rounded-lg p-4 text-white"
        >
          <img
            src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
            alt="show poster"
          />
          <h3>{show.name}</h3>
        </div>
      ))}
    </div>
  );
};

export default TvShows;
