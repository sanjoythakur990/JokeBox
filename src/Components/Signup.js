import React, { useState, useContext } from "react";
import axios from "axios";
import UserContext from "../Context/UserContext";
import { useNavigate } from "react-router-dom";
import "./signup.css"; // Assuming you'll add custom styles in this CSS file

const Signup = () => {
  const [user, setUser] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  let { name, email, password, confirmPassword } = user;
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { setToken } = useContext(UserContext);
  let navigate = useNavigate();

  function updateUser(e) {
    let key = e.target.name;
    let value = e.target.value;
    setUser({ ...user, [key]: value });
  }

  async function handleSignUp(e) {
    e.preventDefault();

    // validations
    if (!name || !email || !password || !confirmPassword) alert("Please fill all the details");
    else if (password !== confirmPassword) alert("Passwords do not match");

    try {
      let response = await axios.post("https://instagram-express-app.vercel.app/api/auth/signup", {
        name, email, password // concise form
      });
      console.log("Success", response.data);
      setSuccessMessage(response.data.message);
      setToken(response.data.data.token);
      localStorage.setItem("token", response.data.data.token);
      setErrorMessage("");
      setUser({ name: "", email: "", password: "", confirmPassword: "" });
      alert(response.data.message);
      navigate("/login");
    } catch (err) {
      console.log("Error", err);
      setErrorMessage(err.response.data.message);
      setSuccessMessage("");
    }
  }

  return (
    <div className="signup-container">
      <div className="signup-form">
        <h1>Create an Account</h1>
        {successMessage && <div className="success-message">{successMessage}</div>}
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <form onSubmit={handleSignUp}>
          <input 
            type="text" 
            placeholder="Enter Name" 
            name="name" 
            value={name} 
            onChange={updateUser} 
            className="form-input"
          />
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
          <input 
            type="password" 
            placeholder="Confirm Password" 
            name="confirmPassword" 
            value={confirmPassword} 
            onChange={updateUser} 
            className="form-input"
          />
          <button type="submit" className="signup-button">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
