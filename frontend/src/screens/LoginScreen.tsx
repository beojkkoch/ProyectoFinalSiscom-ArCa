import { useState } from "react";
import { Lock, User, Leaf } from "lucide-react";
import { NavigateFn } from "../navigation/AppNavigator";

interface Props {
  navigate: NavigateFn;
}

export default function LoginScreen({ navigate }: Props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    if (!username || !password) return;
    setLoading(true);
    // TODO: Replace with real authentication against your backend
    setTimeout(() => {
      setLoading(false);
      navigate("cropSelection");
    }, 800);
  };

  return (
    <div
      className="min-h-screen bg-background flex items-center justify-center p-6"
      style={{ backgroundImage: "radial-gradient(ellipse at 60% 20%, rgba(196,146,74,0.08) 0%, transparent 60%)" }}
    >
      <div className="w-full max-w-xs">
        {/* Logo mark */}
        <div className="flex flex-col items-center mb-12">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5 shadow-sm"
            style={{ backgroundColor: "#5C3317" }}
          >
            <Leaf className="w-8 h-8 text-white" />
          </div>
          <h1
            className="text-3xl font-semibold text-foreground tracking-tight"
            style={{ fontFamily: "'Fraunces', serif" }}
          >
            AgroSense
          </h1>
          <p className="text-sm text-muted-foreground mt-1.5 tracking-wide">
            Monitoreo de Cultivos IoT
          </p>
        </div>

        {/* Fields */}
        <div className="space-y-3">
          <div className="relative">
            <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            <input
              type="text"
              placeholder="Usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-card border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring text-sm transition-shadow"
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              className="w-full pl-10 pr-4 py-3 bg-card border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring text-sm transition-shadow"
            />
          </div>
          <button
            onClick={handleLogin}
            disabled={loading || !username || !password}
            className="w-full py-3 rounded-xl font-medium text-sm transition-all duration-150 disabled:opacity-50"
            style={{ backgroundColor: "#5C3317", color: "#FAF8F3" }}
          >
            {loading ? "Ingresando..." : "Ingresar"}
          </button>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-8">
          Sistema de telemetría agrícola · MQTT + InfluxDB
        </p>
      </div>
    </div>
  );
}
