function Forecast() {

    const days = [
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri"
    ];

    return (
        <div className="forecast-section">

            <h2>5-Day Forecast</h2>

            <div className="forecast-container">

                {days.map((day) => (
                    <div
                        key={day}
                        className="forecast-card"
                    >
                        <h3>{day}</h3>

                        <p>30°C</p>
                    </div>
                ))}

            </div>

        </div>
    );
}

export default Forecast;