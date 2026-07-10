from flask import Blueprint

from services.weather_service import (
    get_current_weather,
    get_current_weather_by_location,
)

weather_bp = Blueprint("weather", __name__)


@weather_bp.route("/weather/<city>")
def weather(city):

    return get_current_weather(city)


@weather_bp.route("/weather/location/<lat>/<lon>")
def weather_location(lat, lon):

    return get_current_weather_by_location(lat, lon)
