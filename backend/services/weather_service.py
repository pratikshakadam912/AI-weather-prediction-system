import requests
from config import Config

BASE_URL = "https://api.openweathermap.org/data/2.5/weather"


def format_weather(data):
    return {
        "city": data["name"],
        "country": data["sys"]["country"],

        "temperature": round(data["main"]["temp"]),
        "feels_like": round(data["main"]["feels_like"]),

        "temp_max": round(data["main"]["temp_max"]),
        "temp_min": round(data["main"]["temp_min"]),

        "humidity": data["main"]["humidity"],
        "pressure": data["main"]["pressure"],

        "visibility": round(data["visibility"] / 1000, 1),

        "wind_speed": data["wind"]["speed"],

        "condition": data["weather"][0]["main"],
        "description": data["weather"][0]["description"],

        "icon": data["weather"][0]["icon"],

        "sunrise": data["sys"]["sunrise"],
        "sunset": data["sys"]["sunset"]
    }


def get_current_weather(city):

    params = {
        "q": city,
        "appid": Config.OPENWEATHER_API_KEY,
        "units": "metric"
    }

    response = requests.get(BASE_URL, params=params)

    data = response.json()

    return format_weather(data)


def get_current_weather_by_location(lat, lon):

    params = {
        "lat": lat,
        "lon": lon,
        "appid": Config.OPENWEATHER_API_KEY,
        "units": "metric"
    }

    response = requests.get(BASE_URL, params=params)

    if response.status_code != 200:
        return None

    data = response.json()

    return format_weather(data)
