import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import { fetchNetflixData } from '../services/api';

// Mock component for a single movie/series card
const MovieCard = React.memo(({ movie }) => {
  const imageUrl = movie.posterUrl || 'https://via.placeholder.com/300x450?text=No+Image';

  return (
    <div
      className="relative w-48 h-72 lg:w-64 lg:h-96 cursor-pointer transform hover:scale-105 transition-transform duration-300 ease-in-out group rounded-lg overflow-hidden shadow-xl"
      title={movie.title}
    >
      {/* Background Image */}
      <img
        src={imageUrl}
        alt={movie.title}
        className="w-full h-full object-cover"
        loading="lazy"
      />

      {/* Overlay for details (hidden by default) */}
      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-70 transition-all duration-300 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100">
        <h3 className="text-white text-lg font-bold truncate mb-1">{movie.title}</h3>
        <p className="text-gray-300 text-sm mb-2">{movie.year}</p>
        <button className="bg-red-600 text-white py-1 px-3 text-sm rounded hover:bg-red-700 transition duration-200">
          Play
        </button>
      </div>
    </div>
  );
});

// Mock component for a horizontal row of movies
const MovieRow = ({ title, movies }) => {
  if (!movies || movies.length === 0) return null;

  return (
    <div className="mb-8 px-6 lg:px-12">
      <h2 className="text-2xl font-bold text-white mb-4">{title}</h2>
      <div className="flex overflow-x-scroll space-x-4 pb-4 scrollbar-hide">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

// Custom utility hook for hiding the scrollbar (Tailwind doesn't have a direct class)
// This applies CSS to hide the scrollbar specifically for the movie row container.
const ScrollbarHideCSS = () => (
  <style jsx="true">{`
    .scrollbar-hide::-webkit-scrollbar {
      display: none; /* Chrome, Safari, Opera */
    }
    .scrollbar-hide {
      -ms-overflow-style: none;  /* IE and Edge */
      scrollbar-width: none;  /* Firefox */
    }
  `}</style>
);


const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const result = await fetchNetflixData();
        setData(result);
      } catch (err) {
        setError("Failed to load content. Please check the API service.");
        console.error("Dashboard data fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-red-600 text-xl">Loading Netflix Content...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 p-8 text-white">
        <Header />
        <div className="mt-20 text-center text-red-500 text-lg">Error: {error}</div>
      </div>
    );
  }

  // Determine the 'hero' movie for the main banner
  const heroMovie = data?.rows?.find(row => row.title === "Trending Now")?.movies[0] || data?.rows[0]?.movies[0] || null;

  return (
    <div className="min-h-screen bg-gray-900 font-sans">
      <ScrollbarHideCSS />
      <Header />

      {/* Hero Section */}
      {heroMovie && (
        <HeroSection movie={heroMovie} />
      )}
      
      {/* Content Rows */}
      <main className="relative z-10 -mt-24 pb-10"> {/* Pulls content up over the hero section */}
        {data?.rows?.map((row, index) => (
          <MovieRow key={index} title={row.title} movies={row.movies} />
        ))}
      </main>
    </div>
  );
};

// Hero Section Component
const HeroSection = ({ movie }) => {
  const backdropUrl = movie.backdropUrl || movie.posterUrl || 'https://via.placeholder.com/1920x800?text=Welcome+to+Netflix';
  
  return (
    <section 
      className="relative h-[65vh] md:h-[80vh] bg-cover bg-center"
      style={{ backgroundImage: `url(${backdropUrl})` }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-black opacity-80"></div>
      
      {/* Content */}
      <div className="absolute bottom-0 left-0 p-6 lg:p-12 w-full max-w-4xl text-white">
        <h1 className="text-4xl lg:text-7xl font-extrabold mb-4 drop-shadow-lg">{movie.title}</h1>
        <p className="text-lg lg:text-xl mb-6 line-clamp-3 max-w-3xl drop-shadow-md">
          {movie.description || "A placeholder description for this exciting movie or series."}
        </p>
        
        {/* Buttons */}
        <div className="flex space-x-4">
          <button className="flex items-center px-6 py-2 bg-white text-black text-lg font-bold rounded hover:bg-gray-200 transition duration-200">
            <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"></path></svg>
            Play
          </button>
          <button className="flex items-center px-6 py-2 bg-gray-600 bg-opacity-70 text-white text-lg font-bold rounded hover:bg-opacity-90 transition duration-200">
            <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 002 0v-3a1 1 0 00-2 0zm1 7a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"></path></svg>
            More Info
          </button>
        </div>
      </div>
    </section>
  );
}

export default Dashboard;