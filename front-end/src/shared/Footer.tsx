const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-4 ">
      <div className="max-w-7xl mx-auto text-center text-sm">
        <p>© {new Date().getFullYear()} Music App. All rights reserved.</p>
        <p className="mt-1">
          Made with ❤️ by Vivek |{" "}
          <a
            href="https://github.com/SuyalVivek/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-pink-400 hover:underline"
          >
            GitHub
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;