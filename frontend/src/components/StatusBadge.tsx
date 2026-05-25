import { AgronomicStatus } from "../screens/ParcelsScreen";

interface Props {
  status: AgronomicStatus;
  small?: boolean;
}

const config: Record<AgronomicStatus, { dot: string; text: string; bg: string; border: string }> = {
  "Normal": {
    dot: "#22C55E",
    text: "#15803D",
    bg: "#F0FDF4",
    border: "#BBF7D0",
  },
  "Riesgo hídrico": {
    dot: "#3B82F6",
    text: "#1D4ED8",
    bg: "#EFF6FF",
    border: "#BFDBFE",
  },
  "Estrés térmico": {
    dot: "#F97316",
    text: "#C2410C",
    bg: "#FFF7ED",
    border: "#FED7AA",
  },
};

export default function StatusBadge({ status, small }: Props) {
  const { dot, text, bg, border } = config[status];
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border font-medium ${small ? "px-2 py-0.5 text-xs" : "px-3 py-1 text-xs"}`}
      style={{ backgroundColor: bg, color: text, borderColor: border }}
    >
      <span
        className="rounded-full flex-shrink-0"
        style={{ width: "6px", height: "6px", backgroundColor: dot }}
      />
      {status}
    </span>
  );
}
