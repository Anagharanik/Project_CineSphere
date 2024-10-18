import './styles/Navbar.css';

const Navbar = () => {
    return (
        <nav className="navbar">
            <h1 className="animated-header">CineSphere</h1>
            <p className="tagline">A Universe of Films at Your Fingertips</p>
            <div className="sparkles">
                <div className="sparkle"></div>
                <div className="sparkle"></div>
                <div className="sparkle"></div>
            </div>
        </nav>
    );
};

export default Navbar;
