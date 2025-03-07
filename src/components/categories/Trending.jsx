import { useState, useEffect } from "react";

const API_KEY = "9367549a77347a7f8a1302eada1e0563";

const Trending = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [Loading, setLoading] = useState(false);

  const fetchMovies = async () => {
    if (Loading) return;
    setLoading(true);

    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}&page=${page}`
      );
      const data = await res.json();
      console.log(data);
      setMovies((prev) => [...prev, ...data.results]);
      setPage((prev) => prev + 1);
    } catch (e) {
      console.error("Error fetching movies:", e);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  // infinite scrolling Logic

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 50 &&
        !Loading
      ) {
        fetchMovies();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [Loading]);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      {/* Movie Grid */}
      <div className="grid grid-cols-2 md-grid-cols-3 lg:grid-cols-6 gap-6">
        {movies.map((movie, index) => (
          <div
            key={`${movie.id}-${index}`}
            className="bg-gray-800 rounded-lg overflow-hidden shadow-lg"
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-60 object-cover"
            />

            <div className="p-3">
              <h2 className="text-lg font-semibold">{movie.title}</h2>
            </div>
          </div>
        ))}
      </div>
      {Loading && <p className="text-center text-gray-400 mt-4">Loading...</p>}
    </div>
  );
};

export default Trending;
