import { useContext } from "react";
import { WeatherContext } from "../context/WeatherContext";

import {
  FaRobot,
  FaBrain,
  FaTemperatureHalf,
  FaCloudSun,
  FaShieldHalved,
  FaArrowTrendUp,
} from "react-icons/fa6";

function AIPrediction() {
  const { theme } = useContext(WeatherContext);

  const isDark = theme === "dark";

  // Dummy Data (Replace with API later)

  const prediction = {
    temperature: 29,
    condition: "Sunny",
    confidence: 96,
    summary:
      "Based on previous weather patterns and machine learning analysis, tomorrow is expected to remain sunny with pleasant temperatures and low chances of rainfall.",
  };

  return (
    <div className="flex-1 overflow-y-auto p-6 lg:p-8">
      {/* ================= Header ================= */}

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div className="flex items-center gap-5">
          <div
            className={`w-16 h-16 rounded-3xl flex items-center justify-center shadow-lg
            ${
              isDark
                ? "bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/20"
                : "bg-gradient-to-br from-pink-400 via-sky-400 to-blue-500"
            }`}
          >
            <FaRobot
              className={`text-3xl ${isDark ? "text-cyan-400" : "text-white"}`}
            />
          </div>

          <div>
            <h1
              className={`text-4xl font-bold ${
                isDark ? "text-white" : "text-slate-800"
              }`}
            >
              AI Prediction
            </h1>

            <p
              className={`mt-2 ${isDark ? "text-slate-400" : "text-slate-500"}`}
            >
              Machine Learning powered weather forecast.
            </p>
          </div>
        </div>
      </div>

      {/* ================= Hero Cards ================= */}

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-10">
        {/* Prediction Card */}

        <div
          className={`xl:col-span-2 rounded-3xl p-8 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1
          ${
            isDark
              ? "bg-slate-900/80 border border-white/10"
              : "bg-white/80 border border-blue-100 shadow-md"
          }`}
        >
          <div className="flex items-center justify-between flex-wrap gap-6">
            <div>
              <div
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm
                ${
                  isDark
                    ? "bg-cyan-500/10 text-cyan-400"
                    : "bg-sky-100 text-sky-600"
                }`}
              >
                <FaBrain />
                AI Generated Forecast
              </div>

              <h2
                className={`text-6xl font-bold mt-8 ${
                  isDark ? "text-white" : "text-slate-800"
                }`}
              >
                {prediction.temperature}°
              </h2>

              <p
                className={`text-2xl mt-2 font-semibold ${
                  isDark ? "text-slate-300" : "text-slate-600"
                }`}
              >
                {prediction.condition}
              </p>
            </div>

            <div
              className={`w-28 h-28 rounded-full flex items-center justify-center
              ${isDark ? "bg-yellow-400/10" : "bg-yellow-100"}`}
            >
              <FaCloudSun className="text-yellow-400 text-6xl" />
            </div>
          </div>

          <div
            className={`mt-8 pt-6 border-t ${
              isDark ? "border-white/10" : "border-slate-200"
            }`}
          >
            <p
              className={`leading-8 ${
                isDark ? "text-slate-400" : "text-slate-600"
              }`}
            >
              {prediction.summary}
            </p>
          </div>
        </div>

        {/* Confidence Card */}

        <div
          className={`rounded-3xl p-8 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1
          ${
            isDark
              ? "bg-slate-900/80 border border-white/10"
              : "bg-white/80 border border-blue-100 shadow-md"
          }`}
        >
          <div
            className={`w-16 h-16 rounded-3xl flex items-center justify-center
            ${isDark ? "bg-cyan-500/10" : "bg-green-100"}`}
          >
            <FaShieldHalved
              className={`text-3xl ${
                isDark ? "text-cyan-400" : "text-green-500"
              }`}
            />
          </div>

          <p
            className={`mt-8 text-sm uppercase tracking-wider
            ${isDark ? "text-slate-500" : "text-slate-500"}`}
          >
            Prediction Confidence
          </p>

          <h2
            className={`text-6xl font-bold mt-2 ${
              isDark ? "text-white" : "text-slate-800"
            }`}
          >
            {prediction.confidence}%
          </h2>

          <div
            className={`mt-8 h-3 rounded-full overflow-hidden
            ${isDark ? "bg-slate-800" : "bg-slate-200"}`}
          >
            <div
              className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-500"
              style={{
                width: `${prediction.confidence}%`,
              }}
            />
          </div>

          <div className="flex items-center gap-2 mt-8 text-green-500">
            <FaArrowTrendUp />

            <span className="font-medium">High Accuracy Forecast</span>
          </div>
        </div>
      </div>

      {/* ================= Weather Details ================= */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-8">
        {[
          {
            title: "Humidity",
            value: "62%",
            icon: <FaCloudSun />,
            color: isDark ? "text-cyan-400" : "text-sky-500",
            bg: isDark ? "bg-cyan-500/10" : "bg-sky-100",
          },
          {
            title: "Pressure",
            value: "1016 hPa",
            icon: <FaTemperatureHalf />,
            color: "text-orange-500",
            bg: isDark ? "bg-orange-500/10" : "bg-orange-100",
          },
          {
            title: "Wind Speed",
            value: "12 km/h",
            icon: <FaArrowTrendUp />,
            color: "text-emerald-500",
            bg: isDark ? "bg-emerald-500/10" : "bg-emerald-100",
          },
          {
            title: "Rain Chance",
            value: "5%",
            icon: <FaCloudSun />,
            color: "text-blue-500",
            bg: isDark ? "bg-blue-500/10" : "bg-blue-100",
          },
        ].map((item, index) => (
          <div
            key={index}
            className={`rounded-3xl p-6 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:shadow-xl ${
              isDark
                ? "bg-slate-900/80 border border-white/10"
                : "bg-white/80 border border-blue-100 shadow-md"
            }`}
          >
            <div
              className={`w-14 h-14 rounded-2xl flex items-center justify-center ${item.bg}`}
            >
              <div className={`text-2xl ${item.color}`}>{item.icon}</div>
            </div>

            <p
              className={`mt-6 text-sm ${
                isDark ? "text-slate-400" : "text-slate-500"
              }`}
            >
              {item.title}
            </p>

            <h3
              className={`text-3xl font-bold mt-2 ${
                isDark ? "text-white" : "text-slate-800"
              }`}
            >
              {item.value}
            </h3>
          </div>
        ))}
      </div>

      {/* ================= AI Analysis ================= */}

      <div className="grid xl:grid-cols-3 gap-6 mt-8">
        {/* Analysis */}

        <div
          className={`xl:col-span-2 rounded-3xl p-8 backdrop-blur-xl ${
            isDark
              ? "bg-slate-900/80 border border-white/10"
              : "bg-white/80 border border-blue-100 shadow-md"
          }`}
        >
          <div className="flex items-center gap-3">
            <div
              className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                isDark ? "bg-cyan-500/10" : "bg-sky-100"
              }`}
            >
              <FaBrain
                className={`text-2xl ${
                  isDark ? "text-cyan-400" : "text-sky-500"
                }`}
              />
            </div>

            <div>
              <h2
                className={`text-2xl font-bold ${
                  isDark ? "text-white" : "text-slate-800"
                }`}
              >
                AI Analysis
              </h2>

              <p className={`${isDark ? "text-slate-400" : "text-slate-500"}`}>
                Machine Learning Insights
              </p>
            </div>
          </div>

          <div
            className={`mt-8 space-y-5 leading-8 ${
              isDark ? "text-slate-400" : "text-slate-600"
            }`}
          >
            <p>
              • Weather patterns indicate stable atmospheric pressure throughout
              the day.
            </p>

            <p>
              • Temperature is expected to remain comfortable with low
              fluctuations.
            </p>

            <p>
              • Rain probability remains very low based on previous historical
              data.
            </p>

            <p>• Wind conditions are suitable for outdoor activities.</p>
          </div>
        </div>

        {/* Recommendation */}

        <div
          className={`rounded-3xl p-8 backdrop-blur-xl ${
            isDark
              ? "bg-slate-900/80 border border-white/10"
              : "bg-white/80 border border-blue-100 shadow-md"
          }`}
        >
          <div
            className={`w-16 h-16 rounded-3xl flex items-center justify-center ${
              isDark ? "bg-yellow-400/10" : "bg-yellow-100"
            }`}
          >
            <FaCloudSun className="text-yellow-500 text-3xl" />
          </div>

          <h2
            className={`text-2xl font-bold mt-6 ${
              isDark ? "text-white" : "text-slate-800"
            }`}
          >
            Recommendation
          </h2>

          <p
            className={`mt-5 leading-8 ${
              isDark ? "text-slate-400" : "text-slate-600"
            }`}
          >
            Carry sunglasses if you're heading outside. The weather is expected
            to stay pleasant throughout the day with minimal rainfall and
            moderate winds, making it suitable for travel, commuting, and
            outdoor activities.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AIPrediction;
