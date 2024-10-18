import { useState } from 'react';
import Navbar from './Navbar';
import MovieList from './MovieList';
import MovieDetails from './MovieDetails';
import Footer from './Footer';
const App = () => {
    const [selectedMovie, setSelectedMovie] = useState(null);

    const handleMovieSelect = (movie) => {
        setSelectedMovie(movie);
    };

    const handleBack = () => {
        setSelectedMovie(null);
    };

    return (
        <div>
            <Navbar />
            {selectedMovie ? (
                <MovieDetails movie={selectedMovie} onBack={handleBack} />
            ) : (
                <MovieList onMovieSelect={handleMovieSelect} />
            )}
            <Footer/>
        </div>
    );
};

export default App;
