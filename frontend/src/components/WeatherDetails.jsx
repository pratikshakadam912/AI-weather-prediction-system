function WeatherDetails() {
    return (
        <div className="details-grid">
            <div className="details-box">
                <h3>Humidity</h3>
                <p>70%</p>
            </div>
            <div className="details-box">
                <h3>Pressure</h3>
                <p>1012 hPa</p>
            </div>
            <div className="detail-box">
                <h3>Wind</h3>
                <p>12 km/h</p>
            </div>

            <div className="detail-box">
                <h3>UV Index</h3>
                <p>5</p>
            </div>

        </div>
    );
}
export default WeatherDetails;