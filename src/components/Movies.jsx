import "./Movies.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_KEY = "9367549a77347a7f8a1302eada1e0563";

const Movies = () => {
  const [movieList, setMovieList] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const getMovies = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&page=${page}`
      );
      const data = await res.json();
      setMovieList((prev) => [...prev, ...data.results]);
      setPage((prev) => prev + 1);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getMovies();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 50 &&
        !loading
      ) {
        getMovies();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading]);

  return (
    <div className="h-full grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 p-4 bg-gray-900 text-white">
      {movieList.map((movie) => (
        <div
          key={movie.id}
          onClick={() => navigate(`/movie/${movie.id}`)}
          className="cursor-pointer h-full flex flex-col items-center justify-center bg-gray-800 rounded-lg p-4 text-white border-2 hover:border-cyan-700 transition-transform transform hover:scale-105"
        >
          <img
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : "https://via.placeholder.com/300x450?text=No+Image"
            }
            alt={movie.title}
            className="w-full h-60 object-cover rounded-md"
          />
          <h3 className="mt-2 text-center text-lg font-semibold">
            {movie.title}
          </h3>
          <p className="text-gray-300 text-sm">
            ⭐ {movie.vote_average || "N/A"}
          </p>
        </div>
      ))}
      {loading && (
        <p className="text-center text-gray-400 mt-4 col-span-full">
          Loading...
        </p>
      )}
    </div>
  );
};

export default Movies;
