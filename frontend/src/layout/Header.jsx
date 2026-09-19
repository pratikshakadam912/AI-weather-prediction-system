import { useContext, useState } from "react";

import { FaLocationCrosshairs, FaMoon, FaSun, FaClock } from "react-icons/fa6";

import { WeatherContext } from "../context/WeatherContext";
import { getWeatherByLocation } from "../api/WeatherApi";

function Header() {
  const today = new Date();

  const currentDate = today.toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const currentTime = today.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const hour = today.getHours();

  const {
    weather,
    setWeather,
    loading,
    setLoading,
    theme,
    setTheme,
    setLocation,
  } = useContext(WeatherContext);

  const [locationLoading, setLocationLoading] = useState(false);

  const isDark = theme === "dark";

  // =========================
  // Theme
  // =========================

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  // =========================
  // Current Location
  // =========================

  const handleCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    if (locationLoading || loading) {
      return;
    }

    setLocationLoading(true);
    setLoading(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude, accuracy } = position.coords;

          console.log("Current location:", {
            latitude,
            longitude,
            accuracy,
          });

          // =========================
          // Save exact GPS coordinates
          // =========================

          setLocation({
            lat: latitude,
            lon: longitude,
            accuracy,
          });

          // =========================
          // Get current weather
          // =========================

          const data = await getWeatherByLocation(latitude, longitude);

          if (!data) {
            throw new Error("No weather data received.");
          }

          setWeather(data);
        } catch (error) {
          console.error("Weather fetch error:", error);

          // Clear saved location if request failed
          setLocation(null);

          alert("Unable to fetch weather for your current location.");
        } finally {
          setLocationLoading(false);
          setLoading(false);
        }
      },

      (error) => {
        console.error("Geolocation error:", error);

        setLocationLoading(false);
        setLoading(false);

        switch (error.code) {
          case error.PERMISSION_DENIED:
            alert(
              "Location permission was denied. Please allow location access in your browser.",
            );
            break;

          case error.POSITION_UNAVAILABLE:
            alert(
              "Your current location could not be determined. Please try again.",
            );
            break;

          case error.TIMEOUT:
            alert("Location detection took too long. Please try again.");
            break;

          default:
            alert("Unable to detect your current location.");
        }
      },

      {
        // Ask browser/device for the most accurate
        // location available.
        enableHighAccuracy: true,

        // Don't wait forever for GPS/location.
        timeout: 15000,

        // Always request a fresh location.
        maximumAge: 0,
      },
    );
  };

  // =========================
  // Greeting
  // =========================

  let greeting = "Good Morning";

  if (hour >= 12 && hour < 17) {
    greeting = "Good Afternoon";
  } else if (hour >= 17) {
    greeting = "Good Evening";
  }

  return (
    <header
      className={`
        relative
        flex
        flex-col
        xl:flex-row
        xl:items-center
        justify-between
        gap-8
        mb-10
        transition-all
        duration-500

        ${
          isDark
            ? ""
            : "bg-white/40 backdrop-blur-xl rounded-3xl p-5 lg:p-6 border border-pink-100 shadow-lg"
        }
      `}
    >
      {/* =========================
          Mobile & Tablet Theme
      ========================= */}

      <button
        onClick={toggleTheme}
        className={`
          absolute
          top-5
          right-5
          xl:hidden

          w-12
          h-12
          lg:w-14
          lg:h-14

          rounded-2xl
          border
          backdrop-blur-xl
          flex
          items-center
          justify-center
          transition-all
          duration-300

          ${
            isDark
              ? "bg-slate-900/90 border-white/10"
              : "bg-gradient-to-br from-pink-100 via-white to-blue-100 border-pink-200 shadow-md"
          }
        `}
      >
        {isDark ? (
          <FaSun className="text-yellow-400 text-xl" />
        ) : (
          <FaMoon className="text-violet-500 text-xl" />
        )}
      </button>

      {/* =========================
          Left Content
      ========================= */}

      <div className="flex-1">
        <div
          className={`
            inline-flex
            w-fit
            items-center
            gap-2
            px-4
            py-2
            rounded-full
            border

            ${
              isDark
                ? "bg-cyan-500/10 border-cyan-500/20"
                : "bg-gradient-to-r from-pink-100 to-blue-100 border-pink-200"
            }
          `}
        >
          <span
            className={`
              w-2
              h-2
              rounded-full
              animate-pulse

              ${isDark ? "bg-cyan-400" : "bg-pink-500"}
            `}
          />

          <span
            className={`
              text-sm
              font-medium

              ${isDark ? "text-cyan-300" : "text-pink-600"}
            `}
          >
            AI Weather Assistant
          </span>
        </div>

        <h1
          className={`
            mt-5
            font-bold
            tracking-tight
            text-3xl
            sm:text-4xl
            lg:text-5xl

            ${isDark ? "text-white" : "text-slate-800"}
          `}
        >
          {greeting},
        </h1>

        <h2
          className={`
            mt-2
            font-semibold
            text-2xl
            sm:text-3xl
            lg:text-4xl

            ${isDark ? "text-slate-200" : "text-slate-700"}
          `}
        >
          Welcome Back 👋
        </h2>

        <p
          className={`
            mt-4
            text-sm
            sm:text-base
            lg:text-lg
            max-w-xl

            ${isDark ? "text-slate-400" : "text-slate-500"}
          `}
        >
          Live weather insights & AI-powered forecasting.
        </p>
      </div>

      {/* =========================
          Right Content
      ========================= */}

      <div
        className="
          flex
          flex-col
          sm:grid
          sm:grid-cols-2
          xl:flex
          xl:flex-row
          gap-4
          w-full
          xl:w-auto
        "
      >
        {/* =========================
            Date
        ========================= */}

        <div
          className={`
            flex
            items-center
            gap-4
            rounded-3xl
            px-5
            py-5
            min-h-[88px]
            w-full
            sm:w-full
            xl:min-w-[270px]
            transition-all
            duration-500

            ${
              isDark
                ? "bg-slate-900/90 border border-white/10"
                : "bg-white/80 border border-pink-100 shadow-md"
            }
          `}
        >
          <div
            className={`
              w-12
              h-12
              rounded-2xl
              flex
              items-center
              justify-center
              flex-shrink-0

              ${isDark ? "bg-cyan-500/15" : "bg-pink-100"}
            `}
          >
            <FaClock className={isDark ? "text-cyan-400" : "text-pink-500"} />
          </div>

          <div className="min-w-0">
            <p
              className={`font-semibold ${
                isDark ? "text-white" : "text-slate-800"
              }`}
            >
              {currentTime}
            </p>

            <p
              className={`text-sm break-words ${
                isDark ? "text-slate-400" : "text-slate-500"
              }`}
            >
              {currentDate}
            </p>
          </div>
        </div>

        {/* =========================
            Current Location
        ========================= */}

        <button
          onClick={handleCurrentLocation}
          disabled={locationLoading || loading}
          className={`
            flex
            items-center
            gap-4
            rounded-3xl
            px-5
            py-5
            min-h-[88px]
            w-full
            sm:w-full
            xl:min-w-[270px]
            transition-all
            duration-300

            disabled:opacity-60
            disabled:cursor-not-allowed

            ${
              isDark
                ? "bg-slate-900/90 border border-white/10 hover:border-cyan-400/40"
                : "bg-white/80 border border-blue-100 shadow-md hover:border-blue-300"
            }
          `}
        >
          <div
            className={`
              w-12
              h-12
              rounded-2xl
              flex
              items-center
              justify-center
              flex-shrink-0

              ${isDark ? "bg-cyan-500/15" : "bg-blue-100"}
            `}
          >
            <FaLocationCrosshairs
              className={`
                ${isDark ? "text-cyan-400" : "text-blue-500"}

                ${locationLoading ? "animate-spin" : ""}
              `}
            />
          </div>

          <div className="text-left min-w-0">
            <p
              className={`text-xs ${
                isDark ? "text-slate-400" : "text-slate-500"
              }`}
            >
              Current Location
            </p>

            <p
              className={`font-semibold truncate ${
                isDark ? "text-white" : "text-slate-800"
              }`}
            >
              {locationLoading
                ? "Detecting location..."
                : weather
                  ? `${weather.city}, ${weather.country}`
                  : "Use my location"}
            </p>
          </div>
        </button>

        {/* =========================
            Desktop Theme
        ========================= */}

        <button
          onClick={toggleTheme}
          className={`
            hidden
            xl:flex

            w-16
            h-16
            rounded-2xl
            border
            backdrop-blur-xl
            items-center
            justify-center
            transition-all
            duration-300
            hover:scale-105
            self-center

            ${
              isDark
                ? "bg-slate-900/90 border-white/10"
                : "bg-gradient-to-br from-pink-100 via-white to-blue-100 border-pink-200 shadow-md"
            }
          `}
        >
          {isDark ? (
            <FaSun className="text-yellow-400 text-xl" />
          ) : (
            <FaMoon className="text-violet-500 text-xl" />
          )}
        </button>
      </div>
    </header>
  );
}

export default Header;
