import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useUserStore } from "../modules/user/store/user-store";

const Header = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const { user, logout, checkAuthStatus } = useUserStore();
  const navigate = useNavigate();

  useEffect(() => {
    // Check authentication status when component mounts
    checkAuthStatus();
  }, [checkAuthStatus]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="bg-gray-900 text-white px-6 py-4 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center justify-between w-full">
          <a href="/">
            <h1 className="text-2xl font-extrabold tracking-wide">🎵 MuseBeat</h1>
          </a>
          <button
            className="sm:hidden text-white focus:outline-none"
            onClick={() => setMenuOpen(!isMenuOpen)}
          >
            ☰
          </button>
        </div>
        <nav
          className={`${
            isMenuOpen ? "flex" : "hidden"
          } sm:flex flex-col sm:flex-row gap-4 sm:gap-6 items-center text-sm font-medium justify-center sm:justify-end w-full sm:w-auto mt-4 sm:mt-0`}
        >
          <Link to="/home" className="hover:text-pink-400 px-3 py-1 rounded transition">
            Home
          </Link>
          
          {!user.isLoggedIn ? (
            <>
              <Link to="/login" className="hover:text-pink-400 px-3 py-1 rounded transition">
                Login
              </Link>
              <Link to="/register" className="hover:text-pink-400 px-3 py-1 rounded transition">
                Register
              </Link>
            </>
          ) : (
            <>
              {user.role === "admin" && (
                <Link to="/add-song" className="hover:text-pink-400 px-3 py-1 rounded transition">
                  Upload Song
                </Link>
              )}
              <Link to="/lib" className="hover:text-pink-400 px-3 py-1 rounded transition">
                MyLibrary
              </Link>
              <button 
                onClick={handleLogout}
                className="hover:text-pink-400 px-3 py-1 rounded transition text-sm font-medium"
              >
                Logout
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
