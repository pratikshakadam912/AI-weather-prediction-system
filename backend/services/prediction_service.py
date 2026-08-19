import os
import joblib


# ==========================================
# LOAD TRAINED ML MODEL
# ==========================================

MODEL_PATH = os.path.join(
    os.path.dirname(os.path.dirname(__file__)),
    "training",
    "weather_model.pkl"
)

model = joblib.load(MODEL_PATH)


# ==========================================
# PREDICT WEATHER
# ==========================================

def predict_weather(weather):

    temperature = weather["temperature"]
    humidity = weather["humidity"]
    pressure = weather["pressure"]
    wind_speed = weather["wind_speed"]

    # ==========================================
    # PREPARE INPUT FOR ML MODEL
    # ==========================================

    features = [[
        temperature,
        humidity,
        pressure,
        wind_speed
    ]]

    # ==========================================
    # ML PREDICTION
    # ==========================================

    rain_prediction = model.predict(features)[0]

    # Probability of rain
    probabilities = model.predict_proba(features)[0]

    rain_probability = round(
        probabilities[1] * 100
    )

    # ==========================================
    # PREDICT CONDITION
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
    # TEMPERATURE PREDICTION
    # ==========================================

    # Simple ML-assisted temperature estimate
    #
    # This part will later be replaced with
    # a dedicated temperature regression model.

    if pressure < 1000:
        temperature_change = -2

    elif pressure > 1020:
        temperature_change = 1

    else:
        temperature_change = 0

    predicted_temperature = round(
        temperature + temperature_change,
        1
    )

    # ==========================================
    # MODEL CONFIDENCE
    # ==========================================

    confidence = round(
        max(probabilities) * 100
    )

    return {
        "predicted_temperature": predicted_temperature,

        "predicted_condition": predicted_condition,

        "rain_probability": rain_probability,

        "confidence": confidence,

        "temperature_change": temperature_change,

        "recommendation": recommendation,

        "model": "Random Forest Weather Prediction Model"
    }