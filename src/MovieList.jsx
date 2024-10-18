// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import MovieCard from './MovieCard.jsx';
// import './MovieList.css';
// import './Loading.css';

// const MovieList = ({ onMovieSelect }) => {
//     const [movies, setMovies] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [searchTerm, setSearchTerm] = useState('');

//     useEffect(() => {
//         const fetchMovies = async () => {
//             setLoading(true);
//             try {
//                 const response = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-US&page=1`);
//                 const movieData = await Promise.all(response.data.results.map(async (movie) => {
//                     const videoResponse = await axios.get(`https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-US`);
//                     const trailer = videoResponse.data.results.find(video => video.type === 'Trailer');
//                     return {
//                         ...movie,
//                         trailerUrl: trailer ? `https://www.youtube.com/watch?v=${trailer.key}` : null
//                     };
//                 }));
//                 setMovies(movieData);
//             } catch (error) {
//                 console.error("Error fetching movies:", error);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchMovies();
//     }, []);

//     const handleSearch = async () => {
//         if (!searchTerm) return; // Do nothing if search term is empty
//         setLoading(true);
//         try {
//             const response = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${import.meta.env.VITE_TMDB_API_KEY}&query=${searchTerm}`);
//             const movieData = await Promise.all(response.data.results.map(async (movie) => {
//                 const videoResponse = await axios.get(`https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-US`);
//                 const trailer = videoResponse.data.results.find(video => video.type === 'Trailer');
//                 return {
//                     ...movie,
//                     trailerUrl: trailer ? `https://www.youtube.com/watch?v=${trailer.key}` : null
//                 };
//             }));
//             setMovies(movieData);
//         } catch (error) {
//             console.error("Error searching for movies:", error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleKeyPress = (event) => {
//         if (event.key === 'Enter') {
//             handleSearch(); // Trigger search on Enter key press
//         }
//     };

//     if (loading) {
//         return <div className="loading">Loading...</div>;
//     }

//     return (
//         <div>
//             <div className="search-container">
//                 <input 
//                     type="text" 
//                     placeholder="Search for a movie..." 
//                     value={searchTerm} 
//                     onChange={(e) => setSearchTerm(e.target.value)} 
//                     onKeyPress={handleKeyPress} 
//                     className="search-input"
//                 />
//                 <button onClick={handleSearch} className="search-button">Search</button>
//             </div>
//             <div className="movie-list">
//                 {movies.map(movie => (
//                     <MovieCard key={movie.id} movie={movie} onSelect={onMovieSelect} />
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default MovieList;


import { useEffect, useState } from 'react';
import axios from 'axios';
import MovieCard from './MovieCard.jsx';
import './styles/MovieList.css';
import './styles/Loading.css';

const MovieList = ({ onMovieSelect }) => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    useEffect(() => {
        const fetchMovies = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-US&page=1`);
                const movieData = await Promise.all(response.data.results.map(async (movie) => {
                    const videoResponse = await axios.get(`https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-US`);
                    const trailer = videoResponse.data.results.find(video => video.type === 'Trailer');
                    return {
                        ...movie,
                        trailerUrl: trailer ? `https://www.youtube.com/watch?v=${trailer.key}` : null
                    };
                }));
                setMovies(movieData);
            } catch (error) {
                console.error("Error fetching movies:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchMovies();
    }, []);

    const handleSearch = async () => {
        if (!searchTerm) return;
        setLoading(true);
        try {
            const response = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${import.meta.env.VITE_TMDB_API_KEY}&query=${searchTerm}`);
            const movieData = await Promise.all(response.data.results.map(async (movie) => {
                const videoResponse = await axios.get(`https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-US`);
                const trailer = videoResponse.data.results.find(video => video.type === 'Trailer');
                return {
                    ...movie,
                    trailerUrl: trailer ? `https://www.youtube.com/watch?v=${trailer.key}` : null
                };
            }));
            setMovies(movieData);
        } catch (error) {
            console.error("Error searching for movies:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    const handleChange = async (event) => {
        const value = event.target.value;
        setSearchTerm(value);

        if (value) {
            try {
                const response = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${import.meta.env.VITE_TMDB_API_KEY}&query=${value}`);
                setSuggestions(response.data.results);
            } catch (error) {
                console.error("Error fetching suggestions:", error);
            }
        } else {
            setSuggestions([]);
        }
    };

    const handleSuggestionClick = (suggestion) => {
        setSearchTerm(suggestion.title);
        setSuggestions([]);
        handleSearch();
    };

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    return (
        <div>
            <div className="search-container">
                <input 
                    type="text" 
                    placeholder="Search for a movie..." 
                    value={searchTerm} 
                    onChange={handleChange} 
                    onKeyPress={handleKeyPress} 
                    className="search-input"
                />
                <button onClick={handleSearch} className="search-button">Search</button>
                {suggestions.length > 0 && (
                    <ul className="suggestions-list">
                        {suggestions.map(suggestion => (
                            <li key={suggestion.id} onClick={() => handleSuggestionClick(suggestion)} className="suggestion-item">
                                {suggestion.title}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <div className="movie-list">
                {movies.map(movie => (
                    <MovieCard key={movie.id} movie={movie} onSelect={onMovieSelect} />
                ))}
            </div>
        </div>
    );
};

export default MovieList;

