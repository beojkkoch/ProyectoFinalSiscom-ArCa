# Se publican los datos MQTT de los sensores creados a partir de las variables del dataset

import datetime
import json
import time

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

        data = {

            "timestamp": str(datetime.datetime.now()),
            "cultivo": cultivo,
            "parcela": parcela,
            "sensor": sensor,
            "variable": variable,
            "value": float(
                str(row[variable]).replace(",",".")
            ),
            "unidad": unidad
        }

        TOPIC = f"agricultura/{cultivo}/{parcela}/{topic_name}"
       

        result = client.publish(
            TOPIC,
            json.dumps(data)
        )

        print("\nPublicado: ")
        print(data)

       
        time.sleep(frecuencia)