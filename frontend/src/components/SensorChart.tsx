import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  ResponsiveContainer,
} from "recharts";
import { Sensor } from "../screens/SensorDetailScreen";

interface Props {
  sensor: Sensor;
  compact?: boolean;
}

export default function SensorChart({ sensor, compact }: Props) {
  const height = compact ? 90 : 200;
  const data = sensor.history.slice(compact ? -12 : -25);

  const domainPad = (sensor.max - sensor.min) * 0.08;
  const yMin = +(sensor.min - domainPad).toFixed(1);
  const yMax = +(sensor.max + domainPad).toFixed(1);

  const decimals = sensor.id === "ph" ? 1 : sensor.id === "temp" ? 1 : 0;

  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data} margin={{ top: 6, right: 6, left: compact ? -32 : -16, bottom: 0 }}>
        <CartesianGrid
          strokeDasharray="3 3"
          stroke="rgba(92,51,23,0.06)"
          vertical={false}
        />

        {!compact && (
          <XAxis
            dataKey="time"
            tick={{ fontSize: 10, fill: "#9B7B65", fontFamily: "'DM Mono', monospace" }}
            tickLine={false}
            axisLine={false}
            interval="preserveStartEnd"
          />
        )}

        <YAxis
          tick={{ fontSize: 10, fill: "#9B7B65", fontFamily: "'DM Mono', monospace" }}
          tickLine={false}
          axisLine={false}
          domain={[yMin, yMax]}
          width={compact ? 36 : 42}
          tickFormatter={(v) => v.toFixed(decimals)}
        />

        {!compact && (
          <Tooltip
            contentStyle={{
              background: "#FFFFFF",
              border: "1px solid rgba(92,51,23,0.12)",
              borderRadius: "10px",
              fontSize: "12px",
              fontFamily: "'DM Mono', monospace",
              padding: "8px 12px",
              boxShadow: "0 4px 16px rgba(42,26,14,0.08)",
            }}
            formatter={(value: number) => [
              `${value.toFixed(decimals)} ${sensor.unit}`,
              sensor.name,
            ]}
            labelStyle={{ color: "#9B7B65", fontSize: "10px", marginBottom: "2px" }}
            cursor={{ stroke: `${sensor.color}40`, strokeWidth: 1 }}
          />
        )}

        {/* Alert threshold lines */}
        {!compact && sensor.alertMin !== undefined && (
          <ReferenceLine
            y={sensor.alertMin}
            stroke="#3B82F6"
            strokeDasharray="5 4"
            strokeWidth={1.5}
            label={{
              value: `Min ${sensor.alertMin}`,
              fill: "#3B82F6",
              fontSize: 9,
              fontFamily: "'DM Mono', monospace",
              position: "insideTopLeft",
            }}
          />
        )}
        {!compact && sensor.alertMax !== undefined && (
          <ReferenceLine
            y={sensor.alertMax}
            stroke="#EF4444"
            strokeDasharray="5 4"
            strokeWidth={1.5}
            label={{
              value: `Max ${sensor.alertMax}`,
              fill: "#EF4444",
              fontSize: 9,
              fontFamily: "'DM Mono', monospace",
              position: "insideTopLeft",
            }}
          />
        )}

        <Line
          type="monotone"
          dataKey="value"
          stroke={sensor.color}
          strokeWidth={compact ? 1.5 : 2}
          dot={false}
          activeDot={compact ? false : { r: 4, fill: sensor.color, stroke: "#fff", strokeWidth: 2 }}
          isAnimationActive={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
