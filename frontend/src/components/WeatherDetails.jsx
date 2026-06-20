import {
    WiHumidity,
    WiStrongWind,
    WiDaySunny
} from "react-icons/wi";

import { FaGaugeHigh } from "react-icons/fa6";

function WeatherDetails() {
    return (
        <div className="details-grid">

            <div className="detail-box">
                <WiHumidity size={40} />
                <h3>Humidity</h3>
                <p>70%</p>
            </div>

            <div className="detail-box">
                <FaGaugeHigh size={30} />
                <h3>Pressure</h3>
                <p>1012 hPa</p>
            </div>

            <div className="detail-box">
                <WiStrongWind size={40} />
                <h3>Wind</h3>
                <p>12 km/h</p>
            </div>

            <div className="detail-box">
                <WiDaySunny size={40} />
                <h3>UV Index</h3>
                <p>5</p>
            </div>

        </div>
    );
}

export default WeatherDetails;