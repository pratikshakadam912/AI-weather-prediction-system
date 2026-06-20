from flask import Flask

app = Flask(__name__)


@app.route("/")
def home():
    return {
        "message": "weather API running"
    }


@app.route("/weather")
def weather():
    return {
        "city": "pune",
        "temperature": 31,
        "humidity": 70,
        "pressure": 1012
    }


if __name__ == "__main__":
    app.run(debug=True)
