import { useContext } from "react";
import {
  FaLocationDot,
  FaArrowUp,
  FaArrowDown,
  FaDroplet,
  FaWind,
} from "react-icons/fa6";

import { WiDaySunny } from "react-icons/wi";
import { WeatherContext } from "../context/WeatherContext";
import skyBg from "../assets/sky-bg.jpg";

function CurrentWeather() {
  const { weather, theme } = useContext(WeatherContext);

  const isDark = theme === "dark";

  if (!weather) return null;

  return (
    <div
      className={`
        rounded-3xl
        shadow-xl
        overflow-hidden
        transition-all
        duration-500

        ${
          isDark
            ? "bg-slate-900 border border-slate-800 hover:shadow-cyan-500/20"
            : "bg-white/80 border border-pink-100 shadow-lg hover:shadow-pink-200"
        }
      `}
    >
      <div
        className="relative p-5 sm:p-6 lg:p-8 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${skyBg})`,
        }}
      >
        <div
          className={`absolute inset-0 ${
            isDark ? "bg-slate-900/35" : "bg-white/20"
          }`}
        ></div>

        <div className="relative">
          {/* Location */}

          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
            <div>
              <div className="flex items-center gap-2">
                <FaLocationDot
                  className={`text-lg ${
                    isDark ? "text-white" : "text-pink-600"
                  }`}
                />

                <h2
                  className={`text-xl sm:text-2xl lg:text-3xl font-bold ${
                    isDark ? "text-white" : "text-slate-800"
                  }`}
                >
                  {weather.city}, {weather.country}
                </h2>
              </div>

              <p
                className={`mt-2 ${
                  isDark ? "text-slate-200" : "text-slate-700"
                }`}
              >
                Live Weather
              </p>
            </div>

            <span
              className={`
                self-start
                sm:self-auto
                px-3
                sm:px-4
                py-2
                rounded-full
                text-sm
                backdrop-blur-sm

                ${
                  isDark
                    ? "bg-white/15 text-white"
                    : "bg-pink-100 text-pink-700"
                }
              `}
            >
              Live
            </span>
          </div>

          {/* Weather */}

          <div className="mt-8 sm:mt-10 flex flex-col items-center text-center">
            <div
              className={`
                w-24
                h-24
                sm:w-28
                sm:h-28
                rounded-full
                backdrop-blur-md
                flex
                items-center
                justify-center
                shadow-lg

                ${isDark ? "bg-white/10" : "bg-white/70"}
              `}
            >
              <WiDaySunny className="text-yellow-300 text-6xl sm:text-7xl drop-shadow-xl" />
            </div>

            <h1
              className={`text-5xl sm:text-6xl lg:text-7xl font-bold mt-6 ${
                isDark ? "text-white" : "text-slate-800"
              }`}
            >
              {weather.temperature}°
            </h1>

            <p
              className={`text-xl sm:text-2xl mt-2 capitalize ${
                isDark ? "text-white" : "text-slate-700"
              }`}
            >
              {weather.description}
            </p>

            <p
              className={`mt-2 ${isDark ? "text-slate-200" : "text-slate-600"}`}
            >
              Feels Like {weather.feels_like}°
            </p>
          </div>
        </div>
      </div>
      {/* Bottom Stats */}

      <div
        className={`
          grid
          grid-cols-2
          lg:grid-cols-4
          gap-4
          p-4
          sm:p-6

          ${isDark ? "bg-slate-900" : "bg-white"}
        `}
      >
        <WeatherStat
          icon={<FaArrowUp />}
          title="High"
          value={`${weather.temp_max}°`}
          color="text-red-400"
        />

        <WeatherStat
          icon={<FaArrowDown />}
          title="Low"
          value={`${weather.temp_min}°`}
          color="text-cyan-400"
        />

        <WeatherStat
          icon={<FaDroplet />}
          title="Humidity"
          value={`${weather.humidity}%`}
          color="text-blue-400"
        />

        <WeatherStat
          icon={<FaWind />}
          title="Wind"
          value={`${weather.wind_speed} m/s`}
          color="text-green-400"
        />
      </div>
    </div>
  );
}

function WeatherStat({ icon, title, value, color }) {
  const { theme } = useContext(WeatherContext);

  const isDark = theme === "dark";

  return (
    <div
      className={`
        rounded-2xl
        p-4
        sm:p-5
        text-center
        transition-all
        duration-300

        ${
          isDark
            ? "bg-slate-800 hover:bg-slate-700"
            : "bg-slate-50 hover:bg-pink-50 border border-slate-200"
        }
      `}
    >
      <div className={`text-xl sm:text-2xl flex justify-center ${color}`}>
        {icon}
      </div>

      <p
        className={`text-sm mt-3 ${
          isDark ? "text-slate-300" : "text-slate-500"
        }`}
      >
        {title}
      </p>

      <h3
        className={`text-xl sm:text-2xl font-bold mt-2 ${
          isDark ? "text-white" : "text-slate-800"
        }`}
      >
        {value}
      </h3>
    </div>
  );
}

export default CurrentWeather;
