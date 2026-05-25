import { AlertTriangle, AlertCircle, CheckCircle } from "lucide-react";
import { Alert } from "../screens/SensorDetailScreen";

interface Props {
  alerts: Alert[];
}

export default function AlertPanel({ alerts }: Props) {
  if (alerts.length === 0) {
    return (
      <div
        className="flex items-center gap-3 rounded-2xl px-4 py-3 border"
        style={{ backgroundColor: "#F0FDF4", borderColor: "#BBF7D0" }}
      >
        <CheckCircle className="w-4 h-4 flex-shrink-0" style={{ color: "#22C55E" }} />
        <p className="text-sm font-medium" style={{ color: "#15803D" }}>
          Sin alertas activas
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {alerts.map((alert) => {
        const isCritical = alert.level === "critical";
        return (
          <div
            key={alert.id}
            className="flex items-start gap-3 rounded-2xl px-4 py-3.5 border"
            style={
              isCritical
                ? { backgroundColor: "#FEF2F2", borderColor: "#FECACA" }
                : { backgroundColor: "#FFF7ED", borderColor: "#FED7AA" }
            }
          >
            {isCritical ? (
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: "#EF4444" }} />
            ) : (
              <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: "#F97316" }} />
            )}
            <div className="flex-1 min-w-0">
              <p
                className="text-xs font-semibold leading-tight"
                style={{ color: isCritical ? "#B91C1C" : "#C2410C" }}
              >
                {alert.sensorName}
              </p>
              <p
                className="text-xs mt-0.5 leading-snug"
                style={{ color: isCritical ? "#DC2626" : "#EA580C" }}
              >
                {alert.message}
              </p>
            </div>
            <span
              className="text-xs flex-shrink-0 mt-0.5"
              style={{ color: "#9B7B65", fontFamily: "'DM Mono', monospace" }}
            >
              {alert.time}
            </span>
          </div>
        );
      })}
    </div>
  );
}
