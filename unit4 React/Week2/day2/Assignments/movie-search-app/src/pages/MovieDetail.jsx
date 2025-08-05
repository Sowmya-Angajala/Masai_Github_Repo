import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await axios.get(`https://www.omdbapi.com/?apikey=YOUR_API_KEY&i=${id}`);
        if (res.data.Response === 'True') {
          setMovie(res.data);
        } else {
          setError(res.data.Error);
        }
      } catch (err) {
        setError('Failed to fetch movie details');
      }
      setLoading(false);
    };

    fetchMovie();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <Link to="/">← Back to Search</Link>
      <h2>{movie.Title} ({movie.Year})</h2>
      <img src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300'} alt={movie.Title} />
      <p><strong>Genre:</strong> {movie.Genre}</p>
      <p><strong>Plot:</strong> {movie.Plot}</p>
    </div>
  );
};

export default MovieDetail;
