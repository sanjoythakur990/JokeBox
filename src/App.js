import React, {useState} from "react";
import Signup from "./Components/Signup";
import "./style.css"
import Login from "./Components/Login";
import Dashboard from "./Components/Dashboard";
import { Routes, Route } from "react-router-dom";
import Home from "./Components/Home";




const App=()=>{
  // const [token, setToken] =useState("")
  return (
    <div>
      {/* <Signup setToken={setToken}/>
      <Login setToken={setToken}/>
      <Dashboard token={token}/> */}

      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/register" element={<Signup />} />
        <Route path="/login" element={<Login />} />           {/* we no longer need props because we are passing token from UserContext*/}
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  )
}

export default App