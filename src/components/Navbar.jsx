import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { MdLiveTv } from "react-icons/md";
import { BiMoviePlay } from "react-icons/bi";
import { AiFillHome } from "react-icons/ai";
import { BiSolidCameraMovie } from "react-icons/bi";
import { IoSearchOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { FiMenu } from "react-icons/fi";

const Navbar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    if (value) {
      navigate(value);
      setSelectedCategory(value);
    }
  };

  return (
    <nav className="flex flex-wrap items-center justify-between p-4 bg-gray-900 text-neutral-300 shadow-lg md:px-8">
      {/* Logo */}
      <div className="flex items-center">
        <NavLink to="/">
          <BiMoviePlay className="h-10 w-10 text-cyan-500 hover:text-cyan-300" />
        </NavLink>
      </div>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden text-white text-2xl"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <FiMenu />
      </button>

      {/* Navigation Links */}
      <div
        className={`$ {menuOpen ? "flex" : "hidden"} md:flex flex-col md:flex-row gap-6 absolute md:static top-16 left-0 w-full md:w-auto bg-gray-900 md:bg-transparent p-4 md:p-0 z-10`}
      >
        <NavLink to="/" className="nav-link">
          <AiFillHome /> Home
        </NavLink>
        <NavLink to="/movies" className="nav-link">
          <BiSolidCameraMovie /> Movies
        </NavLink>
        <NavLink to="/tv" className="nav-link">
          <MdLiveTv /> TV
        </NavLink>
        <select
          className="bg-cyan-800 text-white px-3 py-2 rounded-md focus:outline-none"
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          <option value="">Select Category</option>
          <option value="/popular">Popular</option>
          <option value="/trending">Trending</option>
          <option value="/webseries">Web-Series</option>
          <option value="/upcoming">Upcoming</option>
        </select>
      </div>

      {/* Search & Profile */}
      <div className="flex items-center gap-4">
        <div className="relative w-40 md:w-64">
          <input
            type="text"
            placeholder="Search..."
            className="bg-cyan-900 border-b-2 border-cyan-900 text-white h-10 w-full pl-4 pr-10 rounded-full focus:outline-none"
          />
          <IoSearchOutline className="absolute right-3 top-1/2 transform -translate-y-1/2 h-6 w-6 text-white cursor-pointer" />
        </div>
        <CgProfile className="h-8 w-8 cursor-pointer hover:text-cyan-300" />
      </div>
    </nav>
  );
};

export default Navbar;

// import { NavLink, useNavigate } from "react-router-dom";
// import { MdLiveTv } from "react-icons/md";
// import { BiMoviePlay } from "react-icons/bi";
// import { AiFillHome } from "react-icons/ai";
// import { BiSolidCameraMovie } from "react-icons/bi";
// import { IoSearchOutline } from "react-icons/io5";
// import { CgProfile } from "react-icons/cg";

// const Navbar = () => {
//   const navigate = useNavigate();
//   return (
//     <nav className="flex justify-between items-center px-8 py-4 bg-gray-900 text-neutral-300 shadow-lg ">
//       {/* Logo */}
//       <div>
//         <NavLink to="/">
//           <BiMoviePlay className="h-12 w-12 text-cyan-500 hover:text-cyan-300" />
//         </NavLink>
//       </div>

//       {/* Navigation Links */}
//       <div className="flex gap-8">
//         <NavLink
//           to="/"
//           className="flex items-center gap-2 text-lg hover:text-cyan-300 focus:underline  active:underline hover:text-cyan-300 focus:text-cyan-300 active:text-cyan-300"
//         >
//           <AiFillHome />
//           <p>Home</p>
//         </NavLink>
//         <NavLink
//           to="/movies"
//           className="flex items-center gap-2 text-lg hover:text-cyan-300 focus:underline  active:underline hover:text-cyan-300 focus:text-cyan-300 active:text-cyan-300"
//         >
//           <BiSolidCameraMovie />
//           <p>Movies</p>
//         </NavLink>
//         <NavLink
//           to="/tv"
//           className="flex items-center gap-2 text-lg hover:text-cyan-300 focus:underline  active:underline hover:text-cyan-300 focus:text-cyan-300 active:text-cyan-300"
//         >
//           <MdLiveTv />
//           <p>TV</p>
//         </NavLink>

//         {/* Category Dropdown */}
//         <select
//           className="text-white bg-cyan-800 px-4 py-2 rounded-lg focus:outline-none"
//           onChange={(e) => navigate(e.target.value)}
//         >
//           <option value="">Select Category</option>
//           <option value="/popular">Popular</option>
//           <option value="/trending">Trending</option>
//           <option value="/webseries">Web-Series</option>
//           <option value="/upcoming">Upcoming</option>
//         </select>
//       </div>

//       {/* Search & Profile */}
//       <div className="flex items-center gap-6">
//         <div className="relative w-90">
//           <input
//             type="text"
//             placeholder="Search..."
//             className="bg-cyan-900 border-b-2 border-cyan-900 text-white h-10 w-full pl-5 pr-12 rounded-full focus:outline-none"
//           />
//           <IoSearchOutline className="absolute right-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-white cursor-pointer" />
//         </div>
//         <CgProfile className="h-10 w-10 cursor-pointer hover:text-cyan-300" />
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
