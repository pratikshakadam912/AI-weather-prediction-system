import { useContext, useMemo } from "react";
import { Link } from "react-router-dom";

import {
  FaArrowLeft,
  FaChartLine,
  FaTemperatureHalf,
  FaCloudRain,
  FaRobot,
  FaWind,
  FaDroplet,
  FaMagnifyingGlass,
  FaArrowTrendUp,
  FaArrowTrendDown,
  FaGaugeHigh,
  FaCircleCheck,
} from "react-icons/fa6";

import { WeatherContext } from "../context/WeatherContext";

function Analytics() {
  const { weather, prediction, theme } = useContext(WeatherContext);

  const isDark = theme === "dark";

  /*
   * --------------------------------------------------
   * Analytics data
   * --------------------------------------------------
   */

  const analytics = useMemo(() => {
    const currentTemp = Number(weather?.temperature ?? 0);
    const predictedTemp = Number(
      prediction?.prediction?.predicted_temperature ??
        prediction?.predicted_temperature ??
        currentTemp,
    );

    const rainProbability = Number(
      prediction?.prediction?.rain_probability ??
        prediction?.rain_probability ??
        0,
    );

    const confidence = Number(
      prediction?.prediction?.confidence ?? prediction?.confidence ?? 0,
    );

    const temperatureChange = predictedTemp - currentTemp;

    return {
      currentTemp,
      predictedTemp,
      rainProbability,
      confidence,
      temperatureChange,
      humidity: weather?.humidity ?? 0,
      wind: weather?.wind_speed ?? 0,
      pressure: weather?.pressure ?? 0,
      condition:
        prediction?.prediction?.predicted_condition ??
        prediction?.predicted_condition ??
        weather?.condition ??
        "Unknown",
    };
  }, [weather, prediction]);

  /*
   * --------------------------------------------------
   * Empty state
   * --------------------------------------------------
   */

  if (!weather && !prediction) {
    return (
      <div
        className={`min-h-screen p-6 lg:p-10 ${
          isDark
            ? "bg-[#0F172A] text-white"
            : "bg-gradient-to-br from-pink-50 via-white to-purple-50 text-slate-800"
        }`}
      >
        <div className="max-w-5xl mx-auto">
          <Link
            to="/"
            className={`inline-flex items-center gap-2 mb-10 transition ${
              isDark
                ? "text-slate-400 hover:text-cyan-400"
                : "text-slate-500 hover:text-pink-500"
            }`}
          >
            <FaArrowLeft />
            Back to Dashboard
          </Link>

          <div
            className={`rounded-[2rem] p-10 sm:p-16 text-center border ${
              isDark
                ? "bg-slate-900 border-white/10"
                : "bg-white border-pink-100 shadow-xl"
            }`}
          >
            <div
              className={`mx-auto w-24 h-24 rounded-3xl flex items-center justify-center ${
                isDark
                  ? "bg-cyan-500/10"
                  : "bg-gradient-to-br from-pink-100 to-purple-100"
              }`}
            >
              <FaChartLine
                className={`text-4xl ${
                  isDark ? "text-cyan-400" : "text-pink-500"
                }`}
              />
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold mt-7">
              No Analytics Yet
            </h1>

            <p
              className={`max-w-md mx-auto mt-4 ${
                isDark ? "text-slate-400" : "text-slate-500"
              }`}
            >
              Search for a city first. Once weather and AI prediction data are
              available, your analytics will appear here.
            </p>

            <Link
              to="/"
              className={`inline-flex items-center gap-2 mt-8 px-6 py-3 rounded-2xl font-semibold text-white transition hover:-translate-y-1 ${
                isDark
                  ? "bg-cyan-500 hover:bg-cyan-600"
                  : "bg-gradient-to-r from-pink-400 to-purple-400 shadow-lg"
              }`}
            >
              <FaMagnifyingGlass />
              Search Weather
            </Link>
          </div>
        </div>
      </div>
    );
  }

  /*
   * --------------------------------------------------
   * Main analytics UI
   * --------------------------------------------------
   */

  return (
    <div
      className={`min-h-screen p-5 sm:p-6 lg:p-10 transition-colors duration-500 ${
        isDark
          ? "bg-[#0F172A] text-white"
          : "bg-gradient-to-br from-pink-50 via-white to-purple-50 text-slate-800"
      }`}
    >
      <div className="max-w-7xl mx-auto">
        {/* ================= HEADER ================= */}

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <Link
              to="/"
              className={`inline-flex items-center gap-2 mb-5 transition ${
                isDark
                  ? "text-slate-400 hover:text-cyan-400"
                  : "text-slate-500 hover:text-pink-500"
              }`}
            >
              <FaArrowLeft />
              Back to Dashboard
            </Link>

            <div className="flex items-center gap-4">
              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                  isDark
                    ? "bg-cyan-500/10 border border-cyan-500/20"
                    : "bg-gradient-to-br from-pink-400 to-purple-400 shadow-lg"
                }`}
              >
                <FaChartLine
                  className={`text-2xl ${
                    isDark ? "text-cyan-400" : "text-white"
                  }`}
                />
              </div>

              <div>
                <p
                  className={`text-xs uppercase tracking-[0.25em] font-semibold ${
                    isDark ? "text-cyan-400" : "text-pink-500"
                  }`}
                >
                  Weather Intelligence
                </p>

                <h1 className="text-3xl sm:text-4xl font-bold mt-1">
                  Analytics
                </h1>
              </div>
            </div>
          </div>

          {/* Current location */}

          <div
            className={`px-5 py-3 rounded-2xl flex items-center gap-3 ${
              isDark
                ? "bg-slate-900 border border-white/10"
                : "bg-white border border-pink-100 shadow-sm"
            }`}
          >
            <span className="text-lg">📍</span>

            <div>
              <p
                className={`text-xs ${
                  isDark ? "text-slate-500" : "text-slate-400"
                }`}
              >
                Analyzing
              </p>

              <p className="font-semibold">
                {weather?.city}, {weather?.country}
              </p>
            </div>
          </div>
        </div>

        {/* ================= OVERVIEW ================= */}

        <div className="mt-10">
          <div className="mb-5">
            <p
              className={`text-sm font-semibold uppercase tracking-widest ${
                isDark ? "text-slate-500" : "text-slate-400"
              }`}
            >
              Overview
            </p>

            <h2 className="text-2xl font-bold mt-1">Weather Performance</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
            <AnalyticsCard
              icon={<FaTemperatureHalf />}
              label="Current Temperature"
              value={`${analytics.currentTemp}°C`}
              subtitle={weather?.description || "Current conditions"}
              iconStyle={
                isDark
                  ? "bg-orange-500/10 text-orange-400"
                  : "bg-orange-100 text-orange-500"
              }
              theme={theme}
            />

            <AnalyticsCard
              icon={<FaCloudRain />}
              label="Rain Probability"
              value={`${analytics.rainProbability}%`}
              subtitle={
                analytics.rainProbability >= 60
                  ? "High chance"
                  : analytics.rainProbability >= 30
                    ? "Moderate chance"
                    : "Low chance"
              }
              iconStyle={
                isDark
                  ? "bg-blue-500/10 text-blue-400"
                  : "bg-blue-100 text-blue-500"
              }
              theme={theme}
            />

            <AnalyticsCard
              icon={<FaRobot />}
              label="AI Confidence"
              value={`${analytics.confidence}%`}
              subtitle="Prediction reliability"
              iconStyle={
                isDark
                  ? "bg-purple-500/10 text-purple-400"
                  : "bg-purple-100 text-purple-500"
              }
              theme={theme}
            />

            <AnalyticsCard
              icon={<FaWind />}
              label="Wind Speed"
              value={`${analytics.wind} m/s`}
              subtitle={
                analytics.wind > 8
                  ? "Strong winds"
                  : analytics.wind > 4
                    ? "Moderate wind"
                    : "Light breeze"
              }
              iconStyle={
                isDark
                  ? "bg-emerald-500/10 text-emerald-400"
                  : "bg-emerald-100 text-emerald-500"
              }
              theme={theme}
            />
          </div>
        </div>

        {/* ================= TEMPERATURE ANALYSIS ================= */}

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-8">
          {/* Temperature comparison */}

          <div
            className={`rounded-3xl p-6 sm:p-8 border ${
              isDark
                ? "bg-slate-900 border-white/10"
                : "bg-white border-pink-100 shadow-lg"
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p
                  className={`text-sm ${
                    isDark ? "text-slate-400" : "text-slate-500"
                  }`}
                >
                  Temperature Analysis
                </p>

                <h2 className="text-2xl font-bold mt-1">Today vs Tomorrow</h2>
              </div>

              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                  isDark
                    ? "bg-orange-500/10 text-orange-400"
                    : "bg-orange-100 text-orange-500"
                }`}
              >
                <FaTemperatureHalf />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-8">
              <div
                className={`rounded-2xl p-5 ${
                  isDark ? "bg-slate-800" : "bg-slate-50"
                }`}
              >
                <p
                  className={`text-sm ${
                    isDark ? "text-slate-400" : "text-slate-500"
                  }`}
                >
                  Current
                </p>

                <p className="text-4xl font-bold mt-2">
                  {analytics.currentTemp}°
                </p>

                <p
                  className={`text-sm mt-2 ${
                    isDark ? "text-slate-500" : "text-slate-400"
                  }`}
                >
                  Celsius
                </p>
              </div>

              <div
                className={`rounded-2xl p-5 ${
                  isDark ? "bg-slate-800" : "bg-slate-50"
                }`}
              >
                <p
                  className={`text-sm ${
                    isDark ? "text-slate-400" : "text-slate-500"
                  }`}
                >
                  Predicted
                </p>

                <p className="text-4xl font-bold mt-2">
                  {analytics.predictedTemp}°
                </p>

                <p
                  className={`text-sm mt-2 ${
                    analytics.temperatureChange > 0
                      ? "text-orange-500"
                      : analytics.temperatureChange < 0
                        ? "text-cyan-500"
                        : "text-emerald-500"
                  }`}
                >
                  {analytics.temperatureChange > 0
                    ? `+${analytics.temperatureChange}° increase`
                    : analytics.temperatureChange < 0
                      ? `${analytics.temperatureChange}° decrease`
                      : "No change"}
                </p>
              </div>
            </div>

            {/* Comparison bar */}

            <div className="mt-7">
              <div className="flex justify-between text-sm mb-2">
                <span className={isDark ? "text-slate-400" : "text-slate-500"}>
                  Temperature comparison
                </span>

                <span className="font-semibold">
                  {Math.abs(analytics.temperatureChange)}°
                </span>
              </div>

              <div
                className={`h-3 rounded-full overflow-hidden ${
                  isDark ? "bg-slate-800" : "bg-slate-200"
                }`}
              >
                <div
                  className="h-full rounded-full bg-gradient-to-r from-orange-400 via-pink-400 to-purple-400"
                  style={{
                    width: `${Math.min(
                      Math.abs(analytics.temperatureChange) * 15 + 20,
                      100,
                    )}%`,
                  }}
                />
              </div>
            </div>
          </div>

          {/* AI Analysis */}

          <div
            className={`rounded-3xl p-6 sm:p-8 border ${
              isDark
                ? "bg-slate-900 border-white/10"
                : "bg-white border-pink-100 shadow-lg"
            }`}
          >
            <div className="flex items-center gap-4">
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                  isDark
                    ? "bg-purple-500/10 text-purple-400"
                    : "bg-purple-100 text-purple-500"
                }`}
              >
                <FaRobot className="text-xl" />
              </div>

              <div>
                <p
                  className={`text-sm ${
                    isDark ? "text-slate-400" : "text-slate-500"
                  }`}
                >
                  AI Prediction Engine
                </p>

                <h2 className="text-2xl font-bold">Prediction Insights</h2>
              </div>
            </div>

            <div className="mt-8">
              <div
                className={`flex items-center justify-between p-5 rounded-2xl ${
                  isDark ? "bg-slate-800" : "bg-slate-50"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                    <FaCircleCheck className="text-emerald-500" />
                  </div>

                  <div>
                    <p className="font-semibold">Prediction Confidence</p>

                    <p
                      className={`text-sm mt-1 ${
                        isDark ? "text-slate-400" : "text-slate-500"
                      }`}
                    >
                      AI model confidence score
                    </p>
                  </div>
                </div>

                <span className="text-2xl font-bold text-emerald-500">
                  {analytics.confidence}%
                </span>
              </div>

              <div className="mt-6">
                <div className="flex justify-between text-sm mb-2">
                  <span
                    className={isDark ? "text-slate-400" : "text-slate-500"}
                  >
                    Model confidence
                  </span>

                  <span className="font-semibold">{analytics.confidence}%</span>
                </div>

                <div
                  className={`h-3 rounded-full overflow-hidden ${
                    isDark ? "bg-slate-800" : "bg-slate-200"
                  }`}
                >
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400"
                    style={{
                      width: `${Math.min(analytics.confidence, 100)}%`,
                    }}
                  />
                </div>
              </div>

              <div
                className={`mt-6 p-5 rounded-2xl ${
                  isDark
                    ? "bg-purple-500/5 border border-purple-500/10"
                    : "bg-purple-50 border border-purple-100"
                }`}
              >
                <p
                  className={`text-sm ${
                    isDark ? "text-slate-300" : "text-slate-600"
                  }`}
                >
                  <span className="font-semibold">Predicted condition:</span>{" "}
                  {analytics.condition}
                </p>

                <p
                  className={`mt-2 text-sm ${
                    isDark ? "text-slate-400" : "text-slate-500"
                  }`}
                >
                  {prediction?.prediction?.recommendation ??
                    prediction?.recommendation ??
                    "AI analysis is based on the available weather data."}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ================= WEATHER METRICS ================= */}

        <div className="mt-8">
          <div className="mb-5">
            <p
              className={`text-sm font-semibold uppercase tracking-widest ${
                isDark ? "text-slate-500" : "text-slate-400"
              }`}
            >
              Environmental Data
            </p>

            <h2 className="text-2xl font-bold mt-1">Atmospheric Metrics</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <MetricCard
              icon={<FaDroplet />}
              title="Humidity"
              value={`${analytics.humidity}%`}
              percentage={analytics.humidity}
              theme={theme}
              gradient="from-blue-400 to-cyan-400"
            />

            <MetricCard
              icon={<FaGaugeHigh />}
              title="Pressure"
              value={`${analytics.pressure} hPa`}
              percentage={Math.min(
                Math.max(((analytics.pressure - 950) / 100) * 100, 0),
                100,
              )}
              theme={theme}
              gradient="from-orange-400 to-yellow-400"
            />

            <MetricCard
              icon={<FaWind />}
              title="Wind Speed"
              value={`${analytics.wind} m/s`}
              percentage={Math.min(analytics.wind * 10, 100)}
              theme={theme}
              gradient="from-emerald-400 to-green-400"
            />
          </div>
        </div>

        {/* ================= SUMMARY ================= */}

        <div
          className={`mt-8 rounded-3xl p-6 sm:p-8 border ${
            isDark
              ? "bg-gradient-to-r from-slate-900 to-slate-800 border-white/10"
              : "bg-gradient-to-r from-white to-pink-50 border-pink-100 shadow-lg"
          }`}
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <p
                className={`text-sm uppercase tracking-widest font-semibold ${
                  isDark ? "text-cyan-400" : "text-pink-500"
                }`}
              >
                AI Summary
              </p>

              <h2 className="text-2xl font-bold mt-2">
                Weather outlook for {weather?.city}
              </h2>

              <p
                className={`mt-3 max-w-2xl ${
                  isDark ? "text-slate-400" : "text-slate-500"
                }`}
              >
                Tomorrow is expected to be{" "}
                <span className="font-semibold">
                  {analytics.condition.toLowerCase()}
                </span>{" "}
                with a predicted temperature of{" "}
                <span className="font-semibold">
                  {analytics.predictedTemp}°C
                </span>
                . The AI model currently reports{" "}
                <span className="font-semibold">
                  {analytics.confidence}% confidence
                </span>
                .
              </p>
            </div>

            <div
              className={`flex-shrink-0 w-20 h-20 rounded-3xl flex items-center justify-center ${
                analytics.temperatureChange >= 0
                  ? isDark
                    ? "bg-orange-500/10 text-orange-400"
                    : "bg-orange-100 text-orange-500"
                  : isDark
                    ? "bg-cyan-500/10 text-cyan-400"
                    : "bg-cyan-100 text-cyan-500"
              }`}
            >
              {analytics.temperatureChange >= 0 ? (
                <FaArrowTrendUp className="text-3xl" />
              ) : (
                <FaArrowTrendDown className="text-3xl" />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/*
|--------------------------------------------------------------------------
| Analytics Card
|--------------------------------------------------------------------------
*/

function AnalyticsCard({ icon, label, value, subtitle, iconStyle, theme }) {
  const isDark = theme === "dark";

  return (
    <div
      className={`rounded-3xl p-6 border transition-all duration-300 hover:-translate-y-1 ${
        isDark
          ? "bg-slate-900 border-white/10 hover:border-cyan-500/20"
          : "bg-white border-pink-100 shadow-lg hover:shadow-xl"
      }`}
    >
      <div
        className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl ${iconStyle}`}
      >
        {icon}
      </div>

      <p
        className={`text-sm mt-6 ${
          isDark ? "text-slate-400" : "text-slate-500"
        }`}
      >
        {label}
      </p>

      <h3 className="text-3xl font-bold mt-2">{value}</h3>

      <p
        className={`text-sm mt-2 ${
          isDark ? "text-slate-500" : "text-slate-400"
        }`}
      >
        {subtitle}
      </p>
    </div>
  );
}

