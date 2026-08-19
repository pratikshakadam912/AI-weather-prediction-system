from flask import Blueprint

from services.weather_service import (
    get_current_weather,
    get_current_weather_by_location,
)

from services.prediction_service import predict_weather


weather_bp = Blueprint("weather", __name__)


# ==========================================
# CURRENT WEATHER
# ==========================================

@weather_bp.route("/weather/<city>")
def weather(city):

    return get_current_weather(city)


# ==========================================
# WEATHER BY LOCATION
# ==========================================

@weather_bp.route("/weather/location/<lat>/<lon>")
def weather_location(lat, lon):

    return get_current_weather_by_location(lat, lon)


# ==========================================
# AI WEATHER PREDICTION
# ==========================================

@weather_bp.route("/prediction/<city>")
def prediction(city):

    weather = get_current_weather(city)

    if not weather:
        return {
            "error": "Unable to find weather information for this city."
        }, 404

    prediction_result = predict_weather(weather)

    return {
        "city": weather["city"],
        "country": weather["country"],
        "prediction": prediction_result,
    }