# FUTURA MEJORA:
# Ejecutar sensores concurrentemente usando threading
# para simular adquisición IoT en tiempo real

from src.utils.csv_loader import sensor_df
from src.Sensores.SensorSimulator import sensorSimulator
from src.mqtt.mqttClient import client

PARCELAS = [
    "parcela_1",
    "parcela_2",
    "parcela_3",
    "parcela_4"
]

for parcela in PARCELAS:
    sensorSimulator(
        parcela = parcela,
        cultivo ="arroz",
        sensor = "temperatura",
        variable = "Temperatura",
        unidad = "ºC",
        df= sensor_df,
        client = client,
        topic_name="temperatura",
        frecuencia = 5 
    )

    sensorSimulator(
        parcela = parcela,
        cultivo ="arroz",
        sensor = "humedad_suelo",
        variable = "Humedad Volumetrica del Suelo",
        unidad = "%",
        df= sensor_df,
        client = client,
        topic_name="humedad_suelo",
        frecuencia = 8
    )

    sensorSimulator(
        parcela = parcela,
        cultivo ="arroz",
        sensor = "radiacion_solar",
        variable = "Promedio Radiacion Solar",
        unidad = "MJ/m^2",
        df= sensor_df,
        client = client,
        topic_name="radiacion_solar",
        frecuencia = 4

    )

    sensorSimulator(
        parcela = parcela,
        cultivo ="arroz",
        sensor = "pH",
        variable = "pH",
        unidad = "pH",
        df= sensor_df,
        client = client,
        topic_name="pH",
        frecuencia = 15
    )



