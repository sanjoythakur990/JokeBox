import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import UserContext from "../Context/UserContext";
import { useNavigate } from "react-router-dom";
import "./dashboard.css"; // Make sure this file contains the updated styles

const Dashboard = () => {
    const [msg, setMsg] = useState("");
    const [name, setName] = useState("");
    const { token, setToken } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (token) getJoke();
    }, [token]);

    useEffect(() => {
        let storedToken = localStorage.getItem("token");
        if (storedToken) {
            setToken(storedToken);
        } else {
            getJoke();
        }
    }, []);

    async function getJoke() {
        try {
            let response = await axios.get("https://instagram-express-app.vercel.app/api/auth/zuku", {
                headers: {
                    authorization: `Bearer ${token}`
                }
            });
            setMsg(response.data.data.message);
            setName(response.data.data.user.name);
        } catch (err) {
            console.log(err);
            setMsg(err.response.data.message);
        }
    }

    async function logout() {
        try {
            await axios.delete("https://instagram-express-app.vercel.app/api/auth/logout", {
                headers: {
                    authorization: `Bearer ${token}`
                }
            });
            setToken("");
            setName("");
            setMsg("");
            alert("Logout Successful");
            navigate("/login");
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
                <h1>Welcome to Your Dashboard</h1>
                <p className="intro-text">Here's a little something to brighten your day!</p>
            </div>
            <div className="dashboard-content">
                {name && <h2 className="welcome-message">Hello, {name}!</h2>}
                {msg && (
                    <div className="joke-container">
                        <p className="joke-text">{msg}</p>
                        <button className="reload-button" onClick={getJoke}>🔄 Reload Joke</button>
                    </div>
                )}
            </div>
            <button className="logout-button" onClick={logout}>Logout</button>
        </div>
    );
}

export default Dashboard;
