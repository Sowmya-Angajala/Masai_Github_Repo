import { useState } from 'react';
import axios from 'axios';
import SearchBar from '../components/SearchBar';
import MovieCard from '../components/MovieCard';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (title) => {
    setLoading(true);
    setError('');
    try {
      const res = await axios.get(`https://www.omdbapi.com/?apikey=YOUR_API_KEY&s=${title}`);
      if (res.data.Response === 'True') {
        setMovies(res.data.Search);
      } else {
        setError(res.data.Error);
        setMovies([]);
      }
    } catch (err) {
      setError('Something went wrong!');
    }
    setLoading(false);
  };

  return (
    <div>
      <h1>Movie Search App</h1>
      <SearchBar onSearch={handleSearch} />
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <div>
        {movies.map((movie) => (
          <MovieCard key={movie.imdbID} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default Home;
