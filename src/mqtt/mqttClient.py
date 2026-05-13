import paho.mqtt.client as mqtt
import time


broker = "localhost"
port = 1883

client = mqtt.Client(
    mqtt.CallbackAPIVersion.VERSION2
)

client.connect(broker, port)
client.loop_start()


print("Conectado al broker MQTT")


