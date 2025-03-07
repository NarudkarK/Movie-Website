import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_KEY = "9367549a77347a7f8a1302eada1e0563";
const BASE_URL = "https://api.themoviedb.org/3";

const sections = [
  { title: "Trending", endpoint: "/trending/movie/day", path: "/trending" },
  { title: "Popular", endpoint: "/movie/popular", path: "/popular" },
  { title: "Upcoming", endpoint: "/movie/upcoming", path: "/upcoming" },
  { title: "Web Series", endpoint: "/tv/popular", path: "/web-series" },
];

const Home = () => {
  const [movies, setMovies] = useState({});
  const [currentIndexes, setCurrentIndexes] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      const movieData = {};
      for (let section of sections) {
        try {
          const { data } = await axios.get(`${BASE_URL}${section.endpoint}`, {
            params: { api_key: API_KEY },
          });
          movieData[section.title] = data.results;
        } catch (error) {
          console.error(`Error fetching ${section.title}:`, error);
        }
      }
      setMovies(movieData);

      const initialIndexes = {};
      sections.forEach((s) => (initialIndexes[s.title] = 0));
      setCurrentIndexes(initialIndexes);
    };

    fetchMovies();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndexes((prevIndexes) => {
        const newIndexes = { ...prevIndexes };
        sections.forEach((section) => {
          const moviesList = movies[section.title] || [];
          if (moviesList.length > 0) {
            newIndexes[section.title] =
              (prevIndexes[section.title] + 1) % moviesList.length;
          }
        });
        return newIndexes;
      });
    }, 15000);
    return () => clearInterval(interval);
  }, [movies]);

  return (
    <div className="flex flex-col gap-12 p-6 bg-gray-900 text-white">
      {sections.map((section) => {
        const movieList = movies[section.title] || [];
        const movie = movieList[currentIndexes[section.title]] || {};
        const isHighlightedSection =
          section.title === "Trending" || section.title === "Upcoming";

        return (
          <div
            key={section.title}
            className={`relative w-full ${
              isHighlightedSection ? "h-[600px]" : "h-auto"
            } flex flex-col justify-center items-center bg-gray-900 rounded-lg shadow-lg overflow-hidden border border-gray-700`}
            style={{
              backgroundImage:
                isHighlightedSection && movie.backdrop_path
                  ? `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`
                  : "none",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {/* Section Title */}
            <h2
              className="absolute top-4 left-6 text-3xl font-bold text-yellow-400 cursor-pointer hover:underline"
              onClick={() => navigate(section.path)}
            >
              {section.title}
            </h2>

            {/* Trending & Upcoming Section Layout */}
            {isHighlightedSection ? (
              <div className="w-full h-full flex items-center justify-center px-12 relative">
                {/* Movie Content */}
                <div className="w-[400px] text-left space-y-4 text-white bg-transparent bg-opacity-150 p-6 rounded-lg">
                  <h1 className="text-5xl font-bold">
                    {movie.title || movie.name || "No Title Available"}
                  </h1>
                  <p className="text-lg">
                    {movie.overview || "No description available."}
                  </p>
                  <p className="text-xl">
                    <strong>Release Date:</strong>{" "}
                    {movie.release_date || movie.first_air_date || "N/A"}
                  </p>
                  <p className="text-xl">
                    <strong>⭐ Rating:</strong> {movie.vote_average || "N/A"}
                  </p>
                </div>
                {/* Movie Poster */}
                <div className="w-[300px] ml-[50px]">
                  <img
                    src={
                      movie.poster_path
                        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                        : "https://via.placeholder.com/300x450?text=No+Image"
                    }
                    alt={movie.title || "Movie Poster"}
                    className="w-80 h-[400px] rounded-lg shadow-xl hover:scale-135 transition-transform"
                  />
                </div>
              </div>
            ) : (
              // Popular & Web Series Section with Horizontal Scroller
              <div className="w-full px-6 overflow-x-scroll no-scrollbar py-17">
                <div className="flex space-x-3">
                  {movieList.map((movieItem) => (
                    <div
                      key={movieItem.id}
                      className="w-[250px] bg-gray-800 p-4 rounded-lg shadow-md hover:scale-105 transition-transform flex-none"
                    >
                      <img
                        src={
                          movieItem.poster_path
                            ? `https://image.tmdb.org/t/p/w500${movieItem.poster_path}`
                            : "https://via.placeholder.com/300x450?text=No+Image"
                        }
                        alt={movieItem.title || "Movie Poster"}
                        className="w-full h-[330px] rounded-lg"
                      />
                      <h3 className="text-xl font-semibold mt-2">
                        {movieItem.title || movieItem.name}
                      </h3>
                      <p className="text-gray-300 text-lg">
                        ⭐ {movieItem.vote_average || "N/A"}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Home;
