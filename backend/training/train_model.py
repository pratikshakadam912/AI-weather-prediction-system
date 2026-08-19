import pandas as pd
import joblib

from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier, RandomForestRegressor
from sklearn.metrics import accuracy_score, mean_absolute_error, r2_score


# ==========================================
# LOAD DATASET
# ==========================================

data = pd.read_csv("training/dataset/weather.csv")

print("Dataset loaded successfully")

print("\nDataset shape:")
print(data.shape)

print("\nColumns:")
print(data.columns.tolist())


# ==========================================
# FEATURES
# ==========================================

features = [
    "temperature",
    "humidity",
    "pressure",
    "wind_speed"
]

X = data[features]


# ==========================================
# RAIN MODEL
# ==========================================

y_rain = data["rain"]

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y_rain,
    test_size=0.2,
    random_state=42,
    stratify=y_rain
)

rain_model = RandomForestClassifier(
    n_estimators=100,
    random_state=42
)

print("\n==========================================")
print("TRAINING RAIN MODEL")
print("==========================================")

rain_model.fit(X_train, y_train)

rain_predictions = rain_model.predict(X_test)

rain_accuracy = accuracy_score(
    y_test,
    rain_predictions
)

print(f"Rain model accuracy: {rain_accuracy * 100:.2f}%")


# ==========================================
# TEMPERATURE MODEL
# ==========================================

y_temperature = data["next_temperature"]

X_train_temp, X_test_temp, y_train_temp, y_test_temp = train_test_split(
    X,
    y_temperature,
    test_size=0.2,
    random_state=42
)

temperature_model = RandomForestRegressor(
    n_estimators=100,
    random_state=42
)

print("\n==========================================")
print("TRAINING TEMPERATURE MODEL")
print("==========================================")

temperature_model.fit(
    X_train_temp,
    y_train_temp
)

temperature_predictions = temperature_model.predict(
    X_test_temp
)


# ==========================================
# TEMPERATURE EVALUATION
# ==========================================

temperature_mae = mean_absolute_error(
    y_test_temp,
    temperature_predictions
)

temperature_r2 = r2_score(
    y_test_temp,
    temperature_predictions
)

print(f"Temperature MAE: {temperature_mae:.2f}°C")
print(f"Temperature R²: {temperature_r2:.2f}")


# ==========================================
# SAVE MODELS
# ==========================================

joblib.dump(
    rain_model,
    "training/rain_model.pkl"
)

joblib.dump(
    temperature_model,
    "training/temperature_model.pkl"
)

print("\n==========================================")
print("MODELS SAVED SUCCESSFULLY")
print("==========================================")

print("→ training/rain_model.pkl")
print("→ training/temperature_model.pkl")