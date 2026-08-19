def predict_weather(weather):
    """
    Generate a weather prediction using the current weather data.

    This service is intentionally isolated so a trained ML model
    can be plugged in later without changing the frontend.
    """

    temperature = weather["temperature"]
    humidity = weather["humidity"]
    pressure = weather["pressure"]
    wind_speed = weather["wind_speed"]
    condition = weather["condition"]

    # Estimate rain probability
    if condition == "Rain":
        rain_probability = 85
    elif condition == "Thunderstorm":
        rain_probability = 95
    elif condition == "Clouds":
        rain_probability = 45
    elif humidity > 80:
        rain_probability = 60
    elif humidity > 65:
        rain_probability = 35
    else:
        rain_probability = 10

    # Estimate tomorrow's temperature
    temperature_change = 0

    if pressure < 1000:
        temperature_change = -2
    elif pressure > 1020:
        temperature_change = 1
    elif humidity > 80:
        temperature_change = -1

    predicted_temperature = round(
        temperature + temperature_change,
        1
    )

    # Predict condition
    if rain_probability >= 70:
        predicted_condition = "Rain"
        recommendation = (
            "Rain is likely tomorrow. Carry an umbrella "
            "and plan outdoor activities accordingly."
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
            "Mostly clear conditions are expected tomorrow. "
            "It should be a good day for outdoor activities."
        )

    # Basic confidence calculation
    confidence = 75

    if humidity > 75:
        confidence += 5

    if pressure < 1000 or pressure > 1020:
        confidence += 5

    confidence = min(confidence, 95)

    return {
        "predicted_temperature": predicted_temperature,
        "predicted_condition": predicted_condition,
        "rain_probability": rain_probability,
        "confidence": confidence,
        "temperature_change": temperature_change,
        "recommendation": recommendation,
        "model": "WeatherAI Prediction Engine"
    }