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
    const { weather } = useContext(WeatherContext);

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

                    <p className="text-cyan-400 uppercase tracking-widest text-xs font-semibold">
                        Weekly Outlook
                    </p>

                    <h2 className="text-3xl font-bold text-white mt-1">
                        7-Day Forecast
                    </h2>

                </div>

                <div className="px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20">

                    <span className="text-cyan-300 text-sm font-medium">
                        Next 7 Days
                    </span>

                </div>

            </div>

            <div className="grid grid-cols-7 gap-4">

                {forecast.map((item, index) => (

                    <div
                        key={index}
                        className="group bg-slate-900 border border-white/10 rounded-3xl p-5 text-center transition-all duration-300 hover:-translate-y-2 hover:border-cyan-400/50 hover:shadow-[0_0_25px_rgba(34,211,238,0.15)]"
                    >

                        <h3 className="text-white font-semibold text-lg">
                            {item.day}
                        </h3>

                        <div className="flex justify-center my-4">

                            <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                                {item.icon}
                            </div>

                        </div>

                        <p className="text-slate-400 text-sm">
                            {item.weather}
                        </p>

                        <div className="mt-5">

                            <p className="text-white text-2xl font-bold">
                                {item.high}
                            </p>

                            <p className="text-slate-500 mt-1">
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