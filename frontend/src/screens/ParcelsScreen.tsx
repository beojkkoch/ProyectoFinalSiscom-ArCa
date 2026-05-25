import { ArrowLeft, Coffee, Wheat } from "lucide-react";
import { NavigateFn, CropType } from "../navigation/AppNavigator";
import ParcelCard from "../components/ParcelCard";
import StatusBadge from "../components/StatusBadge";

interface Props {
  navigate: NavigateFn;
  cropType: CropType;
}

export type AgronomicStatus = "Normal" | "Riesgo hídrico" | "Estrés térmico";

export interface Parcel {
  id: number;
  name: string;
  status: AgronomicStatus;
  location: string;
  area: string;
  lastUpdate: string;
  // TODO: Connect to real parcel status computed from InfluxDB sensor thresholds via Node-RED
}

const coffeeParcels: Parcel[] = [
  { id: 1, name: "Parcela 1", status: "Normal", location: "Zona Norte", area: "2.5 ha", lastUpdate: "Hace 30s" },
  { id: 2, name: "Parcela 2", status: "Riesgo hídrico", location: "Zona Sur", area: "3.0 ha", lastUpdate: "Hace 45s" },
  { id: 3, name: "Parcela 3", status: "Normal", location: "Zona Este", area: "2.8 ha", lastUpdate: "Hace 20s" },
  { id: 4, name: "Parcela 4", status: "Estrés térmico", location: "Zona Oeste", area: "2.2 ha", lastUpdate: "Hace 1m" },
];

const riceParcels: Parcel[] = [
  { id: 1, name: "Parcela 1", status: "Normal", location: "Lote A", area: "4.0 ha", lastUpdate: "Hace 15s" },
  { id: 2, name: "Parcela 2", status: "Normal", location: "Lote B", area: "3.5 ha", lastUpdate: "Hace 40s" },
  { id: 3, name: "Parcela 3", status: "Riesgo hídrico", location: "Lote C", area: "4.2 ha", lastUpdate: "Hace 50s" },
  { id: 4, name: "Parcela 4", status: "Estrés térmico", location: "Lote D", area: "3.8 ha", lastUpdate: "Hace 2m" },
];

const ALL_STATUSES: AgronomicStatus[] = ["Normal", "Riesgo hídrico", "Estrés térmico"];

export default function ParcelsScreen({ navigate, cropType }: Props) {
  const isCoffee = cropType === "coffee";
  const parcels = isCoffee ? coffeeParcels : riceParcels;
  const color = isCoffee ? "#5C3317" : "#3D6B4A";
  const Icon = isCoffee ? Coffee : Wheat;
  const cropName = isCoffee ? "Café" : "Arroz";
  const cropSubtitle = isCoffee ? "Coffea arabica" : "Oryza sativa";

  return (
    <div className="min-h-screen bg-background">
      {/* Colored header */}
      <div className="px-6 pt-10 pb-6" style={{ backgroundColor: color }}>
        <button
          onClick={() => navigate("cropSelection")}
          className="flex items-center gap-2 text-sm mb-6 transition-opacity hover:opacity-80"
          style={{ color: "rgba(250, 248, 243, 0.65)" }}
        >
          <ArrowLeft className="w-4 h-4" />
          Cultivos
        </button>

        <div className="flex items-center justify-between">
          <div>
            <p
              className="text-xs italic mb-1"
              style={{ color: "rgba(250,248,243,0.6)", fontFamily: "'Fraunces', serif" }}
            >
              {cropSubtitle}
            </p>
            <h1
              className="text-3xl font-semibold text-white leading-tight"
              style={{ fontFamily: "'Fraunces', serif" }}
            >
              {cropName}
            </h1>
          </div>
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ backgroundColor: "rgba(255,255,255,0.12)" }}>
            <Icon className="w-6 h-6 text-white" />
          </div>
        </div>

        {/* Status summary pills */}
        <div className="flex flex-wrap gap-2 mt-4">
          {ALL_STATUSES.map((s) => {
            const count = parcels.filter((p) => p.status === s).length;
            return count > 0 ? (
              <div key={s} className="flex items-center gap-1.5 bg-white/10 rounded-full px-3 py-1">
                <span
                  className="text-xs font-semibold text-white"
                  style={{ fontFamily: "'DM Mono', monospace" }}
                >
                  {count}
                </span>
                <StatusBadge status={s} small />
              </div>
            ) : null;
          })}
        </div>
      </div>

      {/* Parcels grid */}
      <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-4 pb-10">
        {parcels.map((parcel) => (
          <ParcelCard
            key={parcel.id}
            parcel={parcel}
            cropType={cropType}
            onClick={() =>
              navigate("sensorDetail", {
                cropType,
                parcelId: parcel.id,
                parcelName: parcel.name,
              })
            }
          />
        ))}
      </div>
    </div>
  );
}
