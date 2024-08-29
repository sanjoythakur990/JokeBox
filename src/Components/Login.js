import React, { useState, useContext } from "react";
import axios from "axios";
import UserContext from "../Context/UserContext";
import { useNavigate } from "react-router-dom";
import "./login.css"; // Assuming you'll add custom styles in this CSS file

const Login = () => {
  const [user, setUser] = useState({ email: "", password: "" });
  let { email, password } = user;
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { setToken } = useContext(UserContext);
  let navigate = useNavigate();

  function updateUser(e) {
    let key = e.target.name;
    let value = e.target.value;
    setUser({ ...user, [key]: value });
  }

  async function handleLogin(e) {
    e.preventDefault();

    // validations
    if (!email || !password) alert("Please fill all the details");

    try {
      let response = await axios.post("https://instagram-express-app.vercel.app/api/auth/login", {
        email,
        password
      });
      console.log("Success", response.data);
      setSuccessMessage(response.data.message);
      setToken(response.data.data.token);
      localStorage.setItem("token", response.data.data.token);
      setErrorMessage("");
      setUser({ email: "", password: "" });
      alert(response.data.message);
      navigate("/dashboard");
    } catch (err) {
      console.log("Error", err);
      setErrorMessage(err.response.data.message);
      setSuccessMessage("");
    }
  }

  return (
    <div className="login-container">
      <div className="login-form">
        <h1>Log In</h1>
        {successMessage && <div className="success-message">{successMessage}</div>}
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <form onSubmit={handleLogin}>
          <input 
            type="email" 
            placeholder="Enter Email" 
            name="email" 
            value={email} 
            onChange={updateUser} 
            className="form-input"
          />
          <input 
            type="password" 
            placeholder="Enter Password" 
            name="password" 
            value={password} 
            onChange={updateUser} 
            className="form-input"
          />
          <button type="submit" className="login-button">Log In</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
