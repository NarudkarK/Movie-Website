import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Movies from "./components/Movies";
import Navbar from "./components/Navbar";
import TvShows from "./components/TvShows";
import Home from "./components/Home";
import Trending from "./components/categories/Trending";
import Popular from "./components/categories/Popular";
import WebSeries from "./components/categories/WebSeries";
import Upcoming from "./components/categories/Upcoming";

import MoviePageDetails from "./components/MoviePageDetails";

const App = () => {
  return (
    <Router>
      <div className="relative min-h-screen bg-slate-950 text-neutral-300 antialiased selection:bg-cyan-300 selection:text-cyan-900 ">
        {/* Gradient Background */}
        <div className="absolute inset-0 -z-10 h-full w-full [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>

        {/* Navigation Bar */}
        <Navbar />

        {/* Main Content */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/tv" element={<TvShows />} />
          <Route path="/trending" element={<Trending />} />
          <Route path="/popular" element={<Popular />} />
          <Route path="/webseries" element={<WebSeries />} />
          <Route path="/upcoming" element={<Upcoming />} />
          <Route path="/movie/:id" element={<MoviePageDetails />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
