import { Link } from 'react-router-dom';

const trendingSongs = [
  {
    id: 1,
    title: 'Shape of You',
    artist: 'Ed Sheeran',
    cover: 'https://linktoimage.com/shapeofyou.jpg',
  },
  {
    id: 2,
    title: 'Blinding Lights',
    artist: 'The Weeknd',
    cover: 'https://linktoimage.com/blindinglights.jpg',
  },
  {
    id: 3,
    title: 'Levitating',
    artist: 'Dua Lipa',
    cover: 'https://linktoimage.com/levitating.jpg',
  },
];

const Trending = () => {
  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white px-6 py-10">
      <h1 className="text-3xl font-bold mb-6 text-white">🔥 Trending Songs</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {trendingSongs.map((song) => (
          <div
            key={song.id}
            className="bg-[#1c1c1c] rounded-lg p-4 shadow-md hover:shadow-lg transition"
          >
            <img
              src={song.cover}
              alt={song.title}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h2 className="text-xl font-semibold">{song.title}</h2>
            <p className="text-gray-400">{song.artist}</p>
          </div>
        ))}
      </div>
      <div className="mt-10">
        <Link
          to="/"
          className="text-indigo-400 hover:underline text-sm"
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  );
};

export default Trending;
