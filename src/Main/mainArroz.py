import threading

from utils.csv_loaderArroz import sensor_df
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
        "variable": "Temperatura",
        "unidad": "ºC",
        "topic_name": "temperatura",
        "frecuencia": 5
    },
    {
        "sensor": "humedad_suelo",
        "variable": "Humedad Volumetrica del Suelo",
        "unidad": "%",
        "topic_name": "humedad_suelo",
        "frecuencia": 7
    },
    {
        "sensor": "radiacion_solar",
        "variable": "Promedio Radiacion Solar",
        "unidad": "MJ/m^2",
        "topic_name": "radiacion_solar",
        "frecuencia": 11
    },
    {
        "sensor": "pH",
        "variable": "pH",
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
                "cultivo": "Arroz",
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