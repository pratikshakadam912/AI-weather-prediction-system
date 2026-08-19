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
} from "react-icons/fa6";

import { WeatherContext } from "../context/WeatherContext";

function History() {
  const navigate = useNavigate();

  const { theme } = useContext(WeatherContext);

  const isDark = theme === "dark";

  const [history, setHistory] = useState([]);
  const [search, setSearch] = useState("");

  /*
   * ==========================================
   * LOAD HISTORY
   * ==========================================
   */

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

  /*
   * ==========================================
   * DELETE ONE
   * ==========================================
   */

  const deleteHistoryItem = (id) => {
    const updated = history.filter((item) => item.id !== id);

    setHistory(updated);

    localStorage.setItem("weather_history", JSON.stringify(updated));
  };

  /*
   * ==========================================
   * CLEAR ALL
   * ==========================================
   */

  const clearHistory = () => {
    if (history.length === 0) return;

    const confirmed = window.confirm(
      "Are you sure you want to clear your entire search history?",
    );

    if (!confirmed) return;

    localStorage.removeItem("weather_history");

    setHistory([]);
  };

  /*
   * ==========================================
   * FILTER
   * ==========================================
   */

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

  /*
   * ==========================================
   * STATISTICS
   * ==========================================
   */

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

  /*
   * ==========================================
   * OPEN HISTORY ITEM
   * ==========================================
   */

  const openPrediction = (item) => {
    localStorage.setItem("weather_current", JSON.stringify(item.weather));

    localStorage.setItem("weather_prediction", JSON.stringify(item.prediction));

    navigate("/prediction");
  };

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
            HEADER
        ===================================== */}

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <button
              onClick={() => navigate("/")}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all ${
                isDark
                  ? "bg-slate-900 border border-white/10 text-slate-300 hover:bg-slate-800"
                  : "bg-white border border-pink-100 text-slate-600 hover:bg-pink-50 shadow-sm"
              }`}
            >
              <FaArrowLeft />
              Back to Dashboard
            </button>

            <div className="flex items-center gap-4 mt-7">
              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                  isDark
                    ? "bg-cyan-500/10 border border-cyan-400/20"
                    : "bg-pink-100"
                }`}
              >
                <FaClockRotateLeft
                  className={`text-2xl ${
                    isDark ? "text-cyan-400" : "text-pink-500"
                  }`}
                />
              </div>

              <div>
                <p
                  className={`text-sm uppercase tracking-widest font-semibold ${
                    isDark ? "text-cyan-400" : "text-pink-500"
                  }`}
                >
                  Your Activity
                </p>

                <h1
                  className={`text-3xl sm:text-4xl font-bold mt-1 ${
                    isDark ? "text-white" : "text-slate-800"
                  }`}
                >
                  Search History
                </h1>
              </div>
            </div>

            <p
              className={`mt-4 max-w-2xl ${
                isDark ? "text-slate-400" : "text-slate-500"
              }`}
            >
              Your recently searched locations and weather predictions are
              stored here for quick access.
            </p>
          </div>

          {history.length > 0 && (
            <button
              onClick={clearHistory}
              className={`inline-flex items-center gap-2 px-5 py-3 rounded-xl font-medium transition-all ${
                isDark
                  ? "bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20"
                  : "bg-red-50 text-red-500 border border-red-100 hover:bg-red-100"
              }`}
            >
              <FaTrash />
              Clear History
            </button>
          )}
        </div>

        {/* =====================================
            STATS
        ===================================== */}

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mt-8">
          <HistoryStat
            icon={<FaCloudSun />}
            title="Total Searches"
            value={history.length}
            isDark={isDark}
            iconStyle={
              isDark
                ? "bg-cyan-500/10 text-cyan-400"
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
                ? "bg-violet-500/10 text-violet-400"
                : "bg-violet-50 text-violet-500"
            }
          />

          <HistoryStat
            icon={<FaTemperatureHalf />}
            title="Average Temperature"
            value={`${averageTemperature}°C`}
            isDark={isDark}
            iconStyle={
              isDark
                ? "bg-orange-500/10 text-orange-400"
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
                ? "bg-blue-500/10 text-blue-400"
                : "bg-blue-50 text-blue-500"
            }
          />
        </div>

        {/* =====================================
            SEARCH
        ===================================== */}

        <div
          className={`mt-8 flex items-center gap-4 px-5 py-4 rounded-2xl ${
            isDark
              ? "bg-slate-900 border border-white/10"
              : "bg-white border border-pink-100 shadow-sm"
          }`}
        >
          <FaMagnifyingGlass
            className={isDark ? "text-slate-500" : "text-slate-400"}
          />

          <input
            type="text"
            placeholder="Search your history..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={`flex-1 bg-transparent outline-none ${
              isDark
                ? "text-white placeholder:text-slate-500"
                : "text-slate-700 placeholder:text-slate-400"
            }`}
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

        {/* =====================================
            RESULTS HEADER
        ===================================== */}

        {history.length > 0 && (
          <div className="flex items-center justify-between mt-8 mb-4">
            <div>
              <h2
                className={`text-xl font-bold ${
                  isDark ? "text-white" : "text-slate-800"
                }`}
              >
                Recent Searches
              </h2>

              <p
                className={`text-sm mt-1 ${
                  isDark ? "text-slate-500" : "text-slate-400"
                }`}
              >
                {filteredHistory.length} result
                {filteredHistory.length !== 1 ? "s" : ""}
              </p>
            </div>
          </div>
        )}

        {/* =====================================
            HISTORY LIST
        ===================================== */}

        <div className="space-y-4">
          {filteredHistory.length > 0 ? (
            filteredHistory.map((item) => {
              const rainProbability =
                item.prediction?.prediction?.rain_probability ??
                item.prediction?.rain_probability ??
                0;

              return (
                <div
                  key={item.id}
                  className={`group rounded-[1.75rem] p-5 sm:p-6 transition-all duration-300 ${
                    isDark
                      ? "bg-slate-900 border border-white/10 hover:border-cyan-400/20 hover:bg-slate-900/80"
                      : "bg-white border border-pink-100 shadow-sm hover:shadow-lg hover:border-pink-200"
                  }`}
                >
                  <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                    {/* Location */}

                    <div className="flex items-center gap-4 flex-1">
                      <div
                        className={`w-14 h-14 shrink-0 rounded-2xl flex items-center justify-center ${
                          isDark
                            ? "bg-cyan-500/10 text-cyan-400"
                            : "bg-pink-50 text-pink-500"
                        }`}
                      >
                        <FaLocationDot className="text-xl" />
                      </div>

                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3
                            className={`text-xl font-bold ${
                              isDark ? "text-white" : "text-slate-800"
                            }`}
                          >
                            {item.city}
                          </h3>

                          <span
                            className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                              isDark
                                ? "bg-slate-800 text-slate-400"
                                : "bg-slate-100 text-slate-500"
                            }`}
                          >
                            {item.country}
                          </span>
                        </div>

                        <p
                          className={`capitalize mt-1 ${
                            isDark ? "text-slate-400" : "text-slate-500"
                          }`}
                        >
                          {item.description}
                        </p>

                        <p
                          className={`text-xs mt-2 ${
                            isDark ? "text-slate-600" : "text-slate-400"
                          }`}
                        >
                          {item.time}
                        </p>
                      </div>
                    </div>

                    {/* Weather */}

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 lg:w-[420px]">
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

                    {/* Actions */}

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => openPrediction(item)}
                        title="View prediction"
                        className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all ${
                          isDark
                            ? "bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20"
                            : "bg-pink-50 text-pink-500 hover:bg-pink-100"
                        }`}
                      >
                        <FaArrowRight />
                      </button>

                      <button
                        onClick={() => deleteHistoryItem(item.id)}
                        title="Delete"
                        className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all ${
                          isDark
                            ? "bg-red-500/5 text-slate-500 hover:text-red-400 hover:bg-red-500/10"
                            : "bg-slate-50 text-slate-400 hover:text-red-500 hover:bg-red-50"
                        }`}
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

