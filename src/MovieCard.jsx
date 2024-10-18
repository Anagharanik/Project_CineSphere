
// import './MovieCard.css';

// const MovieCard = ({ movie, onSelect }) => {
//     return (
//         <div className="movie-card" onClick={() => onSelect(movie)}>
//             <img 
//                 src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
//                 alt={movie.title} 
//             />
//             <h3>{movie.title}</h3>
//             <p>Release Date: {movie.release_date}</p>
//             <p>Rating: {movie.vote_average}</p>
//         </div>
//     );
// };

// export default MovieCard;

import './styles/MovieCard.css';

const MovieCard = ({ movie, onSelect }) => {
    
    return (
        <div className="movie-card" onClick={() => onSelect(movie)}>
            <img 
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                alt={movie.title} 
            />
            <h3>{movie.title}</h3>
            <p>Release Date: {movie.release_date}</p>
            <p>Rating: {movie.vote_average}</p>
            {movie.trailerUrl && (
                <a href={movie.trailerUrl} target="_blank" rel="noopener noreferrer" className="trailer-link">Watch Trailer</a>
            )}
           
        </div>
    );
};

export default MovieCard;

