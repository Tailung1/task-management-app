import { useEffect, useState } from "react";

type DeviceType = "desktop" | "tablet" | "mobile";

export default function useDeviceType() {
  const getDeviceType = (): DeviceType => {
    if (window.matchMedia("(min-width: 1024px)").matches) {
      return "desktop";
    }

    if (window.matchMedia("(min-width: 768px)").matches) {
      return "tablet";
    }

    return "mobile";
  };

  const [deviceType, setDeviceType] = useState<DeviceType>(getDeviceType);

  useEffect(() => {
    const tabletQuery = window.matchMedia("(min-width: 768px)");
    const desktopQuery = window.matchMedia("(min-width: 1024px)");

    const handleChange = () => {
      setDeviceType(getDeviceType());
    };

    tabletQuery.addEventListener("change", handleChange);
    desktopQuery.addEventListener("change", handleChange);

    return () => {
      tabletQuery.removeEventListener("change", handleChange);
      desktopQuery.removeEventListener("change", handleChange);
    };
  }, []);

  return deviceType;
}
