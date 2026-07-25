import { useContext, useMemo, useState } from "react";
import { WeatherContext } from "../context/WeatherContext";

import {
  FaClockRotateLeft,
  FaLocationDot,
  FaMagnifyingGlass,
  FaArrowRight,
  FaCloudSun,
  FaCloud,
  FaTemperatureHalf,
  FaGlobe,
} from "react-icons/fa6";

function History() {
  const { theme } = useContext(WeatherContext);

  const isDark = theme === "dark";

  // Dummy Data (Replace with LocalStorage later)
  const history = [
    {
      city: "London",
      country: "GB",
      temperature: 22,
      description: "Overcast Clouds",
      time: "Today • 10:42 AM",
    },
    {
      city: "Bangalore",
      country: "IN",
      temperature: 27,
      description: "Light Rain",
      time: "Today • 09:18 AM",
    },
    {
      city: "Pune",
      country: "IN",
      temperature: 31,
      description: "Sunny",
      time: "Yesterday • 06:35 PM",
    },
    {
      city: "Tokyo",
      country: "JP",
      temperature: 25,
      description: "Clear Sky",
      time: "Yesterday • 03:20 PM",
    },
    {
      city: "Paris",
      country: "FR",
      temperature: 19,
      description: "Cloudy",
      time: "Yesterday • 09:15 AM",
    },
  ];

  const [search, setSearch] = useState("");

  const filteredHistory = useMemo(() => {
    return history.filter((item) =>
      item.city.toLowerCase().includes(search.toLowerCase()),
    );
  }, [search]);

  const uniqueCities = new Set(history.map((item) => item.city)).size;

  return (
    <div className="flex-1 overflow-y-auto p-6 lg:p-8">
      {/* ================= Header ================= */}

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div className="flex items-center gap-5">
          <div
            className={`w-16 h-16 rounded-3xl flex items-center justify-center shadow-lg ${
              isDark
                ? "bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/20"
                : "bg-gradient-to-br from-pink-400 via-sky-400 to-blue-500"
            }`}
          >
            <FaClockRotateLeft
              className={`text-3xl ${isDark ? "text-cyan-400" : "text-white"}`}
            />
          </div>

          <div>
            <h1
              className={`text-4xl font-bold ${
                isDark ? "text-white" : "text-slate-800"
              }`}
            >
              Search History
            </h1>

            <p
              className={`mt-2 ${isDark ? "text-slate-400" : "text-slate-500"}`}
            >
              Browse your recently searched weather locations.
            </p>
          </div>
        </div>
      </div>

      {/* ================= Stats ================= */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
        {/* Total Searches */}

        <div
          className={`rounded-3xl p-6 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 ${
            isDark
              ? "bg-slate-900/80 border border-white/10"
              : "bg-white/80 border border-blue-100 shadow-md"
          }`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p
                className={`text-sm ${
                  isDark ? "text-slate-400" : "text-slate-500"
                }`}
              >
                Total Searches
              </p>

              <h2
                className={`text-4xl font-bold mt-2 ${
                  isDark ? "text-white" : "text-slate-800"
                }`}
              >
                {history.length}
              </h2>
            </div>

            <div
              className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                isDark ? "bg-cyan-500/10" : "bg-sky-100"
              }`}
            >
              <FaCloudSun
                className={`text-2xl ${
                  isDark ? "text-cyan-400" : "text-sky-500"
                }`}
              />
            </div>
          </div>
        </div>

        {/* Cities */}

        <div
          className={`rounded-3xl p-6 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 ${
            isDark
              ? "bg-slate-900/80 border border-white/10"
              : "bg-white/80 border border-blue-100 shadow-md"
          }`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p
                className={`text-sm ${
                  isDark ? "text-slate-400" : "text-slate-500"
                }`}
              >
                Cities Visited
              </p>

              <h2
                className={`text-4xl font-bold mt-2 ${
                  isDark ? "text-white" : "text-slate-800"
                }`}
              >
                {uniqueCities}
              </h2>
            </div>

            <div
              className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                isDark ? "bg-cyan-500/10" : "bg-pink-100"
              }`}
            >
              <FaGlobe
                className={`text-2xl ${
                  isDark ? "text-cyan-400" : "text-pink-500"
                }`}
              />
            </div>
          </div>
        </div>

        {/* Avg Temp */}

        <div
          className={`rounded-3xl p-6 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 ${
            isDark
              ? "bg-slate-900/80 border border-white/10"
              : "bg-white/80 border border-blue-100 shadow-md"
          }`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p
                className={`text-sm ${
                  isDark ? "text-slate-400" : "text-slate-500"
                }`}
              >
                Avg Temperature
              </p>

              <h2
                className={`text-4xl font-bold mt-2 ${
                  isDark ? "text-white" : "text-slate-800"
                }`}
              >
                25°
              </h2>
            </div>

            <div
              className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                isDark ? "bg-yellow-400/10" : "bg-yellow-100"
              }`}
            >
              <FaTemperatureHalf className="text-yellow-500 text-2xl" />
            </div>
          </div>
        </div>
      </div>

      {/* ================= Search ================= */}

      <div
        className={`mt-10 rounded-3xl px-6 py-5 flex items-center gap-4 backdrop-blur-xl ${
          isDark
            ? "bg-slate-900/80 border border-white/10"
            : "bg-white/80 border border-blue-100 shadow-md"
        }`}
      >
        <FaMagnifyingGlass
          className={`text-lg ${isDark ? "text-slate-400" : "text-slate-500"}`}
        />

        <input
          type="text"
          placeholder="Search a city..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={`flex-1 bg-transparent outline-none ${
            isDark
              ? "text-white placeholder:text-slate-500"
              : "text-slate-700 placeholder:text-slate-400"
          }`}
        />
      </div>

      {/* ================= History Cards ================= */}

      <div className="mt-10 space-y-5">
        {filteredHistory.length > 0 ? (
          filteredHistory.map((item, index) => (
            <div
              key={index}
              className={`rounded-3xl p-6 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:shadow-xl ${
                isDark
                  ? "bg-slate-900/80 border border-white/10 hover:border-cyan-500/20"
                  : "bg-white/80 border border-blue-100 hover:border-pink-200 shadow-md"
              }`}
            >
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                {/* Left */}

                <div className="flex items-center gap-5">
                  <div
                    className={`w-16 h-16 rounded-3xl flex items-center justify-center ${
                      isDark
                        ? "bg-cyan-500/10"
                        : "bg-gradient-to-br from-pink-100 via-sky-100 to-blue-100"
                    }`}
                  >
                    <FaLocationDot
                      className={`text-2xl ${
                        isDark ? "text-cyan-400" : "text-pink-500"
                      }`}
                    />
                  </div>

                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h2
                        className={`text-2xl font-bold ${
                          isDark ? "text-white" : "text-slate-800"
                        }`}
                      >
                        {item.city}
                      </h2>

                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          isDark
                            ? "bg-slate-800 text-slate-300"
                            : "bg-sky-100 text-sky-700"
                        }`}
                      >
                        {item.country}
                      </span>
                    </div>

                    <p
                      className={`mt-2 capitalize ${
                        isDark ? "text-slate-300" : "text-slate-600"
                      }`}
                    >
                      {item.description}
                    </p>

                    <p
                      className={`mt-3 text-sm ${
                        isDark ? "text-slate-500" : "text-slate-400"
                      }`}
                    >
                      {item.time}
                    </p>
                  </div>
                </div>

                {/* Right */}

                <div className="flex items-center justify-between lg:justify-end gap-8">
                  <div className="text-center">
                    <p
                      className={`text-5xl font-bold ${
                        isDark ? "text-white" : "text-slate-800"
                      }`}
                    >
                      {item.temperature}°
                    </p>

                    <p
                      className={`text-sm mt-1 ${
                        isDark ? "text-slate-400" : "text-slate-500"
                      }`}
                    >
                      Temperature
                    </p>
                  </div>

                  <div
                    className={`w-16 h-16 rounded-3xl flex items-center justify-center ${
                      isDark ? "bg-yellow-400/10" : "bg-yellow-100"
                    }`}
                  >
                    <FaCloud className="text-3xl text-yellow-500" />
                  </div>

                  <button
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                      isDark
                        ? "bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20"
                        : "bg-pink-100 text-pink-500 hover:bg-pink-200"
                    }`}
                  >
                    <FaArrowRight />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div
            className={`rounded-3xl backdrop-blur-xl py-24 px-6 text-center ${
              isDark
                ? "bg-slate-900/80 border border-white/10"
                : "bg-white/80 border border-blue-100 shadow-md"
            }`}
          >
            <div
              className={`mx-auto w-24 h-24 rounded-full flex items-center justify-center ${
                isDark ? "bg-cyan-500/10" : "bg-pink-100"
              }`}
            >
              <FaClockRotateLeft
                className={`text-5xl ${
                  isDark ? "text-cyan-400" : "text-pink-500"
                }`}
              />
            </div>

            <h2
              className={`text-3xl font-bold mt-8 ${
                isDark ? "text-white" : "text-slate-800"
              }`}
            >
              No Searches Yet
            </h2>

            <p
              className={`mt-3 max-w-md mx-auto ${
                isDark ? "text-slate-400" : "text-slate-500"
              }`}
            >
              Start searching for cities from the dashboard. Every weather
              search will automatically appear here for quick access.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default History;
