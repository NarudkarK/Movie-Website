import "./TvShows.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection

const API_KEY = "9367549a77347a7f8a1302eada1e0563";

const TvShows = () => {
  const [tvShow, setTvShow] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Initialize the navigate function for redirection

  const fetchTvShows = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&page=${page}`
      );
      const data = await res.json();
      setTvShow((prev) => [...prev, ...data.results]);
      setPage((prev) => prev + 1);
    } catch (error) {
      console.error("Error fetching TV shows:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTvShows();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 50 &&
        !loading
      ) {
        fetchTvShows();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading]);

  return (
    <div className="h-full grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 p-4 bg-gray-900 text-white">
      {tvShow.map((show, index) => (
        <div
          key={`${show.id}-${index}`} // Ensure unique key
          onClick={() => navigate(`/movie/${show.id}`)} // Navigate to MoviePageDetails component
          className="cursor-pointer h-full flex flex-col items-center justify-center bg-gray-800 rounded-lg p-4 text-white border-2 hover:border-cyan-700 transition-transform transform hover:scale-105"
        >
          <img
            src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
            alt={show.name}
            className="w-full h-60 object-cover rounded-md"
          />
          <h3 className="mt-2 text-center text-lg font-semibold">
            {show.name}
          </h3>
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

export default TvShows;
