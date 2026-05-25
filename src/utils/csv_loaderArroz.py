import pandas as pd
dataset = pd.read_csv(
    "Data/DATASET_ARROZ1.csv", 
    sep = ";"
)
    
sensor_df = dataset[[
    "Humedad Volumetrica del Suelo",
    "Temperatura",
    "Promedio Radiacion Solar",
    "pH"
]]

print(sensor_df.head())
print(sensor_df.shape)
print("Total registros:", len(sensor_df))