import requests
from collections import defaultdict
from datetime import datetime

from config import Config


BASE_URL = "https://api.openweathermap.org/data/2.5/weather"
FORECAST_URL = "https://api.openweathermap.org/data/2.5/forecast"


# ==========================================
# FORMAT WEATHER DATA
# ==========================================

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
        "sunset": data["sys"]["sunset"],
    }


# ==========================================
# GET WEATHER BY CITY
# ==========================================

def get_current_weather(city):

    params = {
        "q": city,
        "appid": Config.OPENWEATHER_API_KEY,
        "units": "metric",
    }

    response = requests.get(
        BASE_URL,
        params=params,
        timeout=10,
    )

    if response.status_code != 200:
        return None

    data = response.json()

    return format_weather(data)


# ==========================================
# GET WEATHER BY LOCATION
# ==========================================

def get_current_weather_by_location(lat, lon):

    params = {
        "lat": lat,
        "lon": lon,
        "appid": Config.OPENWEATHER_API_KEY,
        "units": "metric",
    }

    response = requests.get(
        BASE_URL,
        params=params,
        timeout=10,
    )

    if response.status_code != 200:
        return None

    data = response.json()

    return format_weather(data)


# ==========================================
# FORMAT FORECAST DATA
# ==========================================

def format_forecast(data):

    daily_data = defaultdict(list)

    for item in data["list"]:

        date = datetime.fromtimestamp(
            item["dt"]
        ).strftime("%Y-%m-%d")

        daily_data[date].append(item)


    forecast = []

    for date, entries in daily_data.items():

        temperatures = [
            entry["main"]["temp"]
            for entry in entries
        ]

        weather_counts = defaultdict(int)

        for entry in entries:
            condition = entry["weather"][0]["main"]
            weather_counts[condition] += 1

        main_condition = max(
            weather_counts,
            key=weather_counts.get
        )

        representative_entry = max(
            entries,
            key=lambda entry: entry["main"]["temp"]
        )

        forecast.append({
            "date": date,

            "temp_max": round(max(temperatures)),
            "temp_min": round(min(temperatures)),

            "condition": main_condition,

            "description": representative_entry[
                "weather"
            ][0]["description"],

            "icon": representative_entry[
                "weather"
            ][0]["icon"],

            "humidity": round(
                sum(
                    entry["main"]["humidity"]
                    for entry in entries
                ) / len(entries)
            ),

            "wind_speed": round(
                sum(
                    entry["wind"]["speed"]
                    for entry in entries
                ) / len(entries),
                1
            ),
        })


    return forecast


# ==========================================
# GET FORECAST BY CITY
# ==========================================

def get_forecast(city):

    params = {
        "q": city,
        "appid": Config.OPENWEATHER_API_KEY,
        "units": "metric",
    }

    response = requests.get(
        FORECAST_URL,
        params=params,
        timeout=10,
    )

    if response.status_code != 200:
        return None

    data = response.json()

    return format_forecast(data)


# ==========================================
# GET FORECAST BY LOCATION
# ==========================================

def get_forecast_by_location(lat, lon):

    params = {
        "lat": lat,
        "lon": lon,
        "appid": Config.OPENWEATHER_API_KEY,
        "units": "metric",
    }

    response = requests.get(
        FORECAST_URL,
        params=params,
        timeout=10,
    )

    if response.status_code != 200:
        return None

    data = response.json()

    return format_forecast(data)