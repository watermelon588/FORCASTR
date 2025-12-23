import { useState } from "react";
import Stat from "./Stat";
import { getWeatherIcon } from "../utils/WeathericonMap";

const Forecast = ({ data, onBack }) => {
  const [openIndex, setOpenIndex] = useState(1);

  if (!data || !data.daily) return null;

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });

  return (
    <div
      className="
        flex flex-col
        relative mx-auto w-full max-w-[500px] 
        rounded-[20px]
        h-[590px]
        border border-white/40
        overflow-hidden  
        bg-black/30 backdrop-blur-md
        px-6 py-8 text-white
        shadow-[-15px_20px_5px_rgba(0,0,0,0.45)]
      "
    >
      {/* Header */}
      <div className="flex items-center gap-4 mb-10 shrink-0">
        <i className="fa-solid fa-angle-left scale-140 text-white/70 cursor-pointer transition-all duration-200 ease-out
           hover:scale-160 active:scale-95" onClick={onBack}></i>
        <h2 className="text-lg tracking-[0.30em]">Weather Forecast</h2>
      </div>

      {/* Forecast List */}
      <div className="
        flex-1
        overflow-y-auto
        no-scrollbar
        pr-2
        space-y-4

        scrollbar-thin
        scrollbar-thumb-white/20
        scrollbar-track-transparent
      ">
        {data.daily.slice(0, 5).map((day, index) => {
          const isOpen = openIndex === index;

          return (
            <div
              key={day.date}
              className={`
                rounded-[10px] border border-white/40
                transition-all duration-300
                ${isOpen ? "bg-black/25" : "bg-black/15"}
              `}
            >
              {/* Row Header */}
              <button
                onClick={() =>
                  setOpenIndex(isOpen ? null : index)
                }
                className="w-full flex items-center justify-between px-6 py-4"
              >
                <div className="flex items-center gap-5">
                  <span className="tracking-widest text-sm min-w-[110px]">
                    {formatDate(day.date)}
                  </span>

                  <i className={`fa-solid fa-${getWeatherIcon(day.summary.icon)} opacity-80`} />

                  <span className="tracking-widest text-sm">
                    {Math.round(day.summary.maxTemp)}° /{" "}
                    {Math.round(day.summary.minTemp)}°
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <span className="text-xs tracking-widest text-white/70">
                    {day.summary.description}
                  </span>

                  <i
                    className={`
                      fa-solid fa-angle-down transition-transform duration-300
                      ${isOpen ? "rotate-180" : ""}
                    `}
                  />
                </div>
              </button>

              {/* Expanded Panel */}
              {isOpen && (
                <div className="px-6 pb-6 pt-2 space-y-6 text-sm tracking-widest">
                  <div className="grid grid-cols-1 gap-y-2 gap-x-6">
                    <Stat
                      icon="droplet"
                      label="Humidity"
                      value={`${day.summary.humidity}%`}
                    />
                    <Stat
                      icon="gauge"
                      label="Pressure"
                      value={`${day.summary.pressure} mb`}
                    />
                    <Stat
                      icon="wind"
                      label="Wind Speed"
                      value={`${day.summary.windSpeed ?? "—"} km/h`}
                    />
                    <Stat
                      icon="cloud-rain"
                      label="Precipitation"
                      value={`${day.summary.precipitationChance}%`}
                    />
                  </div>

                  {/* <div className="h-px bg-white/40" /> */}

                  {/* Period temps */}
                  <div className="grid grid-cols-4 gap-4 text-xs tracking-widest text-white/80">
                    {Object.entries(day.periods).map(
                      ([key, val]) =>
                        val && (
                          <div key={key} className="text-center">
                            <p className="uppercase">{key}</p>
                            <p className="mt-1 text-white">
                              {Math.round(val.temp)}°c
                            </p>
                          </div>
                        )
                    )}
                  </div>

                  {/* Sun */}
                  <div className="flex justify-between text-xs tracking-widest text-white/75">
                    <span>
                      🔆SUNRISE &nbsp;{" "}
                      {new Date(
                        day.sun.sunrise * 1000
                      ).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                    <span>
                      🔅 SUNSET &nbsp;{" "}
                      {new Date(
                        day.sun.sunset * 1000
                      ).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Forecast;
