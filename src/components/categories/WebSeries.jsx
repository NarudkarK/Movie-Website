import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_KEY = "9367549a77347a7f8a1302eada1e0563";

const WebSeries = () => {
  const [series, setSeries] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchSeries = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&page=${page}`
      );
      const data = await res.json();
      setSeries((prev) => [...prev, ...data.results]);
      setPage((prev) => prev + 1);
    } catch (e) {
      console.error("Error fetching web series:", e);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchSeries();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 50 &&
        !loading
      ) {
        fetchSeries();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading]);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-2xl font-bold mb-6">Web Series</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {series.map((show) => (
          <div
            key={show.id}
            className="cursor-pointer bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105"
            onClick={() => navigate(`/movie/${show.id}`)} // Navigate to MoviePageDetails
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
              alt={show.name}
              className="w-full h-72 object-cover rounded-md"
            />
            <div className="p-3">
              <h2 className="text-lg font-semibold">{show.name}</h2>
            </div>
          </div>
        ))}
      </div>

      {/* Loading Indicator */}
      {loading && <p className="text-center text-gray-400 mt-4">Loading...</p>}
    </div>
  );
};

export default WebSeries;
