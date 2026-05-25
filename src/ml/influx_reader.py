import pandas as pd
from influxdb_client import InfluxDBClient

URL = "http://localhost:8086"
TOKEN = "n1xIk1YPKFptF9Fn8AkdqGMI9eafGm3RMps-RmVmFwPfKvR1HcVxMI7_ptANX19NR7-swkhabH1vw7yzjgNNFQ=="
ORG = "agricultura"
BUCKET = "agro_iot_data"


def leer_datos_influx():
    client = InfluxDBClient(
        url=URL,
        token=TOKEN,
        org=ORG
    )

    query_api = client.query_api()

    query = f'''
    from(bucket: "{BUCKET}")
      |> range(start: -1h)
      |> filter(fn: (r) => r["_measurement"] == "sensores_arroz")
      |> filter(fn: (r) => r["_field"] == "value")
      |> keep(columns: ["_time", "_value", "cultivo", "parcela", "sensor", "variable", "unidad", "estado_alerta", "nivel_alerta", "mensaje_alerta"])
    '''

    df = query_api.query_data_frame(query)

    if isinstance(df, list):
        df = pd.concat(df)

    df = df.rename(columns={
        "_time": "timestamp",
        "_value": "value"
    })

    df = df[[
        "timestamp",
        "cultivo",
        "parcela",
        "sensor",
        "variable",
        "value",
        "unidad",
        "estado_alerta",
        "nivel_alerta",
        "mensaje_alerta"
    ]]

    df["value"] = pd.to_numeric(df["value"], errors="coerce")
    df = df.dropna(subset=["value", "sensor", "parcela", "estado_alerta"])
    df = df[df["estado_alerta"].isin(["normal", "alerta"])]

    print(df.head())
    print("Total registros:", len(df))
    print(df["sensor"].value_counts())
    print(df["estado_alerta"].value_counts())

    return df


if __name__ == "__main__":
    leer_datos_influx()