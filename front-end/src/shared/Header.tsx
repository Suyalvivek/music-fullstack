import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-gray-900 text-white px-6 py-4 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">🎵 Music App</h1>
        <nav className="space-x-6 text-sm font-medium">
          <Link to="/" className="hover:text-pink-400 transition">
            Home
          </Link>
          <Link to="/Login" className="hover:text-pink-400 transition">
            Login
          </Link>
          <Link to="/Register" className="hover:text-pink-400 transition">
            Register
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
