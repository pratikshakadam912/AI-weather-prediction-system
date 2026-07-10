import { useContext } from "react";

import Header from "../layout/Header";
import SearchBar from "../components/SearchBar";
import CurrentWeather from "../components/CurrentWeather";
import PredictionCard from "../components/PredictionCard";
import WeatherStats from "../components/WeatherStats";
import Forecast from "../components/Forecast";
import Sidebar from "../layout/Sidebar";

import { WeatherContext } from "../context/WeatherContext";

function Home() {

    const { theme } = useContext(WeatherContext);

    return (

        <div
            className={`min-h-screen flex transition-all duration-500 ${
                theme === "dark"
                    ? "bg-[#0F172A] text-white"
                    : "bg-gradient-to-br from-pink-50 via-white to-blue-100 text-slate-800"
            }`}
        >

            <Sidebar />

            <main className="flex-1 p-8">

                <Header />

                <SearchBar />

                <div className="grid grid-cols-2 gap-8 mt-8">

                    <CurrentWeather />

                    <PredictionCard />

                </div>

                <WeatherStats />

                <Forecast />

            </main>

        </div>

    );
}

export default Home;