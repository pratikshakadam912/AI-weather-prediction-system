from flask import Blueprint, jsonify

from services.weather_service import (
    get_current_weather,
    get_current_weather_by_location,
)

from services.prediction_service import (
    predict_weather,
)


weather_bp = Blueprint("weather", __name__)


# ==========================================
# CURRENT WEATHER
# ==========================================

@weather_bp.route("/weather/<city>")
def weather(city):

    return jsonify(
        get_current_weather(city)
    )


# ==========================================
# WEATHER BY LOCATION
# ==========================================

@weather_bp.route("/weather/location/<lat>/<lon>")
def weather_location(lat, lon):

    weather_data = get_current_weather_by_location(
        lat,
        lon
    )

    if weather_data is None:
        return jsonify({
            "error": "Unable to fetch weather"
        }), 400

    return jsonify(weather_data)


# ==========================================
# AI PREDICTION
# ==========================================

@weather_bp.route("/prediction/<city>")
def prediction(city):

    weather_data = get_current_weather(city)

    prediction_data = predict_weather(
        weather_data
    )

    return jsonify({
        "city": weather_data["city"],
        "country": weather_data["country"],
        "prediction": prediction_data
    })