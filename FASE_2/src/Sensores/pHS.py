#Asignacion 
import datetime
import json
import time

def sensorSimulatorpH( parcela, client, df):
    for index, row in df.iterrows():
    
        dataPH = {
            "timestamp": str(datetime.datetime.now()),
            "parcela": parcela,
            "sensor": "pH",
            "value": row["pH"]
        }

        TOPIC = f"{parcela}/pH"

        client.publish(
            TOPIC, json.dumps(dataPH)
        )

        print(dataPH)
        print(index)
        time.sleep(30)