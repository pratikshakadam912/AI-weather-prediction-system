import { useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FaArrowLeft,
  FaClockRotateLeft,
  FaLocationDot,
  FaMagnifyingGlass,
  FaTrash,
  FaCloudSun,
  FaGlobe,
  FaTemperatureHalf,
  FaArrowRight,
  FaCloudRain,
  FaWind,
  FaCircleXmark,
  FaRobot,
} from "react-icons/fa6";

import { WeatherContext } from "../context/WeatherContext";

function History() {
  const navigate = useNavigate();
  const { theme } = useContext(WeatherContext);

  const isDark = theme === "dark";

  const [history, setHistory] = useState([]);
  const [search, setSearch] = useState("");

  // ==========================================
  // LOAD HISTORY
  // ==========================================

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = () => {
    try {
      const saved = JSON.parse(localStorage.getItem("weather_history")) || [];

      setHistory(saved);
    } catch (error) {
      console.error("Unable to load history:", error);
      setHistory([]);
    }
  };

  // ==========================================
  // DELETE ONE
  // ==========================================

  const deleteHistoryItem = (id) => {
    const updated = history.filter((item) => item.id !== id);

    setHistory(updated);

    localStorage.setItem("weather_history", JSON.stringify(updated));
  };

  // ==========================================
  // CLEAR ALL
  // ==========================================

  const clearHistory = () => {
    if (!history.length) return;

    const confirmed = window.confirm(
      "Are you sure you want to clear your entire search history?",
    );

    if (!confirmed) return;

    localStorage.removeItem("weather_history");
    setHistory([]);
  };

  // ==========================================
  // FILTER
  // ==========================================

  const filteredHistory = useMemo(() => {
    const query = search.toLowerCase().trim();

    if (!query) return history;

    return history.filter(
      (item) =>
        item.city?.toLowerCase().includes(query) ||
        item.country?.toLowerCase().includes(query) ||
        item.description?.toLowerCase().includes(query),
    );
  }, [history, search]);

  // ==========================================
  // STATISTICS
  // ==========================================

  const uniqueCities = new Set(history.map((item) => item.city)).size;

  const averageTemperature =
    history.length > 0
      ? Math.round(
          history.reduce(
            (total, item) => total + Number(item.temperature || 0),
            0,
          ) / history.length,
        )
      : 0;

  const rainPredictions = history.filter(
    (item) =>
      Number(
        item.prediction?.prediction?.rain_probability ??
          item.prediction?.rain_probability ??
          0,
      ) >= 50,
  ).length;

  // ==========================================
  // OPEN PREDICTION
  // ==========================================

  const openPrediction = (item) => {
    localStorage.setItem("weather_current", JSON.stringify(item.weather));

    localStorage.setItem("weather_prediction", JSON.stringify(item.prediction));

    navigate("/prediction");
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-500 ${
        isDark
          ? "bg-[#070D18] text-white"
          : "bg-gradient-to-br from-pink-50 via-white to-purple-50 text-slate-800"
      }`}
    >
      {/* ==========================================
          BACKGROUND DECORATION
      ========================================== */}

      {isDark && (
        <>
          <div className="fixed top-0 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
          <div className="fixed bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />
        </>
      )}

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-6 sm:py-8 lg:py-10">
        {/* ==========================================
            HEADER
        ========================================== */}

        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div>
            <button
              onClick={() => navigate("/")}
              className={`
                inline-flex
                items-center
                gap-2
                px-4
                py-2.5
                rounded-xl
                text-sm
                font-medium
                transition-all
                duration-300

                ${
                  isDark
                    ? "bg-white/[0.04] border border-white/[0.08] text-slate-400 hover:text-white hover:bg-white/[0.07]"
                    : "bg-white border border-pink-100 text-slate-600 hover:bg-pink-50 shadow-sm"
                }
              `}
            >
              <FaArrowLeft />
              Back to Dashboard
            </button>

            <div className="flex items-center gap-4 mt-7">
              <div
                className={`
                  w-16
                  h-16
                  rounded-2xl
                  flex
                  items-center
                  justify-center
                  shrink-0

                  ${
                    isDark
                      ? "bg-gradient-to-br from-cyan-400/15 to-blue-500/10 border border-cyan-400/10 shadow-lg shadow-cyan-500/5"
                      : "bg-gradient-to-br from-pink-400 to-purple-400 shadow-lg shadow-pink-200"
                  }
                `}
              >
                <FaClockRotateLeft
                  className={`text-2xl ${
                    isDark ? "text-cyan-400" : "text-white"
                  }`}
                />
              </div>

              <div>
                <p
                  className={`
                    text-xs
                    sm:text-sm
                    uppercase
                    tracking-[0.2em]
                    font-semibold

                    ${isDark ? "text-cyan-400" : "text-pink-500"}
                  `}
                >
                  Weather Activity
                </p>

                <h1 className="text-3xl sm:text-4xl font-bold mt-1 tracking-tight">
                  Search History
                </h1>
              </div>
            </div>

            <p
              className={`
                mt-4
                max-w-2xl
                text-sm
                sm:text-base

                ${isDark ? "text-slate-400" : "text-slate-500"}
              `}
            >
              Review your recent weather searches and quickly revisit previous
              AI predictions.
            </p>
          </div>

          {history.length > 0 && (
            <button
              onClick={clearHistory}
              className={`
                self-start
                lg:self-auto
                inline-flex
                items-center
                gap-2
                px-5
                py-3
                rounded-xl
                font-medium
                text-sm
                transition-all

                ${
                  isDark
                    ? "bg-red-500/[0.07] text-red-400 border border-red-500/15 hover:bg-red-500/15"
                    : "bg-red-50 text-red-500 border border-red-100 hover:bg-red-100"
                }
              `}
            >
              <FaTrash />
              Clear History
            </button>
          )}
        </div>

        {/* ==========================================
            STATISTICS
        ========================================== */}

        <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-5 mt-8">
          <HistoryStat
            icon={<FaCloudSun />}
            title="Total Searches"
            value={history.length}
            isDark={isDark}
            iconStyle={
              isDark
                ? "bg-cyan-400/10 text-cyan-400"
                : "bg-cyan-50 text-cyan-500"
            }
          />

          <HistoryStat
            icon={<FaGlobe />}
            title="Cities Explored"
            value={uniqueCities}
            isDark={isDark}
            iconStyle={
              isDark
                ? "bg-purple-400/10 text-purple-400"
                : "bg-purple-50 text-purple-500"
            }
          />

          <HistoryStat
            icon={<FaTemperatureHalf />}
            title="Avg Temperature"
            value={`${averageTemperature}°C`}
            isDark={isDark}
            iconStyle={
              isDark
                ? "bg-orange-400/10 text-orange-400"
                : "bg-orange-50 text-orange-500"
            }
          />

          <HistoryStat
            icon={<FaCloudRain />}
            title="Rain Alerts"
            value={rainPredictions}
            isDark={isDark}
            iconStyle={
              isDark
                ? "bg-blue-400/10 text-blue-400"
                : "bg-blue-50 text-blue-500"
            }
          />
        </div>

        {/* ==========================================
            SEARCH
        ========================================== */}

        <div
          className={`
            mt-8
            flex
            items-center
            gap-4
            px-5
            py-4
            rounded-2xl
            transition-all

            ${
              isDark
                ? "bg-white/[0.035] border border-white/[0.08] focus-within:border-cyan-400/30 focus-within:bg-white/[0.05]"
                : "bg-white border border-pink-100 shadow-sm"
            }
          `}
        >
          <FaMagnifyingGlass
            className={isDark ? "text-slate-500" : "text-slate-400"}
          />

          <input
            type="text"
            placeholder="Search city, country or condition..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={`
              flex-1
              bg-transparent
              outline-none
              text-sm
              sm:text-base

              ${
                isDark
                  ? "text-white placeholder:text-slate-600"
                  : "text-slate-700 placeholder:text-slate-400"
              }
            `}
          />

          {search && (
            <button
              onClick={() => setSearch("")}
              className={
                isDark
                  ? "text-slate-500 hover:text-white"
                  : "text-slate-400 hover:text-slate-700"
              }
            >
              <FaCircleXmark />
            </button>
          )}
        </div>

        {/* ==========================================
            RESULTS HEADER
        ========================================== */}

        {history.length > 0 && (
          <div className="flex items-end justify-between mt-9 mb-5">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold">Recent Searches</h2>

              <p
                className={`
                  text-sm
                  mt-1

                  ${isDark ? "text-slate-500" : "text-slate-400"}
                `}
              >
                Showing {filteredHistory.length} of {history.length} searches
              </p>
            </div>
          </div>
        )}

        {/* ==========================================
            HISTORY LIST
        ========================================== */}

        <div className="space-y-4">
          {filteredHistory.length > 0 ? (
            filteredHistory.map((item) => {
              const rainProbability =
                item.prediction?.prediction?.rain_probability ??
                item.prediction?.rain_probability ??
                0;

              const predictionCondition =
                item.prediction?.prediction?.predicted_condition ??
                item.prediction?.predicted_condition ??
                "AI prediction available";

              return (
                <div
                  key={item.id}
                  className={`
                    group
                    relative
                    overflow-hidden
                    rounded-[1.75rem]
                    p-5
                    sm:p-6
                    transition-all
                    duration-300

                    ${
                      isDark
                        ? "bg-white/[0.035] border border-white/[0.07] hover:bg-white/[0.055] hover:border-cyan-400/20"
                        : "bg-white border border-pink-100 shadow-sm hover:shadow-xl hover:border-pink-200"
                    }
                  `}
                >
                  {/* subtle dark glow */}

                  {isDark && (
                    <div className="absolute -right-20 -top-20 w-40 h-40 bg-cyan-400/5 rounded-full blur-3xl pointer-events-none" />
                  )}

                  <div className="relative flex flex-col xl:flex-row xl:items-center gap-6">
                    {/* ==================================
                        LOCATION
                    ================================== */}

                    <div className="flex items-center gap-4 flex-1 min-w-0">
                      <div
                        className={`
                          w-14
                          h-14
                          rounded-2xl
                          shrink-0
                          flex
                          items-center
                          justify-center

                          ${
                            isDark
                              ? "bg-cyan-400/10 text-cyan-400 border border-cyan-400/10"
                              : "bg-pink-50 text-pink-500"
                          }
                        `}
                      >
                        <FaLocationDot className="text-xl" />
                      </div>

                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3
                            className={`
                              text-lg
                              sm:text-xl
                              font-bold
                              truncate

                              ${isDark ? "text-white" : "text-slate-800"}
                            `}
                          >
                            {item.city}
                          </h3>

                          <span
                            className={`
                              px-2.5
                              py-1
                              rounded-full
                              text-[11px]
                              font-semibold

                              ${
                                isDark
                                  ? "bg-white/[0.06] text-slate-400 border border-white/[0.05]"
                                  : "bg-slate-100 text-slate-500"
                              }
                            `}
                          >
                            {item.country}
                          </span>
                        </div>

                        <p
                          className={`
                            capitalize
                            mt-1
                            text-sm

                            ${isDark ? "text-slate-400" : "text-slate-500"}
                          `}
                        >
                          {item.description}
                        </p>

                        <div
                          className={`
                            flex
                            items-center
                            gap-2
                            text-xs
                            mt-2

                            ${isDark ? "text-slate-600" : "text-slate-400"}
                          `}
                        >
                          <FaClockRotateLeft />
                          {item.time}
                        </div>
                      </div>
                    </div>

                    {/* ==================================
                        WEATHER METRICS
                    ================================== */}

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 xl:w-[440px]">
                      <HistoryMetric
                        icon={<FaTemperatureHalf />}
                        label="Temperature"
                        value={`${item.temperature}°C`}
                        isDark={isDark}
                      />

                      <HistoryMetric
                        icon={<FaCloudRain />}
                        label="Rain Chance"
                        value={`${rainProbability}%`}
                        isDark={isDark}
                      />

                      <HistoryMetric
                        icon={<FaWind />}
                        label="Wind"
                        value={`${item.weather?.wind_speed ?? "--"} m/s`}
                        isDark={isDark}
                      />
                    </div>

                    {/* ==================================
                        AI PREDICTION
                    ================================== */}

                    <div
                      className={`
                        hidden
                        xl:flex
                        items-center
                        gap-3
                        px-4
                        py-3
                        rounded-2xl
                        min-w-[190px]

                        ${
                          isDark
                            ? "bg-purple-400/[0.06] border border-purple-400/10"
                            : "bg-purple-50 border border-purple-100"
                        }
                      `}
                    >
                      <div
                        className={`
                          w-9
                          h-9
                          rounded-xl
                          flex
                          items-center
                          justify-center

                          ${
                            isDark
                              ? "bg-purple-400/10 text-purple-400"
                              : "bg-purple-100 text-purple-500"
                          }
                        `}
                      >
                        <FaRobot />
                      </div>

                      <div className="min-w-0">
                        <p
                          className={`
                            text-[10px]
                            uppercase
                            tracking-wider
                            font-semibold

                            ${isDark ? "text-purple-400" : "text-purple-500"}
                          `}
                        >
                          AI Prediction
                        </p>

                        <p
                          className={`
                            text-sm
                            font-semibold
                            capitalize
                            truncate

                            ${isDark ? "text-slate-300" : "text-slate-700"}
                          `}
                        >
                          {predictionCondition}
                        </p>
                      </div>
                    </div>

                    {/* ==================================
                        ACTIONS
                    ================================== */}

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => openPrediction(item)}
                        title="View prediction"
                        className={`
                          flex-1
                          sm:flex-none
                          h-11
                          px-4
                          rounded-xl
                          flex
                          items-center
                          justify-center
                          gap-2
                          text-sm
                          font-semibold
                          transition-all

                          ${
                            isDark
                              ? "bg-cyan-400/10 text-cyan-400 hover:bg-cyan-400/20"
                              : "bg-pink-50 text-pink-500 hover:bg-pink-100"
                          }
                        `}
                      >
                        <span className="hidden sm:inline">View</span>
                        <FaArrowRight />
                      </button>

                      <button
                        onClick={() => deleteHistoryItem(item.id)}
                        title="Delete"
                        className={`
                          w-11
                          h-11
                          rounded-xl
                          flex
                          items-center
                          justify-center
                          transition-all

                          ${
                            isDark
                              ? "bg-white/[0.03] text-slate-600 hover:text-red-400 hover:bg-red-400/10"
                              : "bg-slate-50 text-slate-400 hover:text-red-500 hover:bg-red-50"
                          }
                        `}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <EmptyHistory
              isDark={isDark}
              search={search}
              onClearSearch={() => setSearch("")}
              onSearch={() => navigate("/")}
            />
          )}
        </div>
      </div>
    </div>
  );
}

// ==========================================
// STAT CARD
// ==========================================

function HistoryStat({ icon, title, value, isDark, iconStyle }) {
  return (
    <div
      className={`
        rounded-3xl
        p-4
        sm:p-6
        border
        transition-all

        ${
          isDark
            ? "bg-white/[0.035] border-white/[0.07] hover:bg-white/[0.05]"
            : "bg-white border-pink-100 shadow-sm"
        }
      `}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p
            className={`
              text-xs
              sm:text-sm

              ${isDark ? "text-slate-500" : "text-slate-400"}
            `}
          >
            {title}
          </p>

          <p className="text-2xl sm:text-3xl font-bold mt-2">{value}</p>
        </div>

        <div
          className={`
            w-10
            h-10
            sm:w-12
            sm:h-12
            shrink-0
            rounded-2xl
            flex
            items-center
            justify-center

            ${iconStyle}
          `}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}

// ==========================================
// HISTORY METRIC
// ==========================================

function HistoryMetric({ icon, label, value, isDark }) {
  return (
    <div
      className={`
        rounded-2xl
        px-4
        py-3

        ${isDark ? "bg-black/20 border border-white/[0.04]" : "bg-slate-50"}
      `}
    >
      <div
        className={`
          flex
          items-center
          gap-2
          text-[11px]

          ${isDark ? "text-slate-500" : "text-slate-400"}
        `}
      >
        {icon}
        {label}
      </div>

      <p
        className={`
          font-bold
          mt-1
          text-sm
          sm:text-base

          ${isDark ? "text-slate-200" : "text-slate-700"}
        `}
      >
        {value}
      </p>
    </div>
  );
}

// ==========================================
// EMPTY STATE
// ==========================================

function EmptyHistory({ isDark, search, onClearSearch, onSearch }) {
  return (
    <div
      className={`
        rounded-[2rem]
        py-20
        px-6
        text-center
        border

        ${
          isDark
            ? "bg-white/[0.025] border-white/[0.07]"
            : "bg-white border-pink-100 shadow-sm"
        }
      `}
    >
      <div
        className={`
          mx-auto
          w-20
          h-20
          rounded-3xl
          flex
          items-center
          justify-center

          ${
            isDark ? "bg-cyan-400/10 text-cyan-400" : "bg-pink-50 text-pink-500"
          }
        `}
      >
        {search ? (
          <FaMagnifyingGlass className="text-3xl" />
        ) : (
          <FaClockRotateLeft className="text-3xl" />
        )}
      </div>

      <h2 className="text-2xl font-bold mt-6">
        {search ? "No matching searches" : "Your history is empty"}
      </h2>

      <p
        className={`
          mt-3
          max-w-md
          mx-auto

          ${isDark ? "text-slate-400" : "text-slate-500"}
        `}
      >
        {search
          ? "Try searching for another city or clear your search."
          : "Search for a city from the dashboard and your weather searches will automatically appear here."}
      </p>

      <button
        onClick={search ? onClearSearch : onSearch}
        className={`
          mt-7
          px-6
          py-3
          rounded-xl
          font-semibold
          text-white
          transition-all
          hover:-translate-y-0.5

          ${
            isDark
              ? "bg-cyan-500 hover:bg-cyan-600 shadow-lg shadow-cyan-500/10"
              : "bg-gradient-to-r from-pink-400 via-pink-500 to-purple-400 shadow-lg"
          }
        `}
      >
        {search ? "Clear Search" : "Search a City"}
      </button>
    </div>
  );
}

export default History;
