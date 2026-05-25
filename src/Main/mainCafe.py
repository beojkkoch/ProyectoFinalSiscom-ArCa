import threading

from utils.csv_loaderCafe import sensor_df
from src.Sensores.SensorSimulator import sensorSimulator
from src.mqtt.mqttClient import client

PARCELAS = [
    "parcela_1",
    "parcela_2",
    "parcela_3",
    "parcela_4"
]

SENSORES = [
    {
        "sensor": "temperatura",
        "variable": "TEMPERATURA",
        "unidad": "ºC",
        "topic_name": "temperatura",
        "frecuencia": 5
    },
    {
        "sensor": "humedad_suelo",
        "variable": "HUMEDAD RELATIVA",
        "unidad": "%",
        "topic_name": "humedad_suelo",
        "frecuencia": 7
    },
    {
        "sensor": "radiacion_solar",
        "variable": "RADIACIÓN SOLAR",
        "unidad": "MJ/m^2",
        "topic_name": "radiacion_solar",
        "frecuencia": 11
    },
    {
        "sensor": "pH",
        "variable": "Ph",
        "unidad": "pH",
        "topic_name": "pH",
        "frecuencia": 17
    }
]

threads = []

for parcela in PARCELAS:
    for config in SENSORES:
        thread = threading.Thread(
            target=sensorSimulator,
            kwargs={
                "parcela": parcela,
                "cultivo": "cafe",
                "sensor": config["sensor"],
                "variable": config["variable"],
                "unidad": config["unidad"],
                "df": sensor_df,
                "client": client,
                "topic_name": config["topic_name"],
                "frecuencia": config["frecuencia"]
            }
        )

        threads.append(thread)
        thread.start()

for thread in threads:
    thread.join()