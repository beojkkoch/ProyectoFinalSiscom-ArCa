import pandas as pd
df = pd.read_csv(".venv/Data/DATASET_ARROZ1.csv", sep = ";")
    
print(df.head())
print(df.shape)
print("Total registros:", len(df))

sensor_df = df[[
    "Humedad Volumetrica del Suelo",
    "Temperatura",
    "Promedio Radiacion Solar",
    "pH"
]]