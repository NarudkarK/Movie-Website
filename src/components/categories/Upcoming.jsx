import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const API_KEY = "9367549a77347a7f8a1302eada1e0563";

const Upcoming = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchMovies = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&page=${page}`
      );
      const data = await res.json();
      setMovies((prev) => [...prev, ...data.results]);
      setPage((prev) => prev + 1);
    } catch (e) {
      console.error("Error fetching upcoming movies:", e);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 50 &&
        !loading
      ) {
        fetchMovies();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading]);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-2xl font-bold mb-6">Upcoming Movies</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="cursor-pointer bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105"
            onClick={() => navigate(`/movie/${movie.id}`)} // Navigate to MoviePageDetails
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-72 object-cover rounded-md"
            />
            <div className="p-3">
              <h2 className="text-lg font-semibold">{movie.title}</h2>
            </div>
          </div>
        ))}
      </div>

      {/* Loading Indicator */}
      {loading && <p className="text-center text-gray-400 mt-4">Loading...</p>}
    </div>
  );
};

export default Upcoming;
