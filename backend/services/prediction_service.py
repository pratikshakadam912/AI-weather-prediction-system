import os
import joblib
import pandas as pd


# ==========================================
# MODEL PATHS
# ==========================================

BASE_DIR = os.path.dirname(
    os.path.dirname(os.path.abspath(__file__))
)

RAIN_MODEL_PATH = os.path.join(
    BASE_DIR,
    "training",
    "rain_model.pkl"
)

TEMPERATURE_MODEL_PATH = os.path.join(
    BASE_DIR,
    "training",
    "temperature_model.pkl"
)


# ==========================================
# LOAD TRAINED MODELS
# ==========================================

rain_model = joblib.load(RAIN_MODEL_PATH)

temperature_model = joblib.load(
    TEMPERATURE_MODEL_PATH
)


# ==========================================
# PREDICT WEATHER
# ==========================================

def predict_weather(weather):

    temperature = weather["temperature"]
    humidity = weather["humidity"]
    pressure = weather["pressure"]
    wind_speed = weather["wind_speed"]


    # ==========================================
    # PREPARE INPUT
    # ==========================================

    input_data = pd.DataFrame(
        [[
            temperature,
            humidity,
            pressure,
            wind_speed
        ]],
        columns=[
            "temperature",
            "humidity",
            "pressure",
            "wind_speed"
        ]
    )


    # ==========================================
    # TEMPERATURE PREDICTION
    # ==========================================

    predicted_temperature = temperature_model.predict(
        input_data
    )[0]

    predicted_temperature = round(
        float(predicted_temperature),
        1
    )


    # ==========================================
    # RAIN PREDICTION
    # ==========================================

    rain_prediction = rain_model.predict(
        input_data
    )[0]


    # ==========================================
    # RAIN PROBABILITY
    # ==========================================

    if hasattr(rain_model, "predict_proba"):

        probabilities = rain_model.predict_proba(
            input_data
        )[0]

        rain_probability = float(
            probabilities[1] * 100
        )

    else:

        rain_probability = (
            100 if rain_prediction == 1 else 0
        )


    rain_probability = round(
        rain_probability
    )


    # ==========================================
    # PREDICT CONDITION
    # ==========================================

    if rain_probability >= 70:

        predicted_condition = "Rain"

        recommendation = (
            "Rain is likely tomorrow. "
            "Carry an umbrella and plan "
            "outdoor activities accordingly."
        )

    elif rain_probability >= 40:

        predicted_condition = "Clouds"

        recommendation = (
            "Cloudy conditions are likely tomorrow. "
            "Weather should remain relatively comfortable."
        )

    else:

        predicted_condition = "Clear"

        recommendation = (
            "Rain is unlikely tomorrow. "
            "Weather conditions should remain "
            "relatively comfortable."
        )


    # ==========================================
    # TEMPERATURE CHANGE
    # ==========================================

    temperature_change = round(
        predicted_temperature - temperature,
        1
    )


    # ==========================================
    # MODEL CONFIDENCE
    # ==========================================

    if hasattr(rain_model, "predict_proba"):

        confidence = max(
            probabilities
        ) * 100

    else:

        confidence = 75


    confidence = round(
        float(confidence)
    )

    confidence = min(
        max(confidence, 0),
        100
    )


    # ==========================================
    # RETURN RESULT
    # ==========================================

    return {

        "predicted_temperature":
            predicted_temperature,

        "predicted_condition":
            predicted_condition,

        "rain_probability":
            rain_probability,

        "confidence":
            confidence,

        "temperature_change":
            temperature_change,

        "recommendation":
            recommendation,

        "model":
            "WeatherAI Random Forest ML"
    }