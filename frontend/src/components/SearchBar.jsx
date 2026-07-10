import { useContext, useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";

import { WeatherContext } from "../context/WeatherContext";
import { getWeather } from "../api/weatherApi";

function SearchBar() {
    const [city, setCity] = useState("");

    const {
        setWeather,
        loading,
        setLoading,
    } = useContext(WeatherContext);

    const handleSearch = async () => {
        if (!city.trim()) return;

        try {
            setLoading(true);

            const data = await getWeather(city);

            console.log(data);

            setWeather(data);

            setCity("");
        } catch (error) {
            console.error(error);
            alert("City not found");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center gap-4">

            <div className="flex flex-1 items-center bg-slate-900 border border-slate-800 rounded-2xl px-5 py-4">

                <FaMagnifyingGlass className="text-slate-400" />

                <input
                    type="text"
                    placeholder="Search city..."
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            handleSearch();
                        }
                    }}
                    className="flex-1 bg-transparent outline-none text-white placeholder:text-slate-500 ml-4"
                />

            </div>

            <button
                onClick={handleSearch}
                disabled={loading}
                className="bg-cyan-500 hover:bg-cyan-600 disabled:opacity-50 transition px-7 py-4 rounded-2xl font-semibold text-white"
            >
                {loading ? "Loading..." : "Search"}
            </button>

        </div>
    );
}

export default SearchBar;