import { Sun, Thermometer, Droplets, FlaskConical } from "lucide-react";
import { Sensor } from "../screens/SensorDetailScreen";

interface Props {
  sensor: Sensor;
  isActive: boolean;
  cropColor: string;
  onClick: () => void;
}

const iconMap: Record<string, React.FC<{ className?: string; style?: React.CSSProperties }>> = {
  solar: Sun,
  temp: Thermometer,
  air_humidity: Droplets,
  soil_humidity: Droplets,
  ph: FlaskConical,
};

function isAlerting(sensor: Sensor): boolean {
  const v = sensor.current;
  if (sensor.alertMin !== undefined && v < sensor.alertMin) return true;
  if (sensor.alertMax !== undefined && v > sensor.alertMax) return true;
  return false;
}

export default function SensorCard({ sensor, isActive, cropColor, onClick }: Props) {
  const Icon = iconMap[sensor.id] ?? Sun;
  const alerting = isAlerting(sensor);
  const pct = Math.min(100, Math.max(0, ((sensor.current - sensor.min) / (sensor.max - sensor.min)) * 100));

  const decimals = sensor.id === "ph" ? 1 : sensor.id === "temp" ? 1 : 0;

  return (
    <button
      onClick={onClick}
      className="text-left rounded-2xl p-4 border transition-all duration-200 active:scale-[0.97]"
      style={
        isActive
          ? { backgroundColor: cropColor, borderColor: cropColor, color: "#FAF8F3" }
          : { backgroundColor: "#FFFFFF", borderColor: "rgba(92,51,23,0.12)", color: "#2A1A0E" }
      }
    >
      {/* Icon + alert */}
      <div className="flex items-center justify-between mb-2.5">
        <div
          className="w-7 h-7 rounded-lg flex items-center justify-center"
          style={{
            backgroundColor: isActive ? "rgba(255,255,255,0.15)" : `${sensor.color}18`,
          }}
        >
          <Icon className="w-3.5 h-3.5" style={{ color: isActive ? "#FAF8F3" : sensor.color }} />
        </div>
        {alerting && (
          <span
            className="text-xs px-1.5 py-0.5 rounded-full font-semibold"
            style={
              isActive
                ? { backgroundColor: "rgba(255,255,255,0.2)", color: "#FAF8F3" }
                : { backgroundColor: "#FFF7ED", color: "#C2410C" }
            }
          >
            Alerta
          </span>
        )}
      </div>

      {/* Value */}
      <div className="mt-0.5">
        <span
          className="text-2xl font-medium leading-none tracking-tight"
          style={{ fontFamily: "'DM Mono', monospace" }}
        >
          {sensor.current.toFixed(decimals)}
        </span>
        <span
          className="text-xs ml-1"
          style={{ color: isActive ? "rgba(250,248,243,0.65)" : "#9B7B65" }}
        >
          {sensor.unit}
        </span>
      </div>

      {/* Label */}
      <p
        className="text-xs mt-1 leading-tight"
        style={{ color: isActive ? "rgba(250,248,243,0.7)" : "#9B7B65" }}
      >
        {sensor.name}
      </p>

      {/* Progress bar */}
      <div
        className="mt-3 h-1 rounded-full overflow-hidden"
        style={{ backgroundColor: isActive ? "rgba(255,255,255,0.2)" : "#F5EFE4" }}
      >
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{
            width: `${pct}%`,
            backgroundColor: isActive ? "rgba(250,248,243,0.85)" : sensor.color,
          }}
        />
      </div>
    </button>
  );
}
