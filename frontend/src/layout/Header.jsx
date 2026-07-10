import { useContext } from "react";

import {
    FaLocationCrosshairs,
    FaMoon,
    FaSun,
    FaClock,
} from "react-icons/fa6";

import { WeatherContext } from "../context/WeatherContext";
import { getWeatherByLocation } from "../api/weatherApi";

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
    } = useContext(WeatherContext);

    const toggleTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    };


    const handleCurrentLocation = () => {
        if (!navigator.geolocation) {
            alert("Geolocation is not supported.");
            return;
        }

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                try {
                    setLoading(true);

                    const { latitude, longitude } = position.coords;

                    const data = await getWeatherByLocation(
                        latitude,
                        longitude
                    );

                    setWeather(data);
                } catch (error) {
                    console.error(error);
                    alert("Unable to fetch current location.");
                } finally {
                    setLoading(false);
                }
            },
            () => {
                alert("Location permission denied.");
            }
        );
    };

    let greeting = "Good Morning";

    if (hour >= 12 && hour < 17) greeting = "Good Afternoon";
    else if (hour >= 17) greeting = "Good Evening";

    return (

        <header className="flex justify-between items-center mb-10">

            {/* ================= Left ================= */}

            <div>

                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20">

                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>

                    <span className="text-cyan-300 text-sm font-medium">
                        AI Weather Assistant
                    </span>

                </div>

                <h1 className="text-5xl font-bold text-white mt-5 tracking-tight">

                    {greeting},

                </h1>

                <h2 className="text-4xl font-semibold text-slate-200 mt-1">

                    Welcome Back 👋

                </h2>

                <p className="text-slate-400 mt-4 text-lg">

                    Live weather insights & AI-powered forecasting.

                </p>

            </div>

            {/* ================= Right ================= */}

            <div className="flex items-center gap-5">

                {/* Date & Time */}

                <div className="rounded-3xl bg-slate-900/90 border border-white/10 backdrop-blur-xl px-6 py-5 min-w-[260px]">

                    <div className="flex items-center gap-3">

                        <div className="w-12 h-12 rounded-2xl bg-cyan-500/15 flex items-center justify-center">

                            <FaClock className="text-cyan-400" />

                        </div>

                        <div>

                            <p className="text-white font-semibold">

                                {currentTime}

                            </p>

                            <p className="text-slate-400 text-sm">

                                {currentDate}

                            </p>

                        </div>

                    </div>

                </div>

                {/* Location */}

                <button
                    onClick={handleCurrentLocation}
                    disabled={loading}
                    className="
        rounded-3xl
        bg-slate-900/90
        border border-white/10
        backdrop-blur-xl
        px-6
        py-5
        hover:border-cyan-400/40
        transition-all
        duration-300
        disabled:opacity-50
    "
                >

                    <div className="flex items-center gap-4">

                        <div className="w-12 h-12 rounded-2xl bg-cyan-500/15 flex items-center justify-center">

                            <FaLocationCrosshairs className="text-cyan-400" />

                        </div>

                        <div className="text-left">

                            <p className="text-slate-400 text-xs">

                                Current Location

                            </p>

                            <p className="text-white font-semibold">
                                {weather
                                    ? `${weather.city}, ${weather.country}`
                                    : "Current Location"}
                            </p>

                        </div>

                    </div>

                </button>

                {/* Theme */}

                <button
                    onClick={toggleTheme}
                    className="
        w-16
        h-16
        rounded-3xl
        bg-slate-900/90
        border
        border-white/10
        backdrop-blur-xl
        flex
        items-center
        justify-center
        hover:scale-105
        transition-all
        duration-300
    "
                >
                    {theme === "dark" ? (
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