/*
|--------------------------------------------------------------------------
| Metric Card
|--------------------------------------------------------------------------
*/

function MetricCard({ icon, title, value, percentage, theme, gradient }) {
  const isDark = theme === "dark";

  return (
    <div
      className={`rounded-3xl p-6 border ${
        isDark
          ? "bg-slate-900 border-white/10"
          : "bg-white border-pink-100 shadow-lg"
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div
            className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
              isDark ? "bg-white/5 text-cyan-400" : "bg-slate-50 text-pink-500"
            }`}
          >
            {icon}
          </div>

          <div>
            <p
              className={`text-sm ${
                isDark ? "text-slate-400" : "text-slate-500"
              }`}
            >
              {title}
            </p>

            <p className="text-xl font-bold mt-1">{value}</p>
          </div>
        </div>

        <span
          className={`text-xs ${isDark ? "text-slate-500" : "text-slate-400"}`}
        >
          Level
        </span>
      </div>

      <div
        className={`mt-6 h-2 rounded-full overflow-hidden ${
          isDark ? "bg-slate-800" : "bg-slate-100"
        }`}
      >
        <div
          className={`h-full rounded-full bg-gradient-to-r ${gradient}`}
          style={{
            width: `${Math.min(Math.max(percentage, 0), 100)}%`,
          }}
        />
      </div>
    </div>
  );
}

export default Analytics;
