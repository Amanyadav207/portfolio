import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Pages/Home/Navbar";
import Home from "./Pages/Home/Homescreen";

function NotFound() {
  return (
    <section className="section" style={{ paddingTop: "10rem" }}>
      <div className="shell">
        <span className="section__index">404</span>
        <h1 className="section__title">Page not found</h1>
        <p className="section__sub">
          That route doesn't exist. <a href="/">Head back home</a>.
        </p>
      </div>
    </section>
  );
}

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
