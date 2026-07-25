import { useContext, useMemo, useState } from "react";
import { WeatherContext } from "../context/WeatherContext";

import {
  FaClockRotateLeft,
  FaLocationDot,
  FaMagnifyingGlass,
  FaArrowRight,
  FaCloud,
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
  ];

  const [search, setSearch] = useState("");

  const filteredHistory = useMemo(() => {
    return history.filter((item) =>
      item.city.toLowerCase().includes(search.toLowerCase()),
    );
  }, [search]);

  return (
    <div className="w-full min-h-screen p-6 lg:p-10">
      {/* Heading */}

      <div className="mb-8">
        <div className="flex items-center gap-3">
          <div
            className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
              isDark
                ? "bg-cyan-500/10 text-cyan-400"
                : "bg-pink-100 text-pink-500"
            }`}
          >
            <FaClockRotateLeft className="text-2xl" />
          </div>

          <div>
            <h1
              className={`text-3xl font-bold ${
                isDark ? "text-white" : "text-slate-800"
              }`}
            >
              Search History
            </h1>

            <p
              className={`mt-1 ${isDark ? "text-slate-400" : "text-slate-500"}`}
            >
              View all your recently searched weather locations.
            </p>
          </div>
        </div>
      </div>

      {/* Search */}

      <div
        className={`flex items-center gap-3 rounded-2xl px-5 py-4 mb-8 ${
          isDark
            ? "bg-slate-900 border border-white/10"
            : "bg-white border border-pink-100 shadow-sm"
        }`}
      >
        <FaMagnifyingGlass
          className={isDark ? "text-slate-400" : "text-slate-500"}
        />

        <input
          type="text"
          placeholder="Search city..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={`bg-transparent outline-none w-full ${
            isDark
              ? "text-white placeholder:text-slate-500"
              : "text-slate-700 placeholder:text-slate-400"
          }`}
        />
      </div>

      {/* Cards */}

      <div className="grid gap-5">
        {filteredHistory.length > 0 ? (
          filteredHistory.map((item, index) => (
            <div
              key={index}
              className={`rounded-3xl p-6 transition-all duration-300 hover:-translate-y-1 ${
                isDark
                  ? "bg-slate-900 border border-white/10 hover:border-cyan-500/30"
                  : "bg-white border border-pink-100 hover:border-pink-300 shadow-sm hover:shadow-lg"
              }`}
            >
              <div className="flex items-center justify-between flex-wrap gap-5">
                <div className="flex items-center gap-4">
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                      isDark
                        ? "bg-cyan-500/10"
                        : "bg-gradient-to-br from-pink-100 to-blue-100"
                    }`}
                  >
                    <FaLocationDot
                      className={`text-xl ${
                        isDark ? "text-cyan-400" : "text-pink-500"
                      }`}
                    />
                  </div>

                  <div>
                    <h2
                      className={`text-xl font-semibold ${
                        isDark ? "text-white" : "text-slate-800"
                      }`}
                    >
                      {item.city}
                    </h2>

                    <p className={isDark ? "text-slate-400" : "text-slate-500"}>
                      {item.country}
                    </p>

                    <p
                      className={`text-sm mt-1 ${
                        isDark ? "text-slate-500" : "text-slate-400"
                      }`}
                    >
                      {item.time}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-8">
                  <div className="text-center">
                    <p
                      className={`text-3xl font-bold ${
                        isDark ? "text-white" : "text-slate-800"
                      }`}
                    >
                      {item.temperature}°
                    </p>

                    <p
                      className={`text-sm capitalize ${
                        isDark ? "text-slate-400" : "text-slate-500"
                      }`}
                    >
                      {item.description}
                    </p>
                  </div>

                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                      isDark ? "bg-yellow-400/10" : "bg-yellow-100"
                    }`}
                  >
                    <FaCloud className="text-yellow-500 text-2xl" />
                  </div>

                  <button
                    className={`w-12 h-12 rounded-xl flex items-center justify-center transition ${
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
            className={`rounded-3xl py-20 text-center ${
              isDark
                ? "bg-slate-900 border border-white/10"
                : "bg-white border border-pink-100 shadow-sm"
            }`}
          >
            <FaClockRotateLeft
              className={`mx-auto text-6xl mb-5 ${
                isDark ? "text-slate-600" : "text-slate-300"
              }`}
            />

            <h2
              className={`text-2xl font-semibold ${
                isDark ? "text-white" : "text-slate-800"
              }`}
            >
              No History Found
            </h2>

            <p
              className={`mt-2 ${isDark ? "text-slate-400" : "text-slate-500"}`}
            >
              Your searched cities will appear here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default History;
