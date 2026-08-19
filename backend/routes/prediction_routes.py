from flask import Blueprint, request

from services.weather_service import get_current_weather
from services.prediction_service import predict_weather


prediction_bp = Blueprint("prediction", __name__)


@prediction_bp.route("/prediction/<city>", methods=["GET"])
def prediction(city):

    weather = get_current_weather(city)

    prediction = predict_weather(weather)

    return {
        "city": weather["city"],
        "country": weather["country"],
        "current_temperature": weather["temperature"],
        "current_condition": weather["condition"],
        "prediction": prediction
    }