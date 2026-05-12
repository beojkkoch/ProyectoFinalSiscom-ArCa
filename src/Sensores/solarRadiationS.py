import datetime
import json 
import time

def sensorSimulationT(parcela, df, client):
    for index, row in df.iterrows():
        dataT = {
            "timestamp": str(datetime.datetime.now()),
            "parcela": parcela,
            "sensor": "pH",
            "value": row["Temperatura"]
        }

        TOPIC = f"{parcela}/pH"

        client.publish(
            TOPIC, json.dumps(dataT)
        )

        print(dataT)
        print(index)
        time.sleep(30)