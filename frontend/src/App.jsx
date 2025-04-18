import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./component/Home/Home.jsx";
import BhaiChai from "./component/BayChai/Bhaichai.jsx"
import "./App.css"
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/bhaichai"  element={<BhaiChai/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

