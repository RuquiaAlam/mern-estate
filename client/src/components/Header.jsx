import { FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <header className="bg-slate-200  shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto  p-3">
        <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
          <Link to="/">
            <span className="text-slate-500">Mern </span>
            <span className="text-slate-700">Estate</span>
          </Link>
        </h1>
        <form className="bg-slate-100 p-3 rounded-lg items-center flex">
          <input
            className="bg-transparent rounded-lg focus:outline-none w-24 sm:w-64"
            type="text"
            placeholder="Search..."
            id="search"
          />
          <FaSearch className="text-slate-500 " />
        </form>

        <ul className="flex gap-4">
          <Link to="/about">
            <li className="hidden sm:inline text-slate-700 hover:underline">
              About
            </li>
          </Link>
          <Link to="/">
            <li className="hidden sm:inline text-slate-700 hover:underline">
              Home
            </li>
          </Link>

          <Link to="/profile">
            {currentUser ? (
              <img
                className="w-8 h-8 rounded-full"
                src={currentUser.avatar}
                alt="profile"
              />
            ) : (
              <li className=" sm:inline text-slate-700 hover:underline">
                Sign In
              </li>
            )}
          </Link>
        </ul>
      </div>
    </header>
  );
}
