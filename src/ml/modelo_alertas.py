import pandas as pd
import joblib

from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report, accuracy_score

from influx_reader import leer_datos_influx


# Leer datos desde InfluxDB
df = leer_datos_influx()

print("\nDataset cargado correctamente")
print(df.head())


# Codificar sensor
encoder_sensor = LabelEncoder()
df["sensor_encoded"] = encoder_sensor.fit_transform(df["sensor"])


# Codificar salida
encoder_alerta = LabelEncoder()
df["alerta_encoded"] = encoder_alerta.fit_transform(df["estado_alerta"])


# Variables de entrada
X = df[["value", "sensor_encoded"]]

# Variable objetivo
y = df["alerta_encoded"]


# Separar entrenamiento y prueba
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42
)


# Modelo
model = RandomForestClassifier(
    n_estimators=100,
    random_state=42
)

model.fit(X_train, y_train)


# Predicciones
y_pred = model.predict(X_test)


# Métricas
print("\nAccuracy:")
print(accuracy_score(y_test, y_pred))

print("\nReporte:")
print(classification_report(y_test, y_pred))


# Guardar modelo
joblib.dump(model, "models/modelo_alertas.pkl")
joblib.dump(encoder_sensor, "models/encoder_sensor.pkl")
joblib.dump(encoder_alerta, "models/encoder_alerta.pkl")

print("\nModelo guardado correctamente")