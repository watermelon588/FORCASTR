import React from 'react'
import SearchBox from './SearchBox'
import Forecast from './Forecast'
import Hourly from './Hourly'
import Stat from './Stat'
import { formatCurrentWeather , formatForecast} from '../utils/utils';
import { useState , useEffect} from 'react';
import axios from "axios" ;
import OptionButton from './OptionButton';
import Current from './Current';
import { themes } from '../../config/Theme'


const BACK_URL = import.meta.env.VITE_BACK_URL;


const Weather = ({theme}) => {

    const [weatherData, setweatherData] = useState(null);
    const [forecastData, setforecastData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);
    const [error, setError] = useState("");
    const [activeTab, setActiveTab] = useState("current"); // 'current' | 'forecast' | 'hourly'


    useEffect(() => {
      if (error) {
        const timer = setTimeout(() => setError(""), 3000);
        return () => clearTimeout(timer);
      }
    }, [error]);



    // handel search 
    const handelSearch = (async(city)=>{
      try {
        setLoading(true);
        setError("");

        const [currentRes, forecastRes] = await Promise.all([
        axios.get(`${BACK_URL}/weather`, { params: { city } }),
        axios.get(`${BACK_URL}/forecast`, { params: { city } }),
        ]);

        const formatted = formatCurrentWeather(currentRes.data);
        setweatherData(formatted);
        console.log(formatted);
        const formattedData = formatForecast(forecastRes.data);
        setforecastData(formattedData);
        console.log(formattedData);
        setHasSearched(true);
        setActiveTab("current");

      } catch (err) {
        console.error(err);
        setweatherData(null);
        setforecastData(null);
        setHasSearched(false); 
        setError("Could not fetch weather for that city.");
      }finally {
      setLoading(false);
    }
    })
    //handel back
    const handleBack = () => {
      setHasSearched(false);
    };
    //handel option
    const handleOption = () => {
      setActiveTab("current");
    };

  const now = new Date();
  const timeString = now.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
  const dayString = now.toLocaleDateString("en-US", {
    weekday: "long",
  });

  const lat =
    weatherData?.latitude != null ? weatherData.latitude.toFixed(4) : "—";
  const lon =
    weatherData?.longitude != null ? weatherData.longitude.toFixed(4) : "—";

  return !hasSearched ? (
    <div className="relative w-full min-h-screen overflow-hidden text-white">

    {/* ---------- ZONE 1 : Heading + Time ---------- */}
    <div className="absolute top-[33%] left-1/2 -translate-x-1/2 flex flex-col items-center gap-6">
      <h2 className="text-black text-xs sm:text-sm md:text-lg tracking-[0.70em] font-medium text-center">
        WHEREVER YOU GO THE SKY FOLLOWS
      </h2>

      <p className="flex items-center gap-3 text-black/80 text-sm tracking-[0.20em]">
        <i className="fa-regular fa-clock"></i>
        <span>{dayString}</span>
        <span>{timeString}</span>
      </p>
    </div>

    {/* ---------- ZONE 2 : Search Box ---------- */}
    <div className="absolute top-[50%] left-1/2 -translate-x-1/2 w-[65%] max-w-[800px] flex justify-center">
      <SearchBox onSearch={handelSearch} loading={loading} error={error} theme={theme}/>
    </div>

    {/* ---------- ZONE 3 : Default Weather Preview ---------- */}
    <div className="absolute bottom-[14%] left-[29%]">
      <div className="flex flex-col gap-4">

        {/* Temperature */}
        <div className="text-4xl md:text-5xl font-light tracking-[0.18em] text-white/70">
          22°C
        </div>

        {/* Condition */}
        <div className="flex items-center gap-4 tracking-[0.40em] text-white/70">
          <i className="fa-solid fa-cloud text-lg"></i>
          <span className="text-sm md:text-base">
            Clear with periodic clouds
          </span>
        </div>

        {/* Stats */}
        {/* <div className="mt-3 flex gap-15 text-[10px] md:text-xs tracking-[0.38em] uppercase text-white/70">
          <Stat label="Precipitation" value="0%" />
          <Stat label="Humidity" value="65%" />
          <Stat label="Wind" value="5 km/h" />
        </div> */}
        <div className="mt-3 flex gap-14 text-[10px] md:text-xs tracking-[0.38em] uppercase text-white/70">

          <div className="flex flex-col gap-1">
            <span>Precipitation</span>
            <span className="tracking-[0.15em] text-white/70">0%</span>
          </div>

          <div className="flex flex-col gap-1">
            <span>Humidity</span>
            <span className="tracking-[0.15em] text-white/70">65%</span>
          </div>

          <div className="flex flex-col gap-1">
            <span>Wind</span>
            <span className="tracking-[0.15em] text-white/70">5 km/h</span>
          </div>

        </div>

      </div>
    </div>

  </div>
  ) : (
    <div className="grid grid-cols-[38%_62%] gap-16 px-28">

      {/* LEFT COLUMN */}
      <div className="flex flex-col gap-8 pt-45">
        <SearchBox onSearch={handelSearch} loading={loading}></SearchBox>
        {/* META INFO */}
        <div className="flex flex-col items-center text-black/80 text-md gap-2 mt-5">
          <p className="flex items-center gap-3 tracking-[0.15em]">
            <span><i className="fa-regular fa-clock"></i></span>
            <span className='tracking-[0.20em]'>{dayString}</span> 
            <span className='tracking-[0.20em]'>{timeString}</span>
          </p>
          <p className="tracking-[0.15em] text-xs">
            Latitude: {weatherData.latitude} | Longitude: {weatherData.longitude}
          </p>
        </div>
        {/* OPTION BUTTONS */}
        <div className="flex flex-col gap-4 mt-6">
          <OptionButton
            active={activeTab === "current"}
            label="Current Weather"
            onClick={() => setActiveTab("current")}
          />
          <OptionButton
            active={activeTab === "forecast"}
            label="Weather Forecast"
            onClick={() => setActiveTab("forecast")}
          />
          <OptionButton
            active={activeTab === "hourly"}
            label="Hourly Weather"
            onClick={() => setActiveTab("hourly")}
          />
        </div>
      </div>

      {/* RIGHT COLUMN */}
      <div className='pt-5 flex flex-col items-center gap-4'>
        {/* City heading */}
        {hasSearched && (weatherData || forecastData) && (
          <div className="text-center">
            <h2 className="text-xl md:text-2xl font-light tracking-[0.25em] text-white/80">
              {(weatherData?.city || forecastData?.city)?.toUpperCase()}
            </h2>
          </div>
        )}
        {hasSearched && weatherData && activeTab === "current" && <Current data={weatherData} onBack={handleBack} theme={theme}/>}
        {hasSearched && forecastData && activeTab === "forecast" && <Forecast data={forecastData} onBack={handleOption} theme={theme}/>}
        {hasSearched && forecastData && activeTab === "hourly" && <Hourly data={forecastData.hourly} onBack={handleOption} theme={theme}/>}
      </div>
    </div>
    
  )
}

export default Weather
