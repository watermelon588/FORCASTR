import { useState } from "react";
import Stat from "./Stat";
import { getWeatherIcon } from "../utils/WeathericonMap";

const HourlyWeather = ({ data, onBack }) => {
  const [openIndex, setOpenIndex] = useState(1);

  if (!data || !data.length) return null;

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div
      className="
        flex flex-col
        relative mx-auto w-full max-w-[500px]
        h-[590px]
        overflow-hidden
        rounded-[20px]
        border border-white/40
        bg-black/30
        backdrop-blur-md
        px-6 py-8
        text-white
        shadow-[-15px_20px_5px_rgba(0,0,0,0.45)]
      "
    >
      {/* Header */}
      <div className="flex items-center gap-6 mb-6 shrink-0">
        <i className="fa-solid fa-angle-left scale-140 text-white/70 cursor-pointer transition-all duration-200 ease-out
           hover:scale-160 active:scale-95" onClick={onBack}></i>
        <h2 className="text-lg tracking-[0.30em]">
          Hourly Weather
        </h2>
      </div>

      {/* Scrollable list */}
      <div className="flex-1 overflow-y-auto no-scrollbar pr-1">
        {data.map((hour, idx) => {
          const time = new Date(hour.time).toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
          });

          const isOpen = openIndex === idx;

          return (
            <div key={idx}>
              {/* ROW */}
              <button
                onClick={() => toggle(idx)}
                className={`w-full flex items-center justify-between
                  py-4
                  px-4
                  rounded-t-[5px]
                  text-left
                  transition-colors duration-200
                  hover:bg-black/5
                  ${isOpen ? "bg-black/5" : ""}
                  `}
              >
                {/* LEFT */}
                <div className="flex items-center gap-5">
                  <span className="text-sm tracking-widest text-white/90 w-[75px]">
                    {time}
                  </span>

                  <i className={`fa-solid fa-${getWeatherIcon(hour.icon)} text-lg opacity-70 pl-2`} />

                  <span className="text-base tracking-wide">
                    {Math.round(hour.temp)}°c
                  </span>
                </div>

                {/* RIGHT */}
                <div className="flex items-center gap-4">
                  <span className="text-sm tracking-widest text-white/70 capitalize">
                    {hour.description}
                  </span>

                  <i
                    className={`
                      fa-solid fa-chevron-down
                      text-xs text-white/60
                      transition-transform duration-300
                      ${isOpen ? "rotate-180" : ""}
                    `}
                  />
                </div>
              </button>

              {/* EXPANDED CONTENT */}
              <div
                className={`
                  grid transition-all duration-300 ease-out 
                  overflow-hidden
                  ${isOpen ? "grid-rows-[1fr] opacity-100 bg-black/5" : "grid-rows-[0fr] opacity-0"}
                `}
              >
                <div className="overflow-hidden">
                  <div className="pb-4 pl-4 pr-4">
                    <div className="grid grid-cols-1 gap-1 text-xs tracking-widest">
                      <Stat
                        icon="droplet"
                        label="Humidity"
                        value={`${hour.humidity}%`}
                      />
                      <Stat
                        icon="wind"
                        label="Wind"
                        value={`${hour.windSpeed?.toFixed(1)} km/h`}
                      />
                      <Stat
                        icon="temperature-high"
                        label="Feels"
                        value={`${Math.round(hour.feelsLike)}°C`}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* DIVIDER */}
              {idx !== data.length - 1 && (
                <div className="h-px bg-white/40" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HourlyWeather;
