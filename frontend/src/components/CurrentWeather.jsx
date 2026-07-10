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
    const { weather } = useContext(WeatherContext);

    if (!weather) return null;

    return (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl shadow-xl overflow-hidden hover:shadow-cyan-500/20 transition-all duration-300">

            <div
                className="relative p-8 bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: `url(${skyBg})`,
                }}
            >
                <div className="absolute inset-0 bg-slate-900/35"></div>

                <div className="relative">

                    {/* Location */}

                    <div className="flex justify-between items-start">

                        <div>

                            <div className="flex items-center gap-2">

                                <FaLocationDot className="text-white text-lg" />

                                <h2 className="text-2xl font-bold text-white">
                                    {weather.city}, {weather.country}
                                </h2>

                            </div>

                            <p className="text-slate-200 mt-2">
                                Live Weather
                            </p>

                        </div>

                        <span className="px-4 py-2 rounded-full bg-white/15 text-sm text-white backdrop-blur-sm">
                            Live
                        </span>

                    </div>

                    {/* Weather */}

                    <div className="mt-10 flex flex-col items-center text-center">

                        <div className="w-28 h-28 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center shadow-lg">

                            <WiDaySunny className="text-yellow-300 text-7xl drop-shadow-xl" />

                        </div>

                        <h1 className="text-6xl font-bold text-white mt-6">
                            {weather.temperature}°
                        </h1>

                        <p className="text-2xl text-white mt-2 capitalize">
                            {weather.description}
                        </p>

                        <p className="text-slate-200 mt-2">
                            Feels Like {weather.feels_like}°
                        </p>

                    </div>

                </div>

            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-slate-900">

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
    return (
        <div className="bg-slate-800 rounded-2xl p-5 text-center hover:bg-slate-700 transition-all duration-300">

            <div className={`text-2xl flex justify-center ${color}`}>
                {icon}
            </div>

            <p className="text-slate-300 text-sm mt-3">
                {title}
            </p>

            <h3 className="text-white text-2xl font-bold mt-2">
                {value}
            </h3>

        </div>
    );
}

export default CurrentWeather;