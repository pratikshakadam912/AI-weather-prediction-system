import { useContext } from "react";
import {
    FaRobot,
    FaTemperatureHigh,
    FaCloudRain,
    FaWind,
    FaCircleCheck,
} from "react-icons/fa6";

import { WeatherContext } from "../context/WeatherContext";
import predictBg from "../assets/predict.jpg";

function PredictionCard() {

    const { weather, theme } = useContext(WeatherContext);

    const isDark = theme === "dark";

    if (!weather) return null;

    // Temporary values until AI model is ready
    const confidence = 94;

    const rainChance =
        weather.condition === "Rain"
            ? 90
            : weather.condition === "Clouds"
                ? 40
                : 10;

    const recommendation =
        weather.condition === "Rain"
            ? "Carry an umbrella. Rain is expected tomorrow."
            : weather.condition === "Clouds"
                ? "Cloudy weather expected. Pleasant conditions throughout the day."
                : "Clear weather expected. Great day for outdoor activities.";

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

                ${isDark
                    ? "bg-slate-900 border border-slate-800 hover:shadow-violet-500/20"
                    : "bg-white/80 border border-pink-100 shadow-lg hover:shadow-pink-200"
                }
            `}
        >

            {/* Background */}

            <img
                src={predictBg}
                alt=""
                className="absolute right-[-40px] top-0 h-full w-56 object-cover opacity-40 pointer-events-none select-none"
            />

            <div
                className={`absolute inset-0 ${isDark
                        ? "bg-gradient-to-r from-slate-900 via-slate-900/95 to-slate-900/70"
                        : "bg-gradient-to-r from-white/80 via-white/60 to-pink-50/40"
                    }`}
            ></div>

            <div className="relative z-10 flex flex-col h-full">

                {/* Header */}

                <div className="p-8 pb-4">

                    <div className="flex items-start justify-between">

                        <div className="flex items-center gap-4">

                            <div
                                className={`
                                    w-14
                                    h-14
                                    rounded-2xl
                                    backdrop-blur-md
                                    flex
                                    items-center
                                    justify-center

                                    ${isDark
                                        ? "bg-violet-500/15 border border-violet-400/20"
                                        : "bg-pink-100 border border-pink-200"
                                    }
                                `}
                            >

                                <FaRobot
                                    className={`text-2xl ${isDark
                                            ? "text-violet-300"
                                            : "text-pink-500"
                                        }`}
                                />

                            </div>

                            <div>

                                <span
                                    className={`text-sm font-medium tracking-wide uppercase ${isDark
                                            ? "text-violet-300"
                                            : "text-pink-600"
                                        }`}
                                >
                                    AI Powered
                                </span>

                                <h2
                                    className={`text-2xl font-bold mt-1 ${isDark
                                            ? "text-white"
                                            : "text-slate-800"
                                        }`}
                                >
                                    Weather Prediction
                                </h2>

                                <p
                                    className={`text-sm mt-1 ${isDark
                                            ? "text-slate-400"
                                            : "text-slate-500"
                                        }`}
                                >
                                    Tomorrow's Forecast
                                </p>

                            </div>

                        </div>

                        <div
                            className={`
                                px-3
                                py-1.5
                                rounded-full

                                ${isDark
                                    ? "bg-violet-500/15 border border-violet-400/20"
                                    : "bg-pink-100 border border-pink-200"
                                }
                            `}
                        >

                            <span
                                className={`text-sm font-medium ${isDark
                                        ? "text-violet-300"
                                        : "text-pink-600"
                                    }`}
                            >
                                +1 Day
                            </span>

                        </div>

                    </div>

                </div>

                {/* Body */}

                <div className="flex-1 p-8 flex flex-col justify-between">

                    <div>

                        <h1
                            className={`text-7xl font-bold leading-none ${isDark
                                    ? "text-white"
                                    : "text-slate-800"
                                }`}
                        >
                            {weather.temperature}°
                        </h1>

                        <p
                            className={`text-3xl font-semibold mt-2 capitalize ${isDark
                                    ? "text-white"
                                    : "text-slate-700"
                                }`}
                        >
                            {weather.description}
                        </p>

                        <p
                            className={`mt-2 ${isDark
                                    ? "text-slate-400"
                                    : "text-slate-500"
                                }`}
                        >
                            Feels like {weather.feels_like}° • Humidity {weather.humidity}%
                        </p>

                        <div
                            className={`
                                inline-flex
                                items-center
                                gap-2
                                px-4
                                py-2
                                rounded-full
                                mt-5

                                ${isDark
                                    ? "bg-green-500/20"
                                    : "bg-green-100"
                                }
                            `}
                        >

                            <FaCircleCheck className="text-green-500" />

                            <span
                                className={`font-medium ${isDark
                                        ? "text-green-300"
                                        : "text-green-700"
                                    }`}
                            >
                                {confidence}% Confidence
                            </span>

                        </div>

                    </div>

                    {/* Prediction Details */}

                    <div className="space-y-6 mt-10">                         <PredictionItem
                        icon={<FaTemperatureHigh className="text-orange-400" />}
                        title="Temperature"
                        value={`${weather.temperature}°C`}
                        progress={Math.min(weather.temperature * 3, 100)}
                        color="bg-orange-400"
                    />

                        <PredictionItem
                            icon={<FaCloudRain className="text-blue-400" />}
                            title="Rain Chance"
                            value={`${rainChance}%`}
                            progress={rainChance}
                            color="bg-blue-400"
                        />

                        <PredictionItem
                            icon={<FaWind className="text-green-400" />}
                            title="Wind Speed"
                            value={`${weather.wind_speed} m/s`}
                            progress={Math.min(weather.wind_speed * 10, 100)}
                            color="bg-green-400"
                        />

                    </div>

                    {/* AI Recommendation */}

                    <div
                        className={`
                            mt-8
                            rounded-2xl
                            backdrop-blur-md
                            p-5
                            transition-all
                            duration-500

                            ${isDark
                                ? "bg-slate-800/70 border border-white/10"
                                : "bg-white border border-pink-100 shadow-sm"
                            }
                        `}
                    >

                        <h3
                            className={`text-lg font-semibold mb-3 ${isDark
                                    ? "text-white"
                                    : "text-slate-800"
                                }`}
                        >
                            🤖 AI Recommendation
                        </h3>

                        <p
                            className={`leading-7 ${isDark
                                    ? "text-slate-300"
                                    : "text-slate-600"
                                }`}
                        >
                            {recommendation}
                        </p>

                    </div>

                </div>

            </div>

        </div>
    );
}

function PredictionItem({
    icon,
    title,
    value,
    progress,
    color,
}) {

    const { theme } = useContext(WeatherContext);

    const isDark = theme === "dark";

    return (

        <div>

            <div className="flex justify-between items-center mb-2">

                <div className="flex items-center gap-3">

                    {icon}

                    <span
                        className={`${isDark
                                ? "text-white"
                                : "text-slate-800"
                            }`}
                    >
                        {title}
                    </span>

                </div>

                <span
                    className={`font-semibold ${isDark
                            ? "text-slate-300"
                            : "text-slate-600"
                        }`}
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

                    ${isDark
                        ? "bg-slate-700"
                        : "bg-slate-200"
                    }
                `}
            >

                <div
                    className={`h-full ${color} rounded-full`}
                    style={{ width: `${progress}%` }}
                />

            </div>

        </div>

    );
}

export default PredictionCard;