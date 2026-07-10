import { createContext, useState } from "react";

export const WeatherContext = createContext();

export function WeatherProvider({ children }) {
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(false);

    // NEW
    const [theme, setTheme] = useState("dark");

    return (
        <WeatherContext.Provider
            value={{
                weather,
                setWeather,
                loading,
                setLoading,

                theme,
                setTheme,
            }}
        >
            {children}
        </WeatherContext.Provider>
    );
}