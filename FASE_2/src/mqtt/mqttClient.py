import paho.mqtt.client as mqtt


broker = "localhost"
port = 1883
topic = "agricultura/sensores"
client = mqtt.Client()
client.connect(broker, port)