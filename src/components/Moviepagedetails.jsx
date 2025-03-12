import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const API_KEY = "9367549a77347a7f8a1302eada1e0563";

const MoviePageDetails = () => {
  const { id } = useParams(); // Get the movie ID from the URL
  const [movieDetails, setMovieDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cast, setCast] = useState([]);
  const [suggestedMovies, setSuggestedMovies] = useState([]);
  const [trailer, setTrailer] = useState(null);
  const [streamingLinks, setStreamingLinks] = useState([]);

  // Fetch Movie Details + Streaming Providers
  const fetchMovieDetails = async () => {
    try {
      // Fetch movie details
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`
      );
      const data = await res.json();
      setMovieDetails(data);

      // Fetch cast
      const castRes = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}`
      );
      const castData = await castRes.json();
      setCast(castData.cast);

      // Fetch suggested movies
      const suggestedRes = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${API_KEY}`
      );
      const suggestedData = await suggestedRes.json();
      setSuggestedMovies(suggestedData.results);

      // Fetch trailer
      const trailerRes = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}`
      );
      const trailerData = await trailerRes.json();
      if (trailerData.results.length > 0) {
        setTrailer(trailerData.results[0].key);
      }

      // Fetch streaming providers
      const providerRes = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/watch/providers?api_key=${API_KEY}`
      );
      const providerData = await providerRes.json();

      // Extract streaming links
      if (providerData.results && providerData.results.IN) {
        // Change 'IN' to user country if needed
        setStreamingLinks(providerData.results.IN.flatrate || []);
      }
    } catch (error) {
      console.error("Error fetching movie details:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMovieDetails();
  }, [id]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="relative min-h-screen">
      {/* Background Image with Blur */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movieDetails.poster_path})`,
          filter: "blur(8px)",
        }}
      ></div>

      {/* Content Wrapper */}
      <div className="relative z-10 container mx-auto p-8 bg-transparent bg-opacity-75 rounded-lg">
        {/* Movie Details */}
        <div className="flex flex-col md:flex-row items-center md:space-x-8">
          <img
            src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
            alt={movieDetails.title}
            className="w-64 h-auto rounded-md md:w-80 lg:w-96"
          />
          <div className="text-black flex flex-col space-y-4 mt-4 md:mt-0">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold">
              {movieDetails.title}
            </h2>
            <p className="text-lg sm:text-xl">{movieDetails.overview}</p>
            <p className="text-md sm:text-lg">
              <strong>Release Date:</strong> {movieDetails.release_date}
            </p>
            <p className="text-md sm:text-lg">
              <strong>Rating:</strong> {movieDetails.vote_average}
            </p>
          </div>
        </div>

        {/* Trailer and Watch Now Buttons */}
        <div className="flex flex-wrap gap-4 mt-8">
          {trailer && (
            <a
              href={`https://www.youtube.com/watch?v=${trailer}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-red-600 text-white px-6 py-2 rounded-md text-lg hover:bg-red-800 transition"
            >
              Watch Trailer
            </a>
          )}

          {/* Watch Now (Streaming Platforms) */}
          {streamingLinks.length > 0 ? (
            streamingLinks.map((provider) => (
              <a
                key={provider.provider_id}
                href={`https://www.justwatch.com/in/movie/${movieDetails.title.replace(
                  /\s+/g,
                  "-"
                )}`} // Redirects to JustWatch
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 text-white px-6 py-2 rounded-md text-lg hover:bg-blue-800 transition"
              >
                Watch on {provider.provider_name}
              </a>
            ))
          ) : (
            <p className="text-gray-500">No streaming options available</p>
          )}
        </div>

        {/* Cast Section */}
        <div className="mt-8">
          <h3 className="text-xl font-semibold">Cast</h3>
          <div className="flex flex-wrap space-x-4 mt-4">
            {cast.slice(0, 6).map((actor) => (
              <div key={actor.id} className="flex flex-col items-center">
                <img
                  src={
                    actor.profile_path
                      ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                      : "https://via.placeholder.com/200x300?text=No+Image"
                  }
                  alt={actor.name}
                  className="w-32 h-48 rounded-md"
                />
                <p className="text-center mt-2 text-sm">{actor.name}</p>
                <p className="text-center text-xs text-gray-300">
                  {actor.character}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Suggested Movies Section */}
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Suggested Movies</h3>
          <div className="flex overflow-x-auto gap-4 py-4">
            {suggestedMovies.map((movie) => (
              <div
                key={movie.id}
                className="movie-card cursor-pointer w-40 flex-none"
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="rounded-md w-full h-60 object-cover"
                />
                <p className="mt-2 text-center text-sm">{movie.title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoviePageDetails;
