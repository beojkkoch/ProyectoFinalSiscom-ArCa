import { useState, useEffect } from "react";
import { ArrowLeft, Coffee, Wheat, RefreshCw } from "lucide-react";
import { NavigateFn, CropType } from "../navigation/AppNavigator";
import SensorCard from "../components/SensorCard";
import SensorChart from "../components/SensorChart";
import AlertPanel from "../components/AlertPanel";

interface Props {
  navigate: NavigateFn;
  cropType: CropType;
  parcelId: number;
  parcelName: string;
}

export interface Reading {
  time: string;
  value: number;
}

export interface Sensor {
  id: string;
  name: string;
  unit: string;
  current: number;
  history: Reading[];
  alertMin?: number;
  alertMax?: number;
  min: number;
  max: number;
  color: string;
}

export interface Alert {
  id: string;
  sensorName: string;
  message: string;
  level: "warning" | "critical";
  time: string;
}

// ─── Sensor definitions ────────────────────────────────────────────────────
// TODO: Pull thresholds (alertMin/alertMax) from Node-RED configuration or InfluxDB metadata

const COFFEE_SENSORS: Omit<Sensor, "history">[] = [
  { id: "solar", name: "Radiación Solar", unit: "W/m²", current: 342, min: 0, max: 1200, alertMax: 900, color: "#F59E0B" },
  { id: "temp", name: "Temperatura", unit: "°C", current: 27.4, min: 15, max: 45, alertMax: 30, color: "#EF4444" },
  { id: "air_humidity", name: "Humedad Relativa", unit: "%", current: 68, min: 0, max: 100, alertMin: 45, color: "#3B82F6" },
  { id: "ph", name: "pH del Suelo", unit: "pH", current: 5.8, min: 3, max: 9, alertMin: 4.5, alertMax: 6.5, color: "#8B5CF6" },
];

const RICE_SENSORS: Omit<Sensor, "history">[] = [
  { id: "solar", name: "Radiación Solar", unit: "W/m²", current: 415, min: 0, max: 1200, alertMax: 900, color: "#F59E0B" },
  { id: "temp", name: "Temperatura", unit: "°C", current: 29.1, min: 15, max: 45, alertMax: 33, color: "#EF4444" },
  { id: "soil_humidity", name: "Humedad Volumétrica", unit: "%", current: 52, min: 0, max: 100, alertMin: 35, alertMax: 80, color: "#06B6D4" },
  { id: "ph", name: "pH del Suelo", unit: "pH", current: 6.2, min: 3, max: 9, alertMin: 5.0, alertMax: 7.5, color: "#8B5CF6" },
];

// ─── Mock alerts ───────────────────────────────────────────────────────────
// TODO: Replace with real alerts pushed from Node-RED alert flows

const MOCK_ALERTS: Alert[] = [
  { id: "a1", sensorName: "Temperatura", message: "Temperatura por encima del umbral máximo configurado", level: "critical", time: "10:32" },
  { id: "a2", sensorName: "Humedad", message: "Déficit hídrico detectado — revisar riego", level: "warning", time: "10:18" },
  { id: "a3", sensorName: "Radiación Solar", message: "Radiación solar elevada para la hora del día", level: "warning", time: "09:55" },
];

// ─── Helpers ───────────────────────────────────────────────────────────────

const fmt = (d: Date) =>
  `${d.getHours().toString().padStart(2, "0")}:${d.getMinutes().toString().padStart(2, "0")}:${d.getSeconds().toString().padStart(2, "0")}`;

function variance(id: string) {
  if (id === "solar") return 45;
  if (id === "ph") return 0.12;
  if (id === "temp") return 0.7;
  return 3;
}

function buildHistory(base: number, v: number, count = 18): Reading[] {
  const now = Date.now();
  let val = base;
  return Array.from({ length: count }, (_, i) => {
    val = +(val + (Math.random() - 0.5) * 2 * v).toFixed(2);
    return { time: fmt(new Date(now - (count - 1 - i) * 3000)), value: val };
  });
}

function initSensors(defs: Omit<Sensor, "history">[]): Sensor[] {
  return defs.map((s) => ({ ...s, history: buildHistory(s.current, variance(s.id)) }));
}

// ─── Component ─────────────────────────────────────────────────────────────

