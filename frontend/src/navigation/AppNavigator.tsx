import { useState } from "react";
import LoginScreen from "../screens/LoginScreen";
import CropSelectionScreen from "../screens/CropSelectionScreen";
import ParcelsScreen from "../screens/ParcelsScreen";
import SensorDetailScreen from "../screens/SensorDetailScreen";

export type CropType = "coffee" | "rice";
export type ScreenName = "login" | "cropSelection" | "parcels" | "sensorDetail";

export interface NavParams {
  cropType?: CropType;
  parcelId?: number;
  parcelName?: string;
}

export type NavigateFn = (screen: ScreenName, params?: NavParams) => void;

export default function AppNavigator() {
  const [currentScreen, setCurrentScreen] = useState<ScreenName>("login");
  const [navParams, setNavParams] = useState<NavParams>({});

  const navigate: NavigateFn = (screen, params = {}) => {
    setCurrentScreen(screen);
    setNavParams(params);
  };

  switch (currentScreen) {
    case "login":
      return <LoginScreen navigate={navigate} />;
    case "cropSelection":
      return <CropSelectionScreen navigate={navigate} />;
    case "parcels":
      return <ParcelsScreen navigate={navigate} cropType={navParams.cropType!} />;
    case "sensorDetail":
      return (
        <SensorDetailScreen
          navigate={navigate}
          cropType={navParams.cropType!}
          parcelId={navParams.parcelId!}
          parcelName={navParams.parcelName!}
        />
      );
    default:
      return <LoginScreen navigate={navigate} />;
  }
}
