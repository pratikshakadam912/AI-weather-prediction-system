import os
from dotenv import load_dotenv

load_dotenv()

print("API KEY:", os.getenv("OPENWEATHER_API_KEY"))


class Config:
    OPENWEATHER_API_KEY = os.getenv("OPENWEATHER_API_KEY")
