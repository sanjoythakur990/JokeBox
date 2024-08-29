import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css'; // Optional: For custom styling

const Home = () => {
    const navigate = useNavigate();

    const handleRegister = () => {
        navigate('/register'); // Redirect to Register page
    };

    const handleLogin = () => {
        navigate('/login'); // Redirect to Login page
    };

    return (
        <div className="homepage-container">
            <h1>Welcome to Jokebox</h1>
            <p>
                Jokebox is your go-to app for a quick laugh. Discover a world of jokes and laughter! Register to get started, and
                if you're already a user, simply log in to access your personalized jokes.
            </p>
            {/* <p>
                    Discover a world of jokes and laughter! Whether you're new to Jokebox or a returning user, you’re just a click away from some fun. 
                    Register to join the community, or log in if you're already a member.
            </p> */}
            <div className="button-container">
                <button onClick={handleRegister} className="btn">Register</button>
                <button onClick={handleLogin} className="btn">Login</button>
            </div>
        </div>
    );
};

export default Home;
