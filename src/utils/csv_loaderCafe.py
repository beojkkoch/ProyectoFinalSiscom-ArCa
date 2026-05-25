import pandas as pd
dataset = pd.read_csv(
    "Data/DATASET_CAFE.csv", 
    sep = ";"
)
    
sensor_df = dataset[[
    "TEMPERATURA",
    "HUMEDAD RELATIVA",
    "RADIACIÓN SOLAR",
    "Ph"
]]

print(sensor_df.head())
print(sensor_df.shape)
print("Total registros:", len(sensor_df))