export default function SensorDetailScreen({ navigate, cropType, parcelName }: Props) {
  const isCoffee = cropType === "coffee";
  const color = isCoffee ? "#5C3317" : "#3D6B4A";
  const Icon = isCoffee ? Coffee : Wheat;
  const cropName = isCoffee ? "Café" : "Arroz";

  const [sensors, setSensors] = useState<Sensor[]>(() =>
    initSensors(isCoffee ? COFFEE_SENSORS : RICE_SENSORS)
  );
  const [alerts] = useState<Alert[]>(MOCK_ALERTS);
  const [activeSensorId, setActiveSensorId] = useState("solar");
  const [tick, setTick] = useState(0);

  // ── Simulated real-time updates ──────────────────────────────────────────
  // TODO: Replace this interval with a WebSocket / MQTT-over-WS subscription
  // or periodic GET to the InfluxDB HTTP API / a REST proxy.
  //
  // Expected payload per message:
  //   { sensor_id: string, value: number, timestamp: string (ISO 8601) }
  //
  // On each message, call: updateSensor(sensor_id, value, timestamp)
useEffect(() => {

  const fetchData = async () => {

    try {

      const response = await fetch(`http://127.0.0.1:8000/api/sensores/${cropType}`);

      const data = await response.json();

      setSensors((prev) =>
        prev.map((sensor) => {

          const sensorData = data.find(
            (d: any) => d.sensor_id === sensor.id
          );

          if (!sensorData) return sensor;

          const newValue = sensorData.value;

          return {

            ...sensor,

            current: newValue,

            history: [

              ...sensor.history.slice(-29),

              {
                time: new Date().toLocaleTimeString(),
                value: newValue
              }
            ]
          };
        })
      );

      setTick((t) => t + 1);

    } catch (error) {

      console.error("Error obteniendo sensores:", error);
    }
  };

  // Primera carga
  fetchData();

  // Actualización cada 3 segundos
  const interval = setInterval(fetchData, 3000);

  // Limpiar intervalo
  return () => clearInterval(interval);

}, []);

  const activeSensor = sensors.find((s) => s.id === activeSensorId) ?? sensors[0];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="px-6 pt-10 pb-5" style={{ backgroundColor: color }}>
        <button
          onClick={() => navigate("parcels", { cropType })}
          className="flex items-center gap-2 text-sm mb-5 transition-opacity hover:opacity-75"
          style={{ color: "rgba(250,248,243,0.65)" }}
        >
          <ArrowLeft className="w-4 h-4" />
          {cropName}
        </button>

        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs italic mb-1" style={{ color: "rgba(250,248,243,0.55)", fontFamily: "'Fraunces', serif" }}>
              Cultivo de {cropName}
            </p>
            <h1
              className="text-2xl font-semibold text-white leading-tight"
              style={{ fontFamily: "'Fraunces', serif" }}
            >
              {parcelName}
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 bg-white/10 rounded-full px-3 py-1.5">
              <RefreshCw className="w-3 h-3 text-white/70 animate-spin" style={{ animationDuration: "3s" }} />
              <span className="text-xs text-white/70" style={{ fontFamily: "'DM Mono', monospace" }}>
                {tick > 0 ? `+${tick}` : "en vivo"}
              </span>
            </div>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: "rgba(255,255,255,0.12)" }}>
              <Icon className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>
      </div>

      <div className="px-5 pt-6 pb-10 space-y-7">
        {/* Sensor cards */}
        <section>
          <p
            className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-3"
            style={{ fontFamily: "'DM Mono', monospace" }}
          >
            Sensores — Tiempo Real
          </p>
          <div className="grid grid-cols-2 gap-3">
            {sensors.map((sensor) => (
              <SensorCard
                key={sensor.id}
                sensor={sensor}
                isActive={activeSensorId === sensor.id}
                cropColor={color}
                onClick={() => setActiveSensorId(sensor.id)}
              />
            ))}
          </div>
        </section>

        {/* Chart */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <p
              className="text-xs font-medium text-muted-foreground uppercase tracking-widest"
              style={{ fontFamily: "'DM Mono', monospace" }}
            >
              Histórico
            </p>
            <span
              className="text-xs font-medium px-2 py-0.5 rounded-full"
              style={{ backgroundColor: `${activeSensor.color}18`, color: activeSensor.color }}
            >
              {activeSensor.name}
            </span>
          </div>
          <div className="bg-card border border-border rounded-2xl p-4 shadow-sm">
            <SensorChart sensor={activeSensor} />
          </div>
          <p className="text-xs text-muted-foreground text-center mt-2">
            Últimas {activeSensor.history.length} lecturas · intervalo 3s
          </p>
        </section>

        {/* All sensor charts mini-grid */}
        <section>
          <p
            className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-3"
            style={{ fontFamily: "'DM Mono', monospace" }}
          >
            Todas las Variables
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {sensors.map((sensor) => (
              <div key={sensor.id} className="bg-card border border-border rounded-2xl p-3 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-foreground">{sensor.name}</span>
                  <span
                    className="text-xs font-semibold"
                    style={{ color: sensor.color, fontFamily: "'DM Mono', monospace" }}
                  >
                    {sensor.current.toFixed(sensor.id === "ph" ? 1 : 0)} {sensor.unit}
                  </span>
                </div>
                <SensorChart sensor={sensor} compact />
              </div>
            ))}
          </div>
        </section>

        {/* Alerts */}
        <section>
          <p
            className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-3"
            style={{ fontFamily: "'DM Mono', monospace" }}
          >
            Alertas Activas
          </p>
          <AlertPanel alerts={alerts} />
          <p className="text-xs text-muted-foreground mt-2">
            Las alertas son configuradas en Node-RED según umbrales por variable.
          </p>
        </section>
      </div>
    </div>
  );
}
