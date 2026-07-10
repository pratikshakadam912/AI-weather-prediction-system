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

    const isDark = theme === "dark";

    const toggleTheme = () => {
        setTheme(isDark ? "light" : "dark");
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
        <header
            className={`
                flex justify-between items-center mb-10
                transition-all duration-500
                ${isDark
                    ? ""
                    : "bg-white/40 backdrop-blur-xl rounded-3xl p-6 border border-pink-100 shadow-lg"
                }
            `}
        >
            {/* ================= Left ================= */}

            <div>
                <div
                    className={`
                        inline-flex items-center gap-2 px-4 py-2 rounded-full border
                        ${isDark
                            ? "bg-cyan-500/10 border-cyan-500/20"
                            : "bg-gradient-to-r from-pink-100 to-blue-100 border-pink-200"
                        }
                    `}
                >
                    <span
                        className={`w-2 h-2 rounded-full animate-pulse ${isDark ? "bg-cyan-400" : "bg-pink-500"
                            }`}
                    ></span>

                    <span
                        className={`text-sm font-medium ${isDark ? "text-cyan-300" : "text-pink-600"
                            }`}
                    >
                        AI Weather Assistant
                    </span>
                </div>

                <h1
                    className={`text-5xl font-bold mt-5 tracking-tight ${isDark ? "text-white" : "text-slate-800"
                        }`}
                >
                    {greeting},
                </h1>

                <h2
                    className={`text-4xl font-semibold mt-1 ${isDark ? "text-slate-200" : "text-slate-700"
                        }`}
                >
                    Welcome Back 👋
                </h2>

                <p
                    className={`mt-4 text-lg ${isDark ? "text-slate-400" : "text-slate-500"
                        }`}
                >
                    Live weather insights & AI-powered forecasting.
                </p>
            </div>

            {/* ================= Right ================= */}

            <div className="flex items-center gap-5">

                {/* Date & Time */}

                <div
                    className={`
                        rounded-3xl
                        backdrop-blur-xl
                        px-6
                        py-5
                        min-w-[260px]
                        transition-all
                        duration-500
                        ${isDark
                            ? "bg-slate-900/90 border border-white/10"
                            : "bg-white/80 border border-pink-100 shadow-md"
                        }
                    `}
                >
                    <div className="flex items-center gap-3">
                        <div
                            className={`
                                w-12 h-12 rounded-2xl flex items-center justify-center
                                ${isDark
                                    ? "bg-cyan-500/15"
                                    : "bg-pink-100"
                                }
                            `}
                        >
                            <FaClock
                                className={`${isDark
                                        ? "text-cyan-400"
                                        : "text-pink-500"
                                    }`}
                            />
                        </div>

                        <div>
                            <p
                                className={`font-semibold ${isDark
                                        ? "text-white"
                                        : "text-slate-800"
                                    }`}
                            >
                                {currentTime}
                            </p>

                            <p
                                className={`text-sm ${isDark
                                        ? "text-slate-400"
                                        : "text-slate-500"
                                    }`}
                            >
                                {currentDate}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Location */}

                <button
                    onClick={handleCurrentLocation}
                    disabled={loading}
                    className={`
                        rounded-3xl
                        backdrop-blur-xl
                        px-6
                        py-5
                        transition-all
                        duration-300
                        disabled:opacity-50
                        ${isDark
                            ? "bg-slate-900/90 border border-white/10 hover:border-cyan-400/40"
                            : "bg-white/80 border border-blue-100 shadow-md hover:border-blue-300"
                        }
                    `}
                >
                    <div className="flex items-center gap-4">

                        <div
                            className={`
                                w-12 h-12
                                rounded-2xl
                                flex
                                items-center
                                justify-center
                                ${isDark
                                    ? "bg-cyan-500/15"
                                    : "bg-blue-100"
                                }
                            `}
                        >
                            <FaLocationCrosshairs
                                className={`${isDark
                                        ? "text-cyan-400"
                                        : "text-blue-500"
                                    }`}
                            />
                        </div>

                        <div className="text-left">

                            <p
                                className={`text-xs ${isDark
                                        ? "text-slate-400"
                                        : "text-slate-500"
                                    }`}
                            >
                                Current Location
                            </p>

                            <p
                                className={`font-semibold ${isDark
                                        ? "text-white"
                                        : "text-slate-800"
                                    }`}
                            >
                                {weather
                                    ? `${weather.city}, ${weather.country}`
                                    : "Current Location"}
                            </p>

                        </div>

                    </div>

                </button>

                {/* Theme Toggle */}

                <button
                    onClick={toggleTheme}
                    className={`
                        w-16
                        h-16
                        rounded-3xl
                        backdrop-blur-xl
                        border
                        flex
                        items-center
                        justify-center
                        hover:scale-105
                        transition-all
                        duration-300

                        ${isDark
                            ? "bg-slate-900/90 border-white/10"
                            : "bg-gradient-to-br from-pink-100 via-white to-blue-100 border-pink-200 shadow-md"
                        }
                    `}
                >
                    {isDark ? (
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