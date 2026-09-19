import { useContext, useEffect, useState } from "react";

import {
  WiDaySunny,
  WiRain,
  WiCloud,
  WiDayCloudy,
  WiThunderstorm,
  WiSnow,
  WiFog,
} from "react-icons/wi";

import { WeatherContext } from "../context/WeatherContext";

import { getForecast, getForecastByLocation } from "../api/WeatherApi";

function Forecast() {
  const { weather, location, theme } = useContext(WeatherContext);

  const [forecast, setForecast] = useState([]);
  const [forecastLoading, setForecastLoading] = useState(false);
  const [forecastError, setForecastError] = useState("");

  const isDark = theme === "dark";

  // ==========================================
  // WEATHER ICON
  // ==========================================

  const getIcon = (condition) => {
    switch (condition) {
      case "Clear":
        return <WiDaySunny size={56} className="text-yellow-400" />;

      case "Rain":
        return <WiRain size={56} className="text-blue-400" />;

      case "Clouds":
        return <WiCloud size={56} className="text-slate-300" />;

      case "Thunderstorm":
        return <WiThunderstorm size={56} className="text-violet-400" />;

      case "Snow":
        return <WiSnow size={56} className="text-cyan-200" />;

      case "Mist":
      case "Fog":
      case "Haze":
        return <WiFog size={56} className="text-slate-400" />;

      default:
        return <WiDayCloudy size={56} className="text-cyan-400" />;
    }
  };

  // ==========================================
  // FORMAT DATE
  // ==========================================

  const formatDate = (dateString) => {
    const date = new Date(`${dateString}T12:00:00`);

    return date.toLocaleDateString("en-US", {
      weekday: "short",
    });
  };

  // ==========================================
  // FETCH FORECAST
  // ==========================================

  useEffect(() => {
    if (!weather) {
      setForecast([]);
      return;
    }

    const fetchForecast = async () => {
      try {
        setForecastLoading(true);
        setForecastError("");

        let response;

        // ==========================================
        // CURRENT LOCATION
        // ==========================================

        if (location?.lat && location?.lon) {
          response = await getForecastByLocation(location.lat, location.lon);
        }

        // ==========================================
        // CITY SEARCH
        // ==========================================
        else if (weather.city) {
          response = await getForecast(weather.city);
        } else {
          return;
        }

        if (!response?.forecast) {
          throw new Error("Invalid forecast response.");
        }

        setForecast(response.forecast);
      } catch (error) {
        console.error("Forecast fetch error:", error);

        setForecast([]);
        setForecastError("Unable to load forecast.");
      } finally {
        setForecastLoading(false);
      }
    };

    fetchForecast();
  }, [weather?.city, location?.lat, location?.lon]);

  // ==========================================
  // NO WEATHER YET
  // ==========================================

  if (!weather) {
    return null;
  }

  // ==========================================
  // LOADING
  // ==========================================

  if (forecastLoading) {
    return (
      <section className="mt-10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2
              className={`text-2xl font-bold ${
                isDark ? "text-white" : "text-slate-800"
              }`}
            >
              Weather Forecast
            </h2>

            <p
              className={`text-sm mt-1 ${
                isDark ? "text-slate-400" : "text-slate-500"
              }`}
            >
              Loading real forecast data...
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {[1, 2, 3, 4, 5].map((item) => (
            <div
              key={item}
              className={`
                rounded-3xl
                p-5
                min-h-[230px]
                animate-pulse

                ${
                  isDark
                    ? "bg-slate-900/80 border border-white/10"
                    : "bg-white/80 border border-pink-100 shadow-md"
                }
              `}
            >
              <div
                className={`
                  h-4
                  w-16
                  rounded
                  mb-6

                  ${isDark ? "bg-slate-700" : "bg-slate-200"}
                `}
              />

              <div
                className={`
                  h-14
                  w-14
                  rounded-full
                  mb-5

                  ${isDark ? "bg-slate-700" : "bg-slate-200"}
                `}
              />

              <div
                className={`
                  h-5
                  w-20
                  rounded
                  mb-4

                  ${isDark ? "bg-slate-700" : "bg-slate-200"}
                `}
              />

              <div
                className={`
                  h-4
                  w-24
                  rounded

                  ${isDark ? "bg-slate-700" : "bg-slate-200"}
                `}
              />
            </div>
          ))}
        </div>
      </section>
    );
  }

  // ==========================================
  // ERROR
  // ==========================================

  if (forecastError) {
    return (
      <section className="mt-10">
        <div
          className={`
            rounded-3xl
            p-6
            border

            ${
              isDark
                ? "bg-slate-900/80 border-red-400/20"
                : "bg-white/80 border-red-200 shadow-md"
            }
          `}
        >
          <h2
            className={`text-xl font-bold ${
              isDark ? "text-white" : "text-slate-800"
            }`}
          >
            Weather Forecast
          </h2>

          <p className={`mt-2 ${isDark ? "text-red-300" : "text-red-500"}`}>
            {forecastError}
          </p>
        </div>
      </section>
    );
  }

  // ==========================================
  // NO FORECAST
  // ==========================================

  if (forecast.length === 0) {
    return null;
  }

  // ==========================================
  // FORECAST UI
  // ==========================================

  return (
    <section className="mt-10">
      {/* =========================
          Header
      ========================= */}

      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
        <div>
          <h2
            className={`text-2xl font-bold ${
              isDark ? "text-white" : "text-slate-800"
            }`}
          >
            Weather Forecast
          </h2>

          <p
            className={`text-sm mt-1 ${
              isDark ? "text-slate-400" : "text-slate-500"
            }`}
          >
            Real forecast data for {weather.city}
          </p>
        </div>

        <div
          className={`
            text-xs
            px-3
            py-2
            rounded-full
            border
            w-fit

            ${
              isDark
                ? "bg-cyan-500/10 border-cyan-500/20 text-cyan-300"
                : "bg-blue-50 border-blue-100 text-blue-600"
            }
          `}
        >
          5-Day Forecast
        </div>
      </div>

      {/* =========================
          Forecast Cards
      ========================= */}

      <div
        className="
          grid
          grid-cols-2
          sm:grid-cols-3
          lg:grid-cols-5
          gap-4
        "
      >
        {forecast.map((day, index) => (
          <div
            key={day.date}
            className={`
              relative
              overflow-hidden
              rounded-3xl
              p-5
              min-h-[250px]
              border
              transition-all
              duration-300
              hover:-translate-y-1

              ${
                isDark
                  ? "bg-slate-900/80 border-white/10 hover:border-cyan-400/30"
                  : "bg-white/80 border-pink-100 shadow-md hover:shadow-lg"
              }
            `}
          >
            {/* =========================
                Today / Day
            ========================= */}

            <div className="flex items-center justify-between">
              <p
                className={`font-semibold ${
                  isDark ? "text-white" : "text-slate-800"
                }`}
              >
                {index === 0 ? "Today" : formatDate(day.date)}
              </p>

              {index === 0 && (
                <span
                  className={`
                    text-[10px]
                    px-2
                    py-1
                    rounded-full

                    ${
                      isDark
                        ? "bg-cyan-500/10 text-cyan-300"
                        : "bg-blue-50 text-blue-600"
                    }
                  `}
                >
                  Now
                </span>
              )}
            </div>

            {/* =========================
                Icon
            ========================= */}

            <div className="mt-5">{getIcon(day.condition)}</div>

            {/* =========================
                Condition
            ========================= */}

            <p
              className={`mt-2 font-medium capitalize ${
                isDark ? "text-slate-200" : "text-slate-700"
              }`}
            >
              {day.description}
            </p>

            {/* =========================
                Temperature
            ========================= */}

            <div className="flex items-end gap-3 mt-4">
              <span
                className={`text-2xl font-bold ${
                  isDark ? "text-white" : "text-slate-800"
                }`}
              >
                {day.temp_max}°
              </span>

              <span
                className={`text-lg ${
                  isDark ? "text-slate-500" : "text-slate-400"
                }`}
              >
                {day.temp_min}°
              </span>
            </div>

            {/* =========================
                Extra Information
            ========================= */}

            <div
              className={`
                mt-4
                pt-3
                border-t
                flex
                justify-between
                text-xs

                ${
                  isDark
                    ? "border-white/10 text-slate-400"
                    : "border-slate-100 text-slate-500"
                }
              `}
            >
              <span>💧 {day.humidity}%</span>

              <span>💨 {day.wind_speed} m/s</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Forecast;