/* ==========================================
   STAT COMPONENT
========================================== */

function HistoryStat({ icon, title, value, isDark, iconStyle }) {
  return (
    <div
      className={`rounded-3xl p-5 sm:p-6 ${
        isDark
          ? "bg-slate-900 border border-white/10"
          : "bg-white border border-pink-100 shadow-sm"
      }`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p
            className={`text-sm ${
              isDark ? "text-slate-500" : "text-slate-400"
            }`}
          >
            {title}
          </p>

          <p
            className={`text-3xl font-bold mt-2 ${
              isDark ? "text-white" : "text-slate-800"
            }`}
          >
            {value}
          </p>
        </div>

        <div
          className={`w-12 h-12 rounded-2xl flex items-center justify-center ${iconStyle}`}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}

/* ==========================================
   HISTORY METRIC
========================================== */

function HistoryMetric({ icon, label, value, isDark }) {
  return (
    <div
      className={`rounded-2xl px-4 py-3 ${
        isDark ? "bg-slate-800/70" : "bg-slate-50"
      }`}
    >
      <div
        className={`flex items-center gap-2 text-xs ${
          isDark ? "text-slate-500" : "text-slate-400"
        }`}
      >
        {icon}
        {label}
      </div>

      <p
        className={`font-bold mt-1 ${isDark ? "text-white" : "text-slate-700"}`}
      >
        {value}
      </p>
    </div>
  );
}

/* ==========================================
   EMPTY STATE
========================================== */

function EmptyHistory({ isDark, search, onClearSearch, onSearch }) {
  return (
    <div
      className={`rounded-[2rem] py-20 px-6 text-center ${
        isDark
          ? "bg-slate-900 border border-white/10"
          : "bg-white border border-pink-100 shadow-sm"
      }`}
    >
      <div
        className={`mx-auto w-20 h-20 rounded-3xl flex items-center justify-center ${
          isDark ? "bg-cyan-500/10 text-cyan-400" : "bg-pink-50 text-pink-500"
        }`}
      >
        {search ? (
          <FaMagnifyingGlass className="text-3xl" />
        ) : (
          <FaClockRotateLeft className="text-3xl" />
        )}
      </div>

      <h2
        className={`text-2xl font-bold mt-6 ${
          isDark ? "text-white" : "text-slate-800"
        }`}
      >
        {search ? "No matching searches" : "Your history is empty"}
      </h2>

      <p
        className={`mt-3 max-w-md mx-auto ${
          isDark ? "text-slate-400" : "text-slate-500"
        }`}
      >
        {search
          ? "Try searching for another city or clear your search."
          : "Search for a city from the dashboard and your weather searches will automatically appear here."}
      </p>

      <button
        onClick={search ? onClearSearch : onSearch}
        className="mt-7 px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-pink-400 via-pink-500 to-purple-400 hover:scale-105 transition-all shadow-lg"
      >
        {search ? "Clear Search" : "Search a City"}
      </button>
    </div>
  );
}

export default History;
