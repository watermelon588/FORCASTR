import Stat from "./Stat";
import { getWeatherIcon } from "../utils/WeathericonMap";

const Current = ({ data ,onBack}) => {
  if (!data) return null;

  return (
    <div
      className="
        relative
        mx-auto               /* center inside right column */
        w-full
        max-w-[500px]         /* 👈 controls width */
        min-h-[560px]
        h-[590px]         /* 👈 increases height */
        rounded-[20px]
        border border-white/40
        bg-black/30
        backdrop-blur-md
        px-10 py-8
        text-white
        shadow-[-15px_20px_5px_rgba(0,0,0,0.45)]
      "
    >
      {/* Header */}
      <div className="flex items-center gap-4 mb-10">
        <i className="fa-solid fa-angle-left scale-140 text-white/70 cursor-pointer transition-all duration-200 ease-out
           hover:scale-160 active:scale-95" onClick={onBack}></i>
        <h2 className="text-lg tracking-[0.30em]">
          Current Weather
        </h2>
      </div>

{/* Main temperature block */}
<div className="flex items-start gap-12 mt-6">

  {/* LEFT : Icon + Temp */}
  <div className="flex flex-col items-center gap-1 min-w-[140px]">
    <i className={`fa-solid fa-${getWeatherIcon(data.icon)} text-5xl opacity-90 pb-3`}></i>

    <span className="text-4xl font-light tracking-[.05em]">
      {data.temperature}°C
    </span>

    <p className="text-sm text-white/80 tracking-[.15em]">
      RealFeel {data.feelsLike}°C
    </p>
  </div>

  {/* Vertical divider */}
  <div className="w-px h-28 bg-white/40" />

  {/* RIGHT : Condition + Min/Max */}
  <div className="flex flex-col gap-8 pt-3">
    <p className="text-lg tracking-widest text-white">
      {data.condition}
    </p>

    <div className="space-y-1 text-sm tracking-[.15em] text-white/90">
      <p>
        Max temp&nbsp;&nbsp;
        <span className="font-medium">{data.tempMax}°C</span>
      </p>
      <p>
        Min temp&nbsp;&nbsp;
        <span className="font-medium">{data.tempMin}°C</span>
      </p>
    </div>
  </div>

</div>


      {/* Divider */}
      <div className="my-8 h-px bg-white/80" />

      {/* Stats */}
      <div className="grid grid-cols-1 gap-y-5 gap-x-8 text-md tracking-[.15em] ">
        <Stat icon="droplet" label="Humidity" value={`${data.humidity}%`} />
        <Stat icon="gauge" label="Pressure" value={`${data.pressure} mb`} />
        <Stat
          icon="wind"
          label="Wind Gusts"
          value={
            data.windGust
              ? `${data.windGust} km/h`
              : "—"
          }
        />
        <Stat
          icon="wind"
          label="Wind Speed"
          value={
            data.windSpeed
              ? `${data.windSpeed} km/h`
              : "—"
          }
        />
        <Stat
          icon="eye"
          label="Visibility"
          value={`${(data.visibility / 1000).toFixed(1)} km`}
        />
        <Stat icon="cloud" label="Cloud Cover" value={`${data.cloudCover}%`} />
      </div>
    </div>
  );
};

export default Current;
