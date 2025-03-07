import { useState, useEffect, useRef, useCallback } from "react";

const API_KEY = "9367549a77347a7f8a1302eada1e0563";

const Popular = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const observer = useRef();

  const fetchMovies = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&page=${page}`
      );
      const data = await res.json();
      console.log(data);
      setMovies((prev) => [...prev, ...data.results]); // Append new movies
      setPage((prevPage) => prevPage + 1); // Increment page number
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  // Infinite scrolling logic
  const lastMovieRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          fetchMovies();
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading]
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      {/* Movie Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {movies.map((movie, index) => {
          const isLastMovie = index === movies.length - 1;
          return (
            <div
              key={`${movie.id}-${index}`} // Ensures uniqueness
              ref={isLastMovie ? lastMovieRef : null}
              className="bg-gray-800 rounded-lg overflow-hidden shadow-lg"
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-100 object-cover p-2"
              />
              <div className="p-3 flex flex-col gap-2">
                <h2 className="text-lg font-semibold">{movie.title}</h2>
                <p className="text-sm">
                  <strong>⭐ Rating:</strong> {movie.vote_average || "N/A"}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Loading Indicator */}
      {loading && <p className="text-center text-gray-400 mt-4">Loading...</p>}
    </div>
  );
};

export default Popular;
