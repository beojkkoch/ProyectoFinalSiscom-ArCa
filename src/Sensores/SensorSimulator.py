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
            "variabl": variable,
            "value": float(
                str(row[variable]).replace(",",".")
            ),
            "unidad": unidad
        }

        TOPIC = f"agricultura/{cultivo}/{parcela}/{topic_name}"
        #TOPIC = "test"

        result = client.publish(
            TOPIC,
            json.dumps(data)
        )

        print("\nPublicado: ")
        print(data)

       
        time.sleep(frecuencia)