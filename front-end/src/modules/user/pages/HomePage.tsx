import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useUserStore } from "../store/user-store";

const HomePage = () => {
  const { user } = useUserStore();
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white flex items-center justify-center px-4 py-10">
      <motion.div
        className="w-full max-w-4xl text-center px-4 md:px-8"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6">
          Feel the <span className="text-indigo-500">Beat</span> with MuseBeat
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 mb-10">
          Upload, stream, and collect your favorite songs with an immersive listening experience.
        </p>

        <div className="flex flex-wrap justify-center gap-4 md:gap-6 mb-12">
          {!user.isLoggedIn ? (
            <>
              <Link
                to="/login"
                className="bg-white text-gray-900 hover:bg-gray-200 transition duration-300 px-6 py-3 rounded-lg font-semibold"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-indigo-600 hover:bg-indigo-700 transition duration-300 text-white px-6 py-3 rounded-lg font-semibold"
              >
                Register
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/lib"
                className="bg-white text-gray-900 hover:bg-gray-200 transition duration-300 px-6 py-3 rounded-lg font-semibold"
              >
                My Library
              </Link>
              
            </>
          )}
        </div>



        <motion.div
          className="flex justify-center items-end h-16 gap-1"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 1 }}
        >
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="w-2 bg-indigo-500 rounded"
              style={{
                height: `${Math.random() * 40 + 20}px`,
                animation: `pulse ${Math.random() + 0.5}s infinite ease-in-out alternate`,
              }}
            ></div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};
export default HomePage;