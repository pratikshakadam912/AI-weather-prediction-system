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
    const { weather } = useContext(WeatherContext);

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
        <div className="relative bg-slate-900 border border-slate-800 rounded-3xl shadow-xl overflow-hidden hover:shadow-violet-500/20 transition-all duration-300 h-full flex flex-col">

            {/* Background */}

            <img
                src={predictBg}
                alt=""
                className="absolute right-[-40px] top-0 h-full w-56 object-cover opacity-40 pointer-events-none select-none"
            />

            <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/95 to-slate-900/70"></div>

            <div className="relative z-10 flex flex-col h-full">

                {/* Header */}

                <div className="p-8 pb-4">

                    <div className="flex items-start justify-between">

                        <div className="flex items-center gap-4">

                            <div className="w-14 h-14 rounded-2xl bg-violet-500/15 border border-violet-400/20 backdrop-blur-md flex items-center justify-center">

                                <FaRobot className="text-2xl text-violet-300" />

                            </div>

                            <div>

                                <span className="text-violet-300 text-sm font-medium tracking-wide uppercase">
                                    AI Powered
                                </span>

                                <h2 className="text-2xl font-bold text-white mt-1">
                                    Weather Prediction
                                </h2>

                                <p className="text-slate-400 text-sm mt-1">
                                    Tomorrow's Forecast
                                </p>

                            </div>

                        </div>

                        <div className="px-3 py-1.5 rounded-full bg-violet-500/15 border border-violet-400/20">

                            <span className="text-violet-300 text-sm font-medium">
                                +1 Day
                            </span>

                        </div>

                    </div>

                </div>

                {/* Body */}

                <div className="flex-1 p-8 flex flex-col justify-between">

                    <div>

                        <h1 className="text-7xl font-bold text-white leading-none">
                            {weather.temperature}°
                        </h1>

                        <p className="text-3xl font-semibold text-white mt-2 capitalize">
                            {weather.description}
                        </p>

                        <p className="text-slate-400 mt-2">
                            Feels like {weather.feels_like}° • Humidity {weather.humidity}%
                        </p>

                        <div className="inline-flex items-center gap-2 bg-green-500/20 backdrop-blur-sm px-4 py-2 rounded-full mt-5">

                            <FaCircleCheck className="text-green-400" />

                            <span className="text-green-300 font-medium">
                                {confidence}% Confidence
                            </span>

                        </div>

                    </div>

                    {/* Prediction Details */}

                    <div className="space-y-6 mt-10">

                        <PredictionItem
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

                    <div className="mt-8 rounded-2xl bg-slate-800/70 backdrop-blur-md border border-white/10 p-5">

                        <h3 className="text-lg font-semibold text-white mb-3">
                            🤖 AI Recommendation
                        </h3>

                        <p className="text-slate-300 leading-7">
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
    return (
        <div>

            <div className="flex justify-between items-center mb-2">

                <div className="flex items-center gap-3">

                    {icon}

                    <span className="text-white">
                        {title}
                    </span>

                </div>

                <span className="text-slate-300 font-semibold">
                    {value}
                </span>

            </div>

            <div className="w-full h-2 rounded-full bg-slate-700 overflow-hidden">

                <div
                    className={`h-full ${color} rounded-full`}
                    style={{ width: `${progress}%` }}
                />

            </div>

        </div>
    );
}

export default PredictionCard;