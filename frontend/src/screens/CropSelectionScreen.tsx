import { Coffee, Wheat, ChevronRight, Wifi } from "lucide-react";
import { NavigateFn, CropType } from "../navigation/AppNavigator";

interface Props {
  navigate: NavigateFn;
}

const crops = [
  {
    id: "coffee" as CropType,
    name: "Café",
    subtitle: "Coffea arabica",
    parcels: 4,
    icon: Coffee,
    color: "#5C3317",
    bgLight: "#FDF6EE",
    sensors: ["Radiación Solar", "Temperatura", "Humedad Relativa", "pH del Suelo"],
    online: 4,
  },
  {
    id: "rice" as CropType,
    name: "Arroz",
    subtitle: "Oryza sativa",
    parcels: 4,
    icon: Wheat,
    color: "#3D6B4A",
    bgLight: "#EEF5F1",
    sensors: ["Radiación Solar", "Temperatura", "Humedad Volumétrica", "pH del Suelo"],
    online: 4,
  },
];

export default function CropSelectionScreen({ navigate }: Props) {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="px-6 pt-12 pb-8">
        <p
          className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-2"
          style={{ fontFamily: "'DM Mono', monospace" }}
        >
          Panel de Control
        </p>
        <h1
          className="text-4xl font-semibold text-foreground leading-tight"
          style={{ fontFamily: "'Fraunces', serif" }}
        >
          Cultivos
        </h1>
        <p className="text-sm text-muted-foreground mt-2">
          Selecciona el cultivo a monitorear
        </p>
      </div>

      {/* Cards */}
      <div className="px-6 space-y-4 pb-10">
        {crops.map((crop) => {
          const Icon = crop.icon;
          return (
            <button
              key={crop.id}
              onClick={() => navigate("parcels", { cropType: crop.id })}
              className="w-full text-left rounded-2xl overflow-hidden border border-border bg-card hover:shadow-lg transition-all duration-200 group"
            >
              <div className="flex items-stretch">
                {/* Accent stripe */}
                <div className="w-1.5 flex-shrink-0" style={{ backgroundColor: crop.color }} />

                <div className="flex-1 p-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3.5">
                      <div
                        className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: crop.bgLight }}
                      >
                        <Icon className="w-5 h-5" style={{ color: crop.color }} />
                      </div>
                      <div>
                        <h2
                          className="text-lg font-semibold text-foreground leading-tight"
                          style={{ fontFamily: "'Fraunces', serif" }}
                        >
                          {crop.name}
                        </h2>
                        <p className="text-xs text-muted-foreground italic mt-0.5">{crop.subtitle}</p>
                      </div>
                    </div>
                    <ChevronRight
                      className="w-4 h-4 text-muted-foreground group-hover:translate-x-0.5 transition-transform flex-shrink-0"
                    />
                  </div>

                  {/* Metadata row */}
                  <div className="flex items-center gap-4 mt-4">
                    <div className="flex items-center gap-1.5">
                      <Wifi className="w-3.5 h-3.5" style={{ color: crop.color }} />
                      <span
                        className="text-xs font-medium"
                        style={{ color: crop.color, fontFamily: "'DM Mono', monospace" }}
                      >
                        {crop.online}/{crop.parcels} en línea
                      </span>
                    </div>
                    <span className="text-xs text-muted-foreground">{crop.parcels} parcelas</span>
                  </div>

                  {/* Sensor tags */}
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {crop.sensors.map((s) => (
                      <span
                        key={s}
                        className="text-xs px-2.5 py-0.5 rounded-full border"
                        style={{
                          backgroundColor: crop.bgLight,
                          color: crop.color,
                          borderColor: `${crop.color}22`,
                        }}
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Footer status */}
      <div className="px-6 pb-8">
        <div className="flex items-center gap-2 p-3 rounded-xl bg-muted">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span
            className="text-xs text-muted-foreground"
            style={{ fontFamily: "'DM Mono', monospace" }}
          >
            Broker MQTT conectado · Node-RED activo · InfluxDB en línea
          </span>
        </div>
      </div>
    </div>
  );
}
