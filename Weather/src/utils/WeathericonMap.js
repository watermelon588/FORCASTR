export function getWeatherIcon(iconCode) {
  if (!iconCode) return "cloud";

  const code = iconCode.slice(0, 2); // "50d" → "50"
  const isNight = iconCode.endsWith("n");

  switch (code) {
    case "01":
      return isNight ? "moon" : "sun";

    case "02":
      return isNight ? "cloud-moon" : "cloud-sun";

    case "03":
    case "04":
      return "cloud";

    case "09":
    case "10":
      return "cloud-rain";

    case "11":
      return "bolt";

    case "13":
      return "snowflake";

    case "50":
      return "smog"; // fog / mist

    default:
      return "cloud";
  }
}
