
import './styles/MovieDetails.css';

const MovieDetails = ({ movie, onBack }) => {
    return (
        <div className="movie-details">
            <button onClick={onBack} className='back-button'>
            <span class="icon">←</span> Back to Movies</button>
            <h2>{movie.title}</h2>
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
            <p><strong>Release Date:</strong> {movie.release_date}</p>
            <p><strong>Rating:</strong> {movie.vote_average}</p>
            <p>{movie.overview}</p>
        </div>
    );
};

export default MovieDetails;



