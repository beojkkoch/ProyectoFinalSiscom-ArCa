#Conectar a influxDB 
from influxdb_client import InfluxDBClient


from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

#permitir conexion con react Fronted fastAPI

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

#Configuracion con influx

url = ""
token = ""
org = ""
bucket = "sensores_agricultura"

client = InfluxDBClient(
    url=url,
    token=token,   #Autenticacion desde la interfaz web de InfluxDB
    org = org
)

queryApi = client.query_api()  #Empieza consulta de datos a API

#Endpoint
@app.get("/api/sensores/{cultivo}")
def obtenerSensores(cultivo: str):
    query = f'''
    from(bucket: "{bucket}")
      |> range(start: -1m)
      |> filter(fn: (r) => ["cultivo"] == "{cultivo}")
      |> last()
    '''

    #Ejecutar query
    result = queryApi.query(
        org=org,
        query =query
    )

    data = []
    for table in result:

        for record in table.records:

            data.append({

                "sensor_id": record.get_field(),

                "value": record.get_value(),

                "timestamp": str(record.get_time())
            })

    return data

@app.get("/api/alerts")
def ontenerAlertas():

    query = f'''
    from(bucket: "{bucket}")
        |> range(start: -10m)
        |> filter(fn: (r) => r["_measurement"] == "alerts")
        |> last()
    '''

    result = queryApi.query(
        org=org,
        query=query 
    )

    alerts = []

    for table in result:
        for record in table.records():
            alerts.append({
                "id" : str(record.get_time()),
                "sensorName": record.get_field(),
                "message" : str(record.get_value()),
                "level": "warning",
                "time" : str(record.get_time())
            })
        return alerts

@app.get("/")
def home():
    return{
        "message": "API IoT Agricultura funcionando",
        "status": "online"
    }