import { useState } from "react";

import "./App.css";

import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import WeatherDetails from "./components/WeatherDetails";
import Forecast from "./components/Forecast";

function App() {

  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={darkMode ? "app dark" : "app"}>

      <div className="navbar">
        <h1 className="logo">
          
        </h1>

        <button
          className="theme-btn"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? "☀️" : "🌙"}
        </button>
      </div>

      <div className="dashboard">

        <h1 className="title">
          AI Weather Prediction
        </h1>

        <SearchBar />

        <WeatherCard />

        <WeatherDetails />

        <Forecast />

      </div>
    </div>
  );
}

export default App;