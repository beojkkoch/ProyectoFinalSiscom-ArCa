import { ChevronRight, MapPin, Maximize2, Clock } from "lucide-react";
import { CropType } from "../navigation/AppNavigator";
import { Parcel } from "../screens/ParcelsScreen";
import StatusBadge from "./StatusBadge";

interface Props {
  parcel: Parcel;
  cropType: CropType;
  onClick: () => void;
}

export default function ParcelCard({ parcel, cropType, onClick }: Props) {
  const color = cropType === "coffee" ? "#5C3317" : "#3D6B4A";

  return (
    <button
      onClick={onClick}
      className="w-full text-left bg-card border border-border rounded-2xl p-5 hover:shadow-md transition-all duration-200 group active:scale-[0.98]"
    >
      {/* Top row */}
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3
            className="font-semibold text-foreground text-base leading-tight"
            style={{ fontFamily: "'Fraunces', serif" }}
          >
            {parcel.name}
          </h3>
          <div className="flex items-center gap-1 mt-1">
            <MapPin className="w-3 h-3 text-muted-foreground flex-shrink-0" />
            <span className="text-xs text-muted-foreground">{parcel.location}</span>
          </div>
        </div>
        <ChevronRight
          className="w-4 h-4 text-muted-foreground mt-0.5 group-hover:translate-x-0.5 transition-transform flex-shrink-0"
        />
      </div>

      <StatusBadge status={parcel.status} />

      {/* Bottom row */}
      <div
        className="flex items-center justify-between mt-4 pt-3"
        style={{ borderTop: "1px solid rgba(92,51,23,0.08)" }}
      >
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <Maximize2 className="w-3 h-3 text-muted-foreground" />
            <span
              className="text-xs text-muted-foreground"
              style={{ fontFamily: "'DM Mono', monospace" }}
            >
              {parcel.area}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Clock className="w-3 h-3 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">{parcel.lastUpdate}</span>
        </div>
      </div>

      {/* Accent bottom bar */}
      <div
        className="mt-3 h-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        style={{ backgroundColor: color }}
      />
    </button>
  );
}
