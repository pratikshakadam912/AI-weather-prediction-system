import pandas as pd

from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score

import joblib


# ==========================================
# 1. LOAD DATASET
# ==========================================

data = pd.read_csv("training/dataset/weather.csv")

print("Dataset loaded successfully")
print("\nFirst 5 rows:")
print(data.head())

print("\nDataset shape:")
print(data.shape)

print("\nColumns:")
print(data.columns.tolist())


# ==========================================
# 2. FEATURES AND TARGET
# ==========================================

X = data[
    [
        "temperature",
        "humidity",
        "pressure",
        "wind_speed",
    ]
]

y = data["rain"]


# ==========================================
# 3. SPLIT DATA
# ==========================================

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42,
    stratify=y,
)


# ==========================================
# 4. CREATE MODEL
# ==========================================

model = RandomForestClassifier(
    n_estimators=100,
    random_state=42,
)


# ==========================================
# 5. TRAIN MODEL
# ==========================================

print("\nTraining model...")

model.fit(X_train, y_train)

print("Model training completed.")


# ==========================================
# 6. TEST MODEL
# ==========================================

predictions = model.predict(X_test)

accuracy = accuracy_score(y_test, predictions)

print(f"\nModel accuracy: {accuracy * 100:.2f}%")


# ==========================================
# 7. SAVE MODEL
# ==========================================

model_path = "training/weather_model.pkl"

joblib.dump(model, model_path)

print(f"\nModel saved successfully to: {model_path}")