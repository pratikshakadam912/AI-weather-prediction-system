from flask import Flask
from flask_cors import CORS

from routes.weather_routes import weather_bp

app = Flask(__name__)

CORS(app)

app.register_blueprint(weather_bp)


@app.route("/")
def home():

    return {
        "message": "WeatherAI Backend Running"
    }


if __name__ == "__main__":
    app.run(debug=True)
