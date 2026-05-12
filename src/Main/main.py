import json
import time

from src.utils.csv_loader import dataset
from src.Sensores.solarRadiationS import sensorSR
from src.Sensores.temperatureS import sensorT
from src.Sensores.humidityS import sensorH
from src.Sensores.pHS import sensorpH
from src.mqtt.mqttClient import client


