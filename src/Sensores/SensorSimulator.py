import datetime
import json
import time
import random


def generar_valor_simulado(sensor):
    # 85% de probabilidad: valor normal
    # 15% de probabilidad: valor crítico
    generar_alerta = random.random() < 0.15

    if sensor == "temperatura":
        if generar_alerta:
            return round(random.choice([
                random.uniform(10, 14.9),
                random.uniform(35.1, 40)
            ]), 2)
        return round(random.uniform(25, 32), 2)
    

    if sensor == "humedad_relativa":
        if generar_alerta:
            return round(random.choice([
                random.uniform(40, 59),
                random.uniform(91, 100)
                ]), 2)
        return round(random.uniform(70, 90), 2)

    if sensor == "humedad_suelo":
        # Se deja en escala decimal porque así lo están manejando ahora:
        # 0.35 = 35%, 0.45 = 45%
        if generar_alerta:
            return round(random.choice([
                random.uniform(0.15, 0.29),
                random.uniform(0.56, 0.75)
            ]), 3)
        return round(random.uniform(0.35, 0.45), 3)

    if sensor == "radiacion_solar":
        if generar_alerta:
            return round(random.choice([
                random.uniform(10, 14.9),
                random.uniform(30.1, 35)
            ]), 2)
        return round(random.uniform(18, 25), 2)

    if sensor == "pH":
        if generar_alerta:
            return round(random.choice([
                random.uniform(4.8, 5.19),
                random.uniform(7.01, 7.5)
            ]), 2)
        return round(random.uniform(5.5, 6.5), 2)

    return 0


def sensorSimulator(
    parcela,
    cultivo,
    sensor,
    variable,
    unidad,
    df,
    client,
    topic_name,
    frecuencia
):
    for index, row in df.iterrows():

        valor = generar_valor_simulado(sensor)

        data = {
            "timestamp": str(datetime.datetime.now()),
            "cultivo": cultivo,
            "parcela": parcela,
            "sensor": sensor,
            "variable": variable,
            "value": valor,
            "unidad": unidad
        }

        TOPIC = f"agricultura/{cultivo}/{parcela}/{topic_name}"

        client.publish(
            TOPIC,
            json.dumps(data)
        )

        print("\nPublicado:")
        print(data)

        time.sleep(frecuencia)