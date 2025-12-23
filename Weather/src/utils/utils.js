//-----------------current weather-------------------

export function formatCurrentWeather(raw) {
  return {
    city: raw.name,
    country: raw.sys?.country,

    // coordinates
    latitude: raw.coord?.lat,
    longitude: raw.coord?.lon,

    // timezone and timestamp
    timezoneOffset: raw.timezone, // seconds (e.g. 19800 = UTC+5:30)
    timestamp: raw.dt, // unix time
    
    // temperature
    temperature: raw.main?.temp,
    feelsLike: raw.main?.feels_like,
    tempMin: raw.main?.temp_min,
    tempMax: raw.main?.temp_max,
    humidity: raw.main?.humidity,
    pressure: raw.main?.pressure,
    visibility: raw.visibility,

    // wind
    windSpeed: raw.wind?.speed,
    windGust: raw.wind?.gust,

    // clouds
    cloudCover: raw.clouds?.all,

    // conditions
    condition: raw.weather?.[0]?.main,
    description: raw.weather?.[0]?.description,
    icon: raw.weather?.[0]?.icon,
  };
}

//-----------------forecast------------------

export function formatForecast(raw) {

    if(!raw || !raw.list) return null;

    const city = raw.city?.name || "";
    const country = raw.city?.country || "";
    const sunrise = raw.city?.sunrise || "";
    const sunset = raw.city?.sunset || "";

    // Hourly 
    const hourly = raw.list.slice(0,8).map((item) => ({
        time: item.dt_txt, 
        temp: item.main?.temp,
        feelsLike: item.main?.feels_like,
        tempMin: item.main?.temp_min,
        tempMax: item.main?.temp_max,
        humidity: item.main?.humidity,
        windSpeed: item.wind?.speed,
        description: item.weather?.[0]?.description,
        icon: item.weather?.[0]?.icon,
    }));

    // Daily 
    const dailyMap = {};

  raw.list.forEach((item) => {
    const [date] = item.dt_txt.split(" "); // "YYYY-MM-DD"
    if (!dailyMap[date]) dailyMap[date] = [];
    dailyMap[date].push(item);
  });

  const daily = Object.entries(dailyMap).map(([date, items]) => {
    // ----- High / Low -----
    const temps = items.map((i) => i.main?.temp);
    const minTemp = Math.min(...temps);
    const maxTemp = Math.max(...temps);

    // ----- Averages for humidity, pressure, wind -----
    const avg = (arr) =>
      arr.length ? arr.reduce((s, v) => s + (v ?? 0), 0) / arr.length : null;

    const avgHumidity = Math.round(
      avg(items.map((i) => i.main?.humidity))
    );

    const avgPressure = Math.round(
      avg(items.map((i) => i.main?.pressure))
    );

    const avgWindSpeed = avg(items.map((i) => i.wind?.speed));

    // max precipitation probability (%)
    const maxPop = Math.round(
      Math.max(...items.map((i) => i.pop ?? 0)) * 100
    );

    // representative item for description/icon (try noon, else middle one)
    let rep =
      items.find((i) => i.dt_txt.includes("12:00:00")) ||
      items[Math.floor(items.length / 2)];

    const description = rep.weather?.[0]?.description;
    const icon = rep.weather?.[0]?.icon;
    const windDeg = rep.wind?.deg ?? null;

    // ----- Morning / Afternoon / Evening / Night -----
    const periods = {
      morning: null,
      afternoon: null,
      evening: null,
      night: null,
    };

    items.forEach((i) => {
      const hour = new Date(i.dt_txt).getHours();
      const base = {
        temp: i.main?.temp,
        feelsLike: i.main?.feels_like,
      };

      if (hour >= 6 && hour < 12 && !periods.morning) {
        periods.morning = base;
      } else if (hour >= 12 && hour < 18 && !periods.afternoon) {
        periods.afternoon = base;
      } else if (hour >= 18 && hour < 24 && !periods.evening) {
        periods.evening = base;
      } else if (hour >= 0 && hour < 6 && !periods.night) {
        periods.night = base;
      }
    });

    return {
      date, // "2025-11-27"

      summary: {
        description,          // "few clouds"
        icon,                 // "02d"
        minTemp,              // daily low
        maxTemp,              // daily high
        humidity: avgHumidity,
        pressure: avgPressure,
        precipitationChance: maxPop,          // %
        windSpeed: avgWindSpeed
          ? Number(avgWindSpeed.toFixed(1))
          : null,
        windDeg,              // for arrow / direction
        // uvIndex: null,      // needs OneCall, not available here
        // dewPoint: null,     // also OneCall thing
      },

      periods: {
        // TEMPERATURE & FEELS LIKE table
        morning: periods.morning,     // { temp, feelsLike } or null
        afternoon: periods.afternoon,
        evening: periods.evening,
        night: periods.night,
      },

      sun: {
        sunrise, // unix (same for each day from city)
        sunset,  // unix
      },
    };
  });

  return {
    city,
    country,
    daily,
    hourly
  };
}

