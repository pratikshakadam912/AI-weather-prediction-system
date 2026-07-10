import { useContext } from "react";
import {
    FaTint,
    FaWind,
    FaCompressAlt,
    FaEye,
} from "react-icons/fa";

import { WeatherContext } from "../context/WeatherContext";

function WeatherStats() {
    const { weather } = useContext(WeatherContext);

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

                    <p className="text-cyan-400 uppercase tracking-widest text-sm font-semibold">
                        Today's Conditions
                    </p>

                    <h2 className="text-3xl font-bold text-white mt-1">
                        Weather Details
                    </h2>

                </div>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

                {stats.map((item, index) => (

                    <div
                        key={index}
                        className="group relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/90 backdrop-blur-xl p-6 transition-all duration-300 hover:-translate-y-2 hover:border-cyan-400/50 hover:shadow-[0_0_30px_rgba(34,211,238,0.15)]"
                    >

                        <div className={`absolute -right-10 -top-10 w-36 h-36 rounded-full bg-gradient-to-br ${item.color} opacity-10 blur-3xl group-hover:opacity-20 transition`} />

                        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white text-2xl shadow-lg`}>
                            {item.icon}
                        </div>

                        <p className="mt-6 text-slate-400 text-sm tracking-wide uppercase">
                            {item.title}
                        </p>

                        <h2 className="text-4xl font-bold text-white mt-2">
                            {item.value}
                        </h2>

                        <div className="inline-flex mt-4 rounded-full bg-white/5 border border-white/10 px-3 py-1">
                            <span className="text-sm text-slate-300">
                                {item.subtitle}
                            </span>
                        </div>

                        <div className="mt-6">

                            <div className="flex justify-between text-xs text-slate-500 mb-2">

                                <span>Level</span>

                                <span>{item.progress}</span>

                            </div>

                            <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">

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