import { useContext } from "react";
import {
    WiDaySunny,
    WiRain,
    WiCloud,
    WiDayCloudy,
    WiThunderstorm,
} from "react-icons/wi";

import { WeatherContext } from "../context/WeatherContext";

function Forecast() {

    const { weather, theme } = useContext(WeatherContext);

    const isDark = theme === "dark";

    if (!weather) return null;

    const getIcon = (condition) => {
        switch (condition) {
            case "Clear":
                return <WiDaySunny size={52} className="text-yellow-400" />;

            case "Rain":
                return <WiRain size={52} className="text-blue-400" />;

            case "Clouds":
                return <WiCloud size={52} className="text-slate-300" />;

            case "Thunderstorm":
                return <WiThunderstorm size={52} className="text-violet-400" />;

            default:
                return <WiDayCloudy size={52} className="text-cyan-400" />;
        }
    };

    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

    const forecast = days.map((day, index) => ({
        day,
        icon: getIcon(weather.condition),
        weather: weather.condition,
        high: `${weather.temp_max + Math.floor(index / 2)}°`,
        low: `${weather.temp_min - (index % 2)}°`,
    }));

    return (

        <section className="mt-10">

            <div className="flex items-center justify-between mb-6">

                <div>

                    <p
                        className={`uppercase tracking-widest text-xs font-semibold ${isDark
                                ? "text-cyan-400"
                                : "text-pink-500"
                            }`}
                    >
                        Weekly Outlook
                    </p>

                    <h2
                        className={`text-3xl font-bold mt-1 ${isDark
                                ? "text-white"
                                : "text-slate-800"
                            }`}
                    >
                        7-Day Forecast
                    </h2>

                </div>

                <div
                    className={`
                        px-4
                        py-2
                        rounded-full

                        ${isDark
                            ? "bg-cyan-500/10 border border-cyan-500/20"
                            : "bg-pink-100 border border-pink-200"
                        }
                    `}
                >

                    <span
                        className={`text-sm font-medium ${isDark
                                ? "text-cyan-300"
                                : "text-pink-600"
                            }`}
                    >
                        Next 7 Days
                    </span>

                </div>

            </div>

            <div className="grid grid-cols-7 gap-4">

                {forecast.map((item, index) => (

                    <div
                        key={index}
                        className={`
                            group
                            rounded-3xl
                            p-5
                            text-center
                            transition-all
                            duration-300
                            hover:-translate-y-2

                            ${isDark
                                ? "bg-slate-900 border border-white/10 hover:border-cyan-400/50 hover:shadow-[0_0_25px_rgba(34,211,238,0.15)]"
                                : "bg-white border border-pink-100 hover:border-pink-300 hover:shadow-lg"
                            }
                        `}
                    >

                        <h3
                            className={`font-semibold text-lg ${isDark
                                    ? "text-white"
                                    : "text-slate-800"
                                }`}
                        >
                            {item.day}
                        </h3>

                        <div className="flex justify-center my-4">

                            <div
                                className={`
                                    w-16
                                    h-16
                                    rounded-2xl
                                    flex
                                    items-center
                                    justify-center

                                    ${isDark
                                        ? "bg-white/5 border border-white/10"
                                        : "bg-slate-50 border border-slate-200"
                                    }
                                `}
                            >
                                {item.icon}
                            </div>

                        </div>

                        <p
                            className={`text-sm ${isDark
                                    ? "text-slate-400"
                                    : "text-slate-500"
                                }`}
                        >
                            {item.weather}
                        </p>

                        <div className="mt-5">

                            <p
                                className={`text-2xl font-bold ${isDark
                                        ? "text-white"
                                        : "text-slate-800"
                                    }`}
                            >
                                {item.high}
                            </p>

                            <p
                                className={`mt-1 ${isDark
                                        ? "text-slate-500"
                                        : "text-slate-400"
                                    }`}
                            >
                                {item.low}
                            </p>

                        </div>

                    </div>

                ))}

            </div>

        </section>

    );
}

export default Forecast;