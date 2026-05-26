import pandas as pd

df = pd.read_csv("Data/DATASET_CAFE.csv", sep=";")

df = df[[
    "TEMPERATURA",
    "HUMEDAD RELATIVA",
    "RADIACIÓN SOLAR",
    "Ph"
]]

for col in df.columns:
    df[col] = df[col].astype(str).str.replace(",", ".").astype(float)

sensor_df_cafe = df

print(sensor_df_cafe.head())
print(sensor_df_cafe.shape)
print("Total registros café:", len(sensor_df_cafe))