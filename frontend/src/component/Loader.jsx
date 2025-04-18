import React from "react";
import "./Loader.css";
import angerGit from "../assets/anglerGit.png";
const Loader = () => {
  return (
    <>
      
      <div className="loader-container">
        <center>
        <img src={angerGit} alt="notloadimage" className="angerImg" />
      </center>
      <div className="spinner"></div>
      </div>
    </>
  );
};

export default Loader;
