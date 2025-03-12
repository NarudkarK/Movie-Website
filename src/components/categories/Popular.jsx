import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";

const API_KEY = "9367549a77347a7f8a1302eada1e0563";

const Popular = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const observer = useRef();
  const navigate = useNavigate();

  const fetchMovies = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&page=${page}`
      );
      const data = await res.json();
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
              key={movie.id} // Ensure unique key
              ref={isLastMovie ? lastMovieRef : null}
              className="cursor-pointer bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105"
              onClick={() => navigate(`/movie/${movie.id}`)} // Navigate to MoviePageDetails
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-96 object-cover p-2 rounded-md"
              />
              <div className="p-3">
                <h2 className="text-lg font-semibold">{movie.title}</h2>
                <p className="text-sm text-gray-300">
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
