import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import {
  FaArrowLeft,
  FaRobot,
  FaLocationDot,
  FaTemperatureHalf,
  FaCloudRain,
  FaWind,
  FaCircleCheck,
  FaLightbulb,
  FaArrowTrendUp,
  FaArrowTrendDown,
  FaGaugeHigh,
} from "react-icons/fa6";

import { WeatherContext } from "../context/WeatherContext";

function Prediction() {
  const navigate = useNavigate();

  const { weather, prediction, predictionLoading, theme } =
    useContext(WeatherContext);

  const isDark = theme === "dark";

  /*
   * ==========================================
   * NO PREDICTION YET
   * ==========================================
   */

  if (!prediction && !predictionLoading) {
    return (
      <div
        className={`min-h-screen p-5 sm:p-8 lg:p-10 ${
          isDark
            ? "bg-[#0F172A] text-white"
            : "bg-gradient-to-br from-pink-50 via-white to-purple-50 text-slate-800"
        }`}
      >
        <div className="max-w-7xl mx-auto">
          {/* Back */}

          <button
            onClick={() => navigate("/")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
              isDark
                ? "bg-slate-900 text-slate-300 hover:bg-slate-800"
                : "bg-white text-slate-600 border border-pink-100 hover:bg-pink-50 shadow-sm"
            }`}
          >
            <FaArrowLeft />
            Back to Dashboard
          </button>

          {/* Empty State */}

          <div
            className={`mt-10 min-h-[70vh] rounded-[2rem] flex items-center justify-center text-center p-8 ${
              isDark
                ? "bg-slate-900 border border-white/10"
                : "bg-white/80 border border-pink-100 shadow-lg"
            }`}
          >
            <div className="max-w-lg">
              <div
                className={`mx-auto w-24 h-24 rounded-3xl flex items-center justify-center ${
                  isDark
                    ? "bg-violet-500/10 border border-violet-500/20"
                    : "bg-pink-100"
                }`}
              >
                <FaRobot
                  className={`text-4xl ${
                    isDark ? "text-violet-400" : "text-pink-500"
                  }`}
                />
              </div>

              <h1
                className={`text-3xl sm:text-4xl font-bold mt-8 ${
                  isDark ? "text-white" : "text-slate-800"
                }`}
              >
                No Prediction Yet
              </h1>

              <p
                className={`mt-4 leading-7 ${
                  isDark ? "text-slate-400" : "text-slate-500"
                }`}
              >
                Search for a city from the dashboard and our WeatherAI
                Prediction Engine will generate a prediction for the next day.
              </p>

              <button
                onClick={() => navigate("/")}
                className="mt-8 px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-pink-400 via-pink-500 to-purple-400 hover:scale-105 transition-all shadow-lg"
              >
                Search a City
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /*
   * ==========================================
   * LOADING
   * ==========================================
   */

  if (predictionLoading) {
    return (
      <div
        className={`min-h-screen p-5 sm:p-8 lg:p-10 ${
          isDark
            ? "bg-[#0F172A]"
            : "bg-gradient-to-br from-pink-50 via-white to-purple-50"
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <button
            onClick={() => navigate("/")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl ${
              isDark
                ? "bg-slate-900 text-slate-300"
                : "bg-white text-slate-600 border border-pink-100"
            }`}
          >
            <FaArrowLeft />
            Back to Dashboard
          </button>

          <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div
              className={`lg:col-span-2 h-[500px] rounded-[2rem] animate-pulse ${
                isDark ? "bg-slate-900" : "bg-white"
              }`}
            />

            <div
              className={`h-[500px] rounded-[2rem] animate-pulse ${
                isDark ? "bg-slate-900" : "bg-white"
              }`}
            />
          </div>
        </div>
      </div>
    );
  }

  /*
   * ==========================================
   * API DATA
   * ==========================================
   */

  const data = prediction?.prediction || prediction;

  const currentTemperature =
    prediction?.current_temperature ?? weather?.temperature ?? 0;

  const predictedTemperature = data?.predicted_temperature ?? 0;

  const temperatureChange =
    data?.temperature_change ?? predictedTemperature - currentTemperature;

  const rainProbability = data?.rain_probability ?? 0;

  const confidence = data?.confidence ?? 0;

  const condition =
    data?.predicted_condition || weather?.condition || "Unknown";

  const recommendation =
    data?.recommendation ||
    "Weather conditions are expected to remain relatively stable.";

  return (
    <div
      className={`min-h-screen p-5 sm:p-8 lg:p-10 ${
        isDark
          ? "bg-[#0F172A] text-white"
          : "bg-gradient-to-br from-pink-50 via-white to-purple-50 text-slate-800"
      }`}
    >
      <div className="max-w-7xl mx-auto">
        {/* =====================================
            TOP BAR
        ===================================== */}

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <button
            onClick={() => navigate("/")}
            className={`inline-flex items-center gap-2 w-fit px-4 py-2.5 rounded-xl transition-all ${
              isDark
                ? "bg-slate-900 border border-white/10 text-slate-300 hover:text-white hover:bg-slate-800"
                : "bg-white border border-pink-100 text-slate-600 hover:bg-pink-50 shadow-sm"
            }`}
          >
            <FaArrowLeft />
            Back to Dashboard
          </button>

          <div
            className={`inline-flex items-center gap-2 w-fit px-4 py-2 rounded-full ${
              isDark
                ? "bg-violet-500/10 border border-violet-400/20 text-violet-300"
                : "bg-pink-100 border border-pink-200 text-pink-600"
            }`}
          >
            <FaRobot />
            AI Prediction Engine
          </div>
        </div>

        {/* =====================================
            PAGE HEADER
        ===================================== */}

        <div className="mt-8">
          <p
            className={`text-sm uppercase tracking-[0.2em] font-semibold ${
              isDark ? "text-violet-400" : "text-pink-500"
            }`}
          >
            Tomorrow's Forecast
          </p>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mt-2">
            <div>
              <h1
                className={`text-4xl sm:text-5xl font-bold tracking-tight ${
                  isDark ? "text-white" : "text-slate-800"
                }`}
              >
                AI Weather Prediction
              </h1>

              <div
                className={`flex items-center gap-2 mt-3 ${
                  isDark ? "text-slate-400" : "text-slate-500"
                }`}
              >
                <FaLocationDot />

                <span>
                  {prediction?.city || weather?.city || "Selected Location"}
                  {prediction?.country || weather?.country
                    ? `, ${prediction?.country || weather?.country}`
                    : ""}
                </span>
              </div>
            </div>

            <div
              className={`text-sm ${
                isDark ? "text-slate-500" : "text-slate-400"
              }`}
            >
              Powered by WeatherAI
            </div>
          </div>
        </div>

        {/* =====================================
            MAIN GRID
        ===================================== */}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
          {/* ===================================
              MAIN PREDICTION
          =================================== */}

          <div
            className={`lg:col-span-2 relative overflow-hidden rounded-[2rem] p-6 sm:p-8 lg:p-10 ${
              isDark
                ? "bg-gradient-to-br from-slate-900 via-slate-900 to-violet-950/40 border border-white/10"
                : "bg-white border border-pink-100 shadow-lg"
            }`}
          >
            {/* Decorative circles */}

            <div
              className={`absolute -right-24 -top-24 w-72 h-72 rounded-full blur-3xl ${
                isDark ? "bg-violet-500/10" : "bg-pink-200/40"
              }`}
            />

            <div
              className={`absolute -left-24 -bottom-24 w-72 h-72 rounded-full blur-3xl ${
                isDark ? "bg-cyan-500/5" : "bg-purple-100/40"
              }`}
            />

            <div className="relative">
              <div className="flex items-center justify-between">
                <div>
                  <p
                    className={`text-sm ${
                      isDark ? "text-slate-400" : "text-slate-500"
                    }`}
                  >
                    Predicted conditions
                  </p>

                  <h2
                    className={`text-3xl sm:text-4xl font-bold mt-1 capitalize ${
                      isDark ? "text-white" : "text-slate-800"
                    }`}
                  >
                    {condition}
                  </h2>
                </div>

                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                    isDark
                      ? "bg-violet-500/10 text-violet-300"
                      : "bg-pink-100 text-pink-500"
                  }`}
                >
                  <FaRobot className="text-2xl" />
                </div>
              </div>

              {/* Temperature */}

              <div className="flex flex-col sm:flex-row sm:items-center gap-8 mt-10">
                <div>
                  <p
                    className={`text-sm ${
                      isDark ? "text-slate-500" : "text-slate-400"
                    }`}
                  >
                    Expected temperature
                  </p>

                  <div className="flex items-start mt-1">
                    <span
                      className={`text-7xl sm:text-8xl font-bold tracking-tight ${
                        isDark ? "text-white" : "text-slate-800"
                      }`}
                    >
                      {predictedTemperature}
                    </span>

                    <span
                      className={`text-3xl mt-3 ${
                        isDark ? "text-slate-400" : "text-slate-500"
                      }`}
                    >
                      °C
                    </span>
                  </div>
                </div>

                <div
                  className={`flex items-center gap-3 px-4 py-3 rounded-2xl w-fit ${
                    temperatureChange > 0
                      ? isDark
                        ? "bg-orange-500/10 text-orange-300"
                        : "bg-orange-50 text-orange-600"
                      : temperatureChange < 0
                        ? isDark
                          ? "bg-cyan-500/10 text-cyan-300"
                          : "bg-cyan-50 text-cyan-600"
                        : isDark
                          ? "bg-slate-800 text-slate-300"
                          : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {temperatureChange > 0 ? (
                    <FaArrowTrendUp />
                  ) : temperatureChange < 0 ? (
                    <FaArrowTrendDown />
                  ) : (
                    <FaTemperatureHalf />
                  )}

                  <div>
                    <p className="text-xs opacity-70">Compared to today</p>

                    <p className="font-semibold">
                      {temperatureChange > 0 ? "+" : ""}
                      {temperatureChange}°C
                    </p>
                  </div>
                </div>
              </div>

              {/* Confidence */}

              <div className="mt-10">
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center gap-2">
                    <FaCircleCheck
                      className={isDark ? "text-green-400" : "text-green-500"}
                    />

                    <span
                      className={`font-medium ${
                        isDark ? "text-slate-300" : "text-slate-600"
                      }`}
                    >
                      Prediction confidence
                    </span>
                  </div>

                  <span
                    className={`font-bold ${
                      isDark ? "text-green-400" : "text-green-600"
                    }`}
                  >
                    {confidence}%
                  </span>
                </div>

                <div
                  className={`h-3 rounded-full overflow-hidden ${
                    isDark ? "bg-slate-800" : "bg-slate-100"
                  }`}
                >
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-green-400 to-emerald-500 transition-all duration-700"
                    style={{
                      width: `${Math.min(confidence, 100)}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* ===================================
              RAIN CARD
          =================================== */}

          <div
            className={`rounded-[2rem] p-6 sm:p-8 ${
              isDark
                ? "bg-slate-900 border border-white/10"
                : "bg-white border border-pink-100 shadow-lg"
            }`}
          >
            <div
              className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                isDark
                  ? "bg-blue-500/10 text-blue-400"
                  : "bg-blue-50 text-blue-500"
              }`}
            >
              <FaCloudRain className="text-2xl" />
            </div>

            <p
              className={`mt-8 text-sm ${
                isDark ? "text-slate-400" : "text-slate-500"
              }`}
            >
              Rain probability
            </p>

            <div className="flex items-end gap-1 mt-2">
              <span
                className={`text-6xl font-bold ${
                  isDark ? "text-white" : "text-slate-800"
                }`}
              >
                {rainProbability}
              </span>

              <span
                className={`text-2xl mb-2 ${
                  isDark ? "text-slate-400" : "text-slate-500"
                }`}
              >
                %
              </span>
            </div>

            <div
              className={`h-2 rounded-full mt-7 overflow-hidden ${
                isDark ? "bg-slate-800" : "bg-slate-100"
              }`}
            >
              <div
                className="h-full rounded-full bg-blue-500"
                style={{
                  width: `${Math.min(rainProbability, 100)}%`,
                }}
              />
            </div>

            <p
              className={`mt-5 text-sm leading-6 ${
                isDark ? "text-slate-400" : "text-slate-500"
              }`}
            >
              {rainProbability >= 70
                ? "High chance of rain. Consider carrying an umbrella."
                : rainProbability >= 40
                  ? "Moderate chance of rain. Keep an eye on the forecast."
                  : "Low chance of rain. Outdoor activities should be comfortable."}
            </p>
          </div>
        </div>

        {/* =====================================
            INSIGHTS
        ===================================== */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {/* Wind */}

          <div
            className={`rounded-[2rem] p-6 sm:p-7 ${
              isDark
                ? "bg-slate-900 border border-white/10"
                : "bg-white border border-pink-100 shadow-lg"
            }`}
          >
            <div className="flex items-center gap-4">
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  isDark
                    ? "bg-emerald-500/10 text-emerald-400"
                    : "bg-emerald-50 text-emerald-500"
                }`}
              >
                <FaWind />
              </div>

              <div>
                <p
                  className={`text-sm ${
                    isDark ? "text-slate-400" : "text-slate-500"
                  }`}
                >
                  Current wind
                </p>

                <p
                  className={`text-xl font-bold ${
                    isDark ? "text-white" : "text-slate-800"
                  }`}
                >
                  {weather?.wind_speed ?? "--"} m/s
                </p>
              </div>
            </div>
          </div>

          {/* Model */}

          <div
            className={`rounded-[2rem] p-6 sm:p-7 ${
              isDark
                ? "bg-slate-900 border border-white/10"
                : "bg-white border border-pink-100 shadow-lg"
            }`}
          >
            <div className="flex items-center gap-4">
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  isDark
                    ? "bg-violet-500/10 text-violet-400"
                    : "bg-violet-50 text-violet-500"
                }`}
              >
                <FaGaugeHigh />
              </div>

              <div>
                <p
                  className={`text-sm ${
                    isDark ? "text-slate-400" : "text-slate-500"
                  }`}
                >
                  Prediction model
                </p>

                <p
                  className={`font-bold ${
                    isDark ? "text-white" : "text-slate-800"
                  }`}
                >
                  {data?.model || "WeatherAI Prediction Engine"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* =====================================
            AI RECOMMENDATION
        ===================================== */}

        <div
          className={`mt-6 rounded-[2rem] p-6 sm:p-8 ${
            isDark
              ? "bg-gradient-to-r from-violet-500/10 via-slate-900 to-slate-900 border border-violet-500/20"
              : "bg-gradient-to-r from-pink-50 via-white to-purple-50 border border-pink-100 shadow-lg"
          }`}
        >
          <div className="flex flex-col sm:flex-row gap-5">
            <div
              className={`shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center ${
                isDark
                  ? "bg-violet-500/15 text-violet-300"
                  : "bg-pink-100 text-pink-500"
              }`}
            >
              <FaLightbulb className="text-2xl" />
            </div>

            <div>
              <p
                className={`text-sm uppercase tracking-widest font-semibold ${
                  isDark ? "text-violet-400" : "text-pink-500"
                }`}
              >
                AI Recommendation
              </p>

              <p
                className={`text-lg sm:text-xl leading-8 mt-2 ${
                  isDark ? "text-slate-200" : "text-slate-700"
                }`}
              >
                {recommendation}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Prediction;
