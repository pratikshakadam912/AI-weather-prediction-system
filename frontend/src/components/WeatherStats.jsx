import { useContext } from "react";
import {
    FaTint,
    FaWind,
    FaCompressAlt,
    FaEye,
} from "react-icons/fa";

import { WeatherContext } from "../context/WeatherContext";

function WeatherStats() {

    const { weather, theme } = useContext(WeatherContext);

    const isDark = theme === "dark";

    if (!weather) return null;

    const stats = [
        {
            title: "Humidity",
            value: `${weather.humidity}%`,
            subtitle:
                weather.humidity > 80
                    ? "Very Humid"
                    : weather.humidity > 60
                        ? "Humid"
                        : "Comfortable",
            progress: `${weather.humidity}%`,
            color: "from-blue-500 to-cyan-400",
            icon: <FaTint />,
        },
        {
            title: "Wind",
            value: `${weather.wind_speed} m/s`,
            subtitle:
                weather.wind_speed > 8
                    ? "Strong Wind"
                    : weather.wind_speed > 4
                        ? "Moderate"
                        : "Light Breeze",
            progress: `${Math.min(weather.wind_speed * 10, 100)}%`,
            color: "from-green-500 to-emerald-400",
            icon: <FaWind />,
        },
        {
            title: "Pressure",
            value: `${weather.pressure} hPa`,
            subtitle:
                weather.pressure > 1015
                    ? "High"
                    : weather.pressure < 1000
                        ? "Low"
                        : "Stable",
            progress: `${Math.min((weather.pressure - 900) / 2, 100)}%`,
            color: "from-orange-500 to-yellow-400",
            icon: <FaCompressAlt />,
        },
        {
            title: "Visibility",
            value: `${weather.visibility} km`,
            subtitle:
                weather.visibility > 8
                    ? "Excellent"
                    : weather.visibility > 5
                        ? "Good"
                        : "Poor",
            progress: `${Math.min(weather.visibility * 10, 100)}%`,
            color: "from-violet-500 to-fuchsia-500",
            icon: <FaEye />,
        },
    ];

    return (
        <section className="mt-10">

            <div className="flex items-center justify-between mb-8">

                <div>

                    <p
                        className={`uppercase tracking-widest text-sm font-semibold ${isDark
                                ? "text-cyan-400"
                                : "text-pink-500"
                            }`}
                    >
                        Today's Conditions
                    </p>

                    <h2
                        className={`text-3xl font-bold mt-1 ${isDark
                                ? "text-white"
                                : "text-slate-800"
                            }`}
                    >
                        Weather Details
                    </h2>

                </div>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

                {stats.map((item, index) => (

                    <div
                        key={index}
                        className={`
                            group
                            relative
                            overflow-hidden
                            rounded-3xl
                            p-6
                            transition-all
                            duration-300
                            hover:-translate-y-2

                            ${isDark
                                ? "border border-white/10 bg-slate-900/90 hover:border-cyan-400/50 hover:shadow-[0_0_30px_rgba(34,211,238,0.15)]"
                                : "border border-pink-100 bg-white hover:border-pink-300 hover:shadow-lg"
                            }
                        `}
                    >

                        <div
                            className={`absolute -right-10 -top-10 w-36 h-36 rounded-full bg-gradient-to-br ${item.color} opacity-10 blur-3xl group-hover:opacity-20 transition`}
                        />

                        <div
                            className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white text-2xl shadow-lg`}
                        >
                            {item.icon}
                        </div>

                        <p
                            className={`mt-6 text-sm tracking-wide uppercase ${isDark
                                    ? "text-slate-400"
                                    : "text-slate-500"
                                }`}
                        >
                            {item.title}
                        </p>

                        <h2
                            className={`text-4xl font-bold mt-2 ${isDark
                                    ? "text-white"
                                    : "text-slate-800"
                                }`}
                        >
                            {item.value}
                        </h2>

                        <div
                            className={`
                                inline-flex
                                mt-4
                                rounded-full
                                px-3
                                py-1

                                ${isDark
                                    ? "bg-white/5 border border-white/10"
                                    : "bg-slate-100 border border-slate-200"
                                }
                            `}
                        >

                            <span
                                className={`text-sm ${isDark
                                        ? "text-slate-300"
                                        : "text-slate-600"
                                    }`}
                            >
                                {item.subtitle}
                            </span>

                        </div>

                        <div className="mt-6">

                            <div
                                className={`flex justify-between text-xs mb-2 ${isDark
                                        ? "text-slate-500"
                                        : "text-slate-400"
                                    }`}
                            >

                                <span>Level</span>

                                <span>{item.progress}</span>

                            </div>

                            <div
                                className={`w-full h-2 rounded-full overflow-hidden ${isDark
                                        ? "bg-slate-800"
                                        : "bg-slate-200"
                                    }`}
                            >

                                <div
                                    className={`h-full rounded-full bg-gradient-to-r ${item.color}`}
                                    style={{ width: item.progress }}
                                />

                            </div>

                        </div>

                    </div>

                ))}

            </div>

        </section>
    );
}

export default WeatherStats;