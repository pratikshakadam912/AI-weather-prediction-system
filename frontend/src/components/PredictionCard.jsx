import { useContext, useEffect } from "react";
import {
  FaRobot,
  FaTemperatureHigh,
  FaCloudRain,
  FaWind,
  FaCircleCheck,
} from "react-icons/fa6";

import { WeatherContext } from "../context/WeatherContext";
import { getPrediction } from "../api/WeatherApi";

import predictBg from "../assets/predict.jpg";

function PredictionCard() {
  const {
    weather,
    prediction,
    setPrediction,
    predictionLoading,
    setPredictionLoading,
  } = useContext(WeatherContext);

  const { theme } = useContext(WeatherContext);

  const isDark = theme === "dark";

  /*
   * ==========================================
   * GENERATE PREDICTION WHEN WEATHER CHANGES
   * ==========================================
   */

  useEffect(() => {
    if (!weather?.city) {
      return;
    }

    const fetchPrediction = async () => {
      try {
        setPredictionLoading(true);

        const data = await getPrediction(weather.city);

        console.log("Prediction response:", data);

        setPrediction(data);
      } catch (error) {
        console.error("Prediction error:", error);

        setPrediction(null);
      } finally {
        setPredictionLoading(false);
      }
    };

    fetchPrediction();
  }, [weather?.city, setPrediction, setPredictionLoading]);

  /*
   * ==========================================
   * NO WEATHER
   * ==========================================
   */

  if (!weather) {
    return null;
  }

  /*
   * ==========================================
   * LOADING
   * ==========================================
   */

  if (predictionLoading) {
    return (
      <div
        className={`
          relative
          rounded-3xl
          overflow-hidden
          h-full
          min-h-[500px]
          flex
          items-center
          justify-center
          transition-all
          duration-500

          ${
            isDark
              ? "bg-slate-900 border border-slate-800"
              : "bg-white/80 border border-pink-100 shadow-lg"
          }
        `}
      >
        <img
          src={predictBg}
          alt=""
          className="
            absolute
            right-[-20px]
            lg:right-[-40px]
            top-0
            h-full
            w-40
            sm:w-48
            lg:w-56
            object-cover
            opacity-20
            pointer-events-none
            select-none
          "
        />

        <div
          className={`
            absolute
            inset-0

            ${
              isDark
                ? "bg-gradient-to-r from-slate-900 via-slate-900/95 to-slate-900/70"
                : "bg-gradient-to-r from-white/90 via-white/70 to-pink-50/50"
            }
          `}
        />

        <div className="relative z-10 text-center p-8">
          <div
            className={`
              mx-auto
              w-16
              h-16
              rounded-2xl
              flex
              items-center
              justify-center

              ${
                isDark
                  ? "bg-violet-500/15 border border-violet-400/20"
                  : "bg-pink-100 border border-pink-200"
              }
            `}
          >
            <FaRobot
              className={`
                text-2xl
                animate-pulse

                ${isDark ? "text-violet-300" : "text-pink-500"}
              `}
            />
          </div>

          <h2
            className={`
              text-xl
              sm:text-2xl
              font-bold
              mt-5

              ${isDark ? "text-white" : "text-slate-800"}
            `}
          >
            Generating AI Prediction...
          </h2>

          <p
            className={`
              mt-2
              text-sm
              sm:text-base

              ${isDark ? "text-slate-400" : "text-slate-500"}
            `}
          >
            Analyzing tomorrow's weather for{" "}
            <span className="font-semibold">{weather.city}</span>
          </p>
        </div>
      </div>
    );
  }

  /*
   * ==========================================
   * PREDICTION DATA
   * ==========================================
   */

  const data = prediction?.prediction || prediction || {};

  const predictedTemperature =
    data?.predicted_temperature ?? weather.temperature;

  const confidence = data?.confidence ?? 0;

  const rainChance = data?.rain_probability ?? 0;

  const predictedCondition =
    data?.predicted_condition ?? weather.condition ?? "Unknown";

  const recommendation =
    data?.recommendation ??
    "Prediction generated based on the available weather data.";

  const temperatureChange =
    data?.temperature_change ?? predictedTemperature - weather.temperature;

  /*
   * ==========================================
   * UI
   * ==========================================
   */

  return (
    <div
      className={`
        relative
        rounded-3xl
        overflow-hidden
        h-full
        flex
        flex-col
        transition-all
        duration-500

        ${
          isDark
            ? "bg-slate-900 border border-slate-800 hover:shadow-violet-500/20"
            : "bg-white/80 border border-pink-100 shadow-lg hover:shadow-pink-200"
        }
      `}
    >
      {/* Background */}

      <img
        src={predictBg}
        alt=""
        className="
          absolute
          right-[-20px]
          lg:right-[-40px]
          top-0
          h-full
          w-40
          sm:w-48
          lg:w-56
          object-cover
          opacity-40
          pointer-events-none
          select-none
        "
      />

      <div
        className={`
          absolute
          inset-0

          ${
            isDark
              ? "bg-gradient-to-r from-slate-900 via-slate-900/95 to-slate-900/70"
              : "bg-gradient-to-r from-white/80 via-white/60 to-pink-50/40"
          }
        `}
      />

      <div className="relative z-10 flex flex-col h-full">
        {/* =====================================
            HEADER
        ===================================== */}

        <div className="p-5 sm:p-6 lg:p-8 pb-4">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-5">
            <div className="flex items-center gap-4">
              <div
                className={`
                  w-12
                  h-12
                  sm:w-14
                  sm:h-14
                  rounded-2xl
                  backdrop-blur-md
                  flex
                  items-center
                  justify-center

                  ${
                    isDark
                      ? "bg-violet-500/15 border border-violet-400/20"
                      : "bg-pink-100 border border-pink-200"
                  }
                `}
              >
                <FaRobot
                  className={`
                    text-xl
                    sm:text-2xl

                    ${isDark ? "text-violet-300" : "text-pink-500"}
                  `}
                />
              </div>

              <div>
                <span
                  className={`
                    text-xs
                    sm:text-sm
                    font-medium
                    tracking-wide
                    uppercase

                    ${isDark ? "text-violet-300" : "text-pink-600"}
                  `}
                >
                  AI Powered
                </span>

                <h2
                  className={`
                    text-xl
                    sm:text-2xl
                    font-bold
                    mt-1

                    ${isDark ? "text-white" : "text-slate-800"}
                  `}
                >
                  Weather Prediction
                </h2>

                <p
                  className={`
                    text-sm
                    mt-1

                    ${isDark ? "text-slate-400" : "text-slate-500"}
                  `}
                >
                  Tomorrow's Forecast
                </p>
              </div>
            </div>

            <div
              className={`
                self-start
                sm:self-auto
                px-3
                py-1.5
                rounded-full

                ${
                  isDark
                    ? "bg-violet-500/15 border border-violet-400/20"
                    : "bg-pink-100 border border-pink-200"
                }
              `}
            >
              <span
                className={`
                  text-sm
                  font-medium

                  ${isDark ? "text-violet-300" : "text-pink-600"}
                `}
              >
                +1 Day
              </span>
            </div>
          </div>
        </div>

        {/* =====================================
            BODY
        ===================================== */}

        <div
          className="
            flex-1
            p-5
            sm:p-6
            lg:p-8
            flex
            flex-col
            justify-between
          "
        >
          <div>
            {/* Predicted Temperature */}

            <h1
              className={`
                text-5xl
                sm:text-6xl
                lg:text-7xl
                font-bold
                leading-none

                ${isDark ? "text-white" : "text-slate-800"}
              `}
            >
              {predictedTemperature}°
            </h1>

            {/* Predicted Condition */}

            <p
              className={`
                text-xl
                sm:text-2xl
                lg:text-3xl
                font-semibold
                mt-2
                capitalize

                ${isDark ? "text-white" : "text-slate-700"}
              `}
            >
              {predictedCondition}
            </p>

            {/* Location */}

            <p
              className={`
                mt-2
                text-sm
                sm:text-base

                ${isDark ? "text-slate-400" : "text-slate-500"}
              `}
            >
              📍 {weather.city}
              {weather.country ? `, ${weather.country}` : ""}
            </p>

            {/* Temperature Change */}

            <p
              className={`
                mt-2
                text-sm

                ${isDark ? "text-slate-400" : "text-slate-500"}
              `}
            >
              {temperatureChange > 0
                ? `Temperature may increase by ${temperatureChange}°C`
                : temperatureChange < 0
                  ? `Temperature may decrease by ${Math.abs(
                      temperatureChange,
                    )}°C`
                  : "Temperature may remain stable"}
            </p>

            {/* Confidence */}

            <div
              className={`
                inline-flex
                items-center
                gap-2
                px-3
                sm:px-4
                py-2
                rounded-full
                mt-5

                ${isDark ? "bg-green-500/20" : "bg-green-100"}
              `}
            >
              <FaCircleCheck className="text-green-500 text-sm sm:text-base" />

              <span
                className={`
                  text-sm
                  sm:text-base
                  font-medium

                  ${isDark ? "text-green-300" : "text-green-700"}
                `}
              >
                {confidence > 0
                  ? `${confidence}% Confidence`
                  : "Prediction Generated"}
              </span>
            </div>
          </div>

          {/* =====================================
              PREDICTION DETAILS
          ===================================== */}

          <div className="space-y-5 sm:space-y-6 mt-8">
            <PredictionItem
              icon={<FaTemperatureHigh className="text-orange-400" />}
              title="Temperature"
              value={`${predictedTemperature}°C`}
              progress={Math.min(
                Math.max(Number(predictedTemperature) * 3, 0),
                100,
              )}
              color="bg-orange-400"
            />

            <PredictionItem
              icon={<FaCloudRain className="text-blue-400" />}
              title="Rain Chance"
              value={`${rainChance}%`}
              progress={Math.min(Math.max(Number(rainChance), 0), 100)}
              color="bg-blue-400"
            />

            <PredictionItem
              icon={<FaWind className="text-green-400" />}
              title="Current Wind"
              value={`${weather.wind_speed ?? "--"} m/s`}
              progress={Math.min(
                Math.max(Number(weather.wind_speed) * 10, 0),
                100,
              )}
              color="bg-green-400"
            />
          </div>

          {/* =====================================
              AI RECOMMENDATION
          ===================================== */}

          <div
            className={`
              mt-8
              rounded-2xl
              backdrop-blur-md
              p-4
              sm:p-5
              transition-all
              duration-500

              ${
                isDark
                  ? "bg-slate-800/70 border border-white/10"
                  : "bg-white border border-pink-100 shadow-sm"
              }
            `}
          >
            <h3
              className={`
                text-base
                sm:text-lg
                font-semibold
                mb-3

                ${isDark ? "text-white" : "text-slate-800"}
              `}
            >
              🤖 AI Recommendation
            </h3>

            <p
              className={`
                leading-6
                sm:leading-7
                text-sm
                sm:text-base

                ${isDark ? "text-slate-300" : "text-slate-600"}
              `}
            >
              {recommendation}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/*
 * ==========================================
 * PREDICTION ITEM
 * ==========================================
 */

function PredictionItem({ icon, title, value, progress, color }) {
  const { theme } = useContext(WeatherContext);

  const isDark = theme === "dark";

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-3">
          {icon}

          <span className={isDark ? "text-white" : "text-slate-800"}>
            {title}
          </span>
        </div>

        <span
          className={`
            font-semibold

            ${isDark ? "text-slate-300" : "text-slate-600"}
          `}
        >
          {value}
        </span>
      </div>

      <div
        className={`
          w-full
          h-2
          rounded-full
          overflow-hidden

          ${isDark ? "bg-slate-700" : "bg-slate-200"}
        `}
      >
        <div
          className={`
            h-full
            ${color}
            rounded-full
            transition-all
            duration-700
          `}
          style={{
            width: `${Math.min(Math.max(Number(progress) || 0, 0), 100)}%`,
          }}
        />
      </div>
    </div>
  );
}

export default PredictionCard;
