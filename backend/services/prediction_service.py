import os
import joblib


# ==========================================
# MODEL PATHS
# ==========================================

BASE_DIR = os.path.dirname(os.path.dirname(__file__))

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
    # PREPARE FEATURES
    # ==========================================

    features = [[
        temperature,
        humidity,
        pressure,
        wind_speed
    ]]


    # ==========================================
    # 1. RAIN PREDICTION
    # ==========================================

    rain_prediction = rain_model.predict(
        features
    )[0]


    # ==========================================
    # RAIN PROBABILITY
    # ==========================================

    probabilities = rain_model.predict_proba(
        features
    )[0]

    rain_probability = round(
        probabilities[1] * 100
    )


    # ==========================================
    # 2. TEMPERATURE PREDICTION
    # ==========================================

    predicted_temperature = temperature_model.predict(
        features
    )[0]

    predicted_temperature = round(
        float(predicted_temperature),
        1
    )


    # ==========================================
    # TEMPERATURE CHANGE
    # ==========================================

    temperature_change = round(
        predicted_temperature - temperature,
        1
    )


    # ==========================================
    # 3. PREDICT CONDITION
    # ==========================================

    if rain_prediction == 1:

        predicted_condition = "Rain"

        recommendation = (
            "Rain is likely tomorrow. "
            "Carry an umbrella and plan outdoor "
            "activities accordingly."
        )

    else:

        predicted_condition = "Clear"

        recommendation = (
            "Rain is unlikely tomorrow. "
            "Weather conditions should remain "
            "relatively comfortable."
        )


    # ==========================================
    # 4. MODEL CONFIDENCE
    # ==========================================

    confidence = round(
        max(probabilities) * 100
    )


    # ==========================================
    # FINAL RESULT
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