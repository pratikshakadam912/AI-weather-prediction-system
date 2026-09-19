from flask import Blueprint, jsonify

from services.weather_service import (
    get_current_weather,
    get_current_weather_by_location,
    get_forecast,
    get_forecast_by_location,
)


weather_bp = Blueprint("weather", __name__)


# ==========================================
# CURRENT WEATHER
# ==========================================

@weather_bp.route("/weather/<city>")
def weather(city):

    weather_data = get_current_weather(city)

    if weather_data is None:
        return jsonify({
            "error": "Unable to fetch weather"
        }), 400

    return jsonify(weather_data)


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
# FORECAST BY CITY
# ==========================================

@weather_bp.route("/forecast/<city>")
def forecast(city):

    forecast_data = get_forecast(city)

    if forecast_data is None:
        return jsonify({
            "error": "Unable to fetch forecast"
        }), 400

    return jsonify({
        "city": city,
        "forecast": forecast_data
    })


# ==========================================
# FORECAST BY LOCATION
# ==========================================

@weather_bp.route("/forecast/location/<lat>/<lon>")
def forecast_location(lat, lon):

    forecast_data = get_forecast_by_location(
        lat,
        lon
    )

    if forecast_data is None:
        return jsonify({
            "error": "Unable to fetch forecast"
        }), 400

    return jsonify({
        "forecast": forecast_data
    })