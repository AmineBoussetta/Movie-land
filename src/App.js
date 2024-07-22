import './App.css';
import { useState, useEffect } from 'react';
import SearchIcon from './search.svg'
import MovieCard from './MovieCard';

const API_URL = "http://omdbapi.com/?apikey=e6cf06c7&";


const App = () => {

  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  
  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();

    setMovies(data.Search)
  }

  useEffect(() => {
    searchMovies('Spiderman')
  }, []);

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      searchMovies(searchTerm);
    }
  }

  return (
    <div className='app'>
      <h1>MovieLand</h1>

      <div className='search'>
        <input 
          placeholder='Search for movies'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
          type="text" 
        />
        <img 
          src={SearchIcon} 
          alt="search"
          onClick={() => searchMovies(searchTerm)} 
        />
      </div>

      {
        movies?.length > 0 ? (
          <div className='container'>
            {movies.map((movie) => (
              <MovieCard key={movie.imdbID} movie={movie}/>
            ))}
          </div>
        ) : (
          <div className="empty">
            <h2>No movies found.</h2>
          </div>
        )
      }
    </div>
  );
}

export default App;
