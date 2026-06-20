import "./App.css";

function App() {
  return (
    <div className="app">
      <div className="weather-card">
        <h1>AI Weather Prediction</h1>

        <h2>Pune</h2>

        <div className="temperature">31°C</div>

        <p className="condition">Clear Sky</p>

        <div className="details">
          <p>
            <span>Humidity</span>
            <span>70%</span>
          </p>
          <p>
            <span>Wind Speed</span>
            <span>1012 hPa</span>
          </p>
          <p>
            <span>Wind speed</span>
            <span>12km/h</span>
          </p>

        </div>
      </div>
    </div>
  );
}

export default App;