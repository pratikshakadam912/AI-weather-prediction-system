import { useContext } from "react";

import Header from "../layout/Header";
import Sidebar from "../layout/Sidebar";

import SearchBar from "../components/SearchBar";
import CurrentWeather from "../components/CurrentWeather";
import PredictionCard from "../components/PredictionCard";
import WeatherStats from "../components/WeatherStats";
import Forecast from "../components/Forecast";

import { WeatherContext } from "../context/WeatherContext";

function Home() {

    const { theme } = useContext(WeatherContext);

    return (

        <div
            className={`min-h-screen flex transition-all duration-500 ${theme === "dark"
                    ? "bg-[#0F172A] text-white"
                    : "bg-gradient-to-br from-pink-50 via-white to-blue-100 text-slate-800"
                }`}
        >

            {/* Sidebar */}

            <Sidebar />

            {/* Main Content */}

            <main className="flex-1 w-full p-4 sm:p-6 lg:p-8 overflow-x-hidden">

                <Header />

                <div className="mt-6">
                    <SearchBar />
                </div>

                {/* Weather Cards */}

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8 mt-8">

                    <CurrentWeather />

                    <PredictionCard />

                </div>

                <div className="mt-8">
                    <WeatherStats />
                </div>

                <div className="mt-8 pb-8">
                    <Forecast />
                </div>

            </main>

        </div>

    );
}

export default Home;