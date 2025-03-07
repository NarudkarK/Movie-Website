import { NavLink, useNavigate } from "react-router-dom";
import { MdLiveTv } from "react-icons/md";
import { BiMoviePlay } from "react-icons/bi";
import { AiFillHome } from "react-icons/ai";
import { BiSolidCameraMovie } from "react-icons/bi";
import { IoSearchOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <nav className="flex justify-between items-center px-8 py-4 bg-gray-900 text-neutral-300 shadow-lg ">
      {/* Logo */}
      <div>
        <NavLink to="/">
          <BiMoviePlay className="h-12 w-12 text-cyan-500 hover:text-cyan-300" />
        </NavLink>
      </div>

      {/* Navigation Links */}
      <div className="flex gap-8">
        <NavLink
          to="/"
          className="flex items-center gap-2 text-lg hover:text-cyan-300 focus:underline  active:underline hover:text-cyan-300 focus:text-cyan-300 active:text-cyan-300"
        >
          <AiFillHome />
          <p>Home</p>
        </NavLink>
        <NavLink
          to="/movies"
          className="flex items-center gap-2 text-lg hover:text-cyan-300 focus:underline  active:underline hover:text-cyan-300 focus:text-cyan-300 active:text-cyan-300"
        >
          <BiSolidCameraMovie />
          <p>Movies</p>
        </NavLink>
        <NavLink
          to="/tv"
          className="flex items-center gap-2 text-lg hover:text-cyan-300 focus:underline  active:underline hover:text-cyan-300 focus:text-cyan-300 active:text-cyan-300"
        >
          <MdLiveTv />
          <p>TV</p>
        </NavLink>

        {/* Category Dropdown */}
        <select
          className="text-white bg-cyan-800 px-4 py-2 rounded-lg focus:outline-none"
          onChange={(e) => navigate(e.target.value)}
        >
          <option value="">Select Category</option>
          <option value="/popular">Popular</option>
          <option value="/trending">Trending</option>
          <option value="/webseries">Web-Series</option>
          <option value="/upcoming">Upcoming</option>
        </select>
      </div>

      {/* Search & Profile */}
      <div className="flex items-center gap-6">
        <div className="relative w-90">
          <input
            type="text"
            placeholder="Search..."
            className="bg-cyan-900 border-b-2 border-cyan-900 text-white h-10 w-full pl-5 pr-12 rounded-full focus:outline-none"
          />
          <IoSearchOutline className="absolute right-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-white cursor-pointer" />
        </div>
        <CgProfile className="h-10 w-10 cursor-pointer hover:text-cyan-300" />
      </div>
    </nav>
  );
};

export default Navbar;

// /* Navbar.jsx

// const Navbar = () => {
//   return (
//     <nav className="flex justify-evenly items-center py-4 bg-transparent text-neutral-300">
//       {/*Logo Div */}
//       <div className="flex justify-evenly items-center py-4 bg-transparent text-neutral-300">
//         <NavLink
//           to="/home"
//           className="text-neutral-300 text-2xl hover-underline focus:underline active:underline hover:text-cyan-300 focus:text-cyan-900 active:text-cyan-900"
//         >
//           <BiMoviePlay className="h-12 w-12 text-cyan-900"></BiMoviePlay>
//         </NavLink>
//       </div>
//       {/*Tabs Div */}
//       <div className="flex justify-evenly items-center py-4 bg-transparent text-neutral-300">
//         <NavLink
//           to="/home"
//           className="text-neutral-300 text-2xl hover-underline focus:underline active:underline hover:text-cyan-900 focus:text-cyan-900 active:text-cyan-900"
//         >
//           <div className="flex justify-center items-center">
//             <AiFillHome />
//             <p>Home</p>
//           </div>
//         </NavLink>
//         <NavLink
//           to={"/movies"}
//           className="text-neutral-300 text-2xl hover-underline focus:underline active:underline hover:text-cyan-900 focus:text-cyan-900 active:text-cyan-900"
//         >
//           <div className="flex justify-center items-center">
//             <BiSolidCameraMovie />
//             <p>Movies</p>
//           </div>
//         </NavLink>
//         <NavLink
//           to={"/tv"}
//           className="text-neutral-300 text-2xl hover-underline focus:underline active:underline hover:text-cyan-900 focus:text-cyan-900 active:text-cyan-900"
//         >
//           <div className="flex justify-center items-center">
//             <MdLiveTv />
//             <p>Tv</p>
//           </div>
//         </NavLink>
//       </div>
//       {/*Logo Div */}
//       <div className="flex justify-between items-center py-4 bg-transparent text-neutral-300">
//         <div className="relative w-90">
//           <input
//             type="text"
//             placeholder="Search..."
//             className="bg-cyan-900 border-b-2 border-cyan-900 text-white h-10 w-full pl-5 pr-12 rounded-full focus:outline-none"
//           />
//           <IoSearchOutline className="absolute right-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-white cursor-pointer" />
//         </div>
//         <CgProfile />
//       </div>
//     </nav>
//   );
// };
// */}
