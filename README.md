# 🌤️ FORCASTR

**Feel the forecast.**

A glass-morphism inspired weather experience built with **React**, **Tailwind CSS**, and the **OpenWeather API**, focused on **clarity**, **motion**, and **calm UI** rather than data overload.

---

## 🎨 Design Reference (Figma Exports)

All UI screens and theme explorations were originally designed in Figma  
and exported as static references inside this repository.

### Main App Screens
- Landing screen
- Current weather view
- Forecast view
- Hourly weather view
- Expanded forecast states

### Theme Explorations
- Alternate background themes
- Light / dark mood variations
- Weather-based visual concepts

---

## ✨ What makes it different?

- 🌌 **Minimal UI, maximum depth**
- 🪟 Glassmorphism cards with smooth transitions
- 🔍 Intelligent search with graceful error handling
- 📍 Current weather, 5-day forecast & hourly breakdown
- 🎨 Theme-aware visuals (background + text harmony)
- 🧭 Expandable forecasts instead of cluttered tables

This app is designed to *feel* like weather, not just display it.

---

## 🧠 Tech Stack

- **React (Vite)**
- **Tailwind CSS**
- **OpenWeather API**
- **Font Awesome**
- **Axios**
- **React Router**

---

## 🗺️ Features

### 🌤 Current Weather
- Temperature & RealFeel
- Min / Max temperature
- Humidity, Pressure, Wind, Visibility
- Clean, focused presentation

### 📆 Weather Forecast
- Next 5 days overview
- Expandable day cards
- Morning / Afternoon / Evening / Night temps
- Precipitation & wind insights
- Scrollable container (fixed size, clean UX)

### ⏰ Hourly Weather
- Next 24 hours snapshot
- Expandable hourly rows
- Key stats per hour
- Smooth hover & expand animations

---

## 🎨 Themes

Themes are centrally managed and passed to all components for consistency.

Each theme controls:
- Background image
- Text color
- Secondary text color
- Accent color
- Icon style

---
Below is the complete design exploration for **FORCASTR**, created in Figma  
and exported as a single reference frame.

<p align="center">
  <img src="Weather/src/assets/Figma/figma.png" alt="FORCASTR Figma Design" width="90%" />
</p>

![FORCASTR – Figma Design](Weather/src/assets/Figma/figma.png)


## 🚀 Getting Started

```bash
git clone https://github.com/your-username/forcastr.git
cd forcastr
npm install
npm run dev

Create a .env file in the root directory:

VITE_OPENWEATHER_API_KEY=your_api_key_here
```
🧩 Folder Structure
```bash
src/
 ├─ components/
 │   ├─ Weather.jsx
 │   ├─ Current.jsx
 │   ├─ Forecast.jsx
 │   ├─ HourlyWeather.jsx
 │   └─ Stat.jsx
 ├─ pages/
 │   └─ Home.jsx
 ├─ utils/
 │   └─ formatForecast.js
 ├─ assets/
 │   ├─ images/
 │   └─ Figma/
 │      ├─ designs/
 │      └─ themes/
```
🎨 Design Files (Inside Repo)

Figma design templates can be found at:
```bash
src/assets/Figma/designs/
```

Alternate theme and concept explorations:
```bash
src/assets/Figma/themes/
```
---

🌱 Future Ideas

Theme auto-switch based on weather

Animated weather icons

Offline fallback

Location-based forecast

Accessibility mode

🧭 Why FORCASTR?

FORCASTR started as a from-scratch experiment.

No templates

No UI kits

No copy–paste apps

I wanted to hard-code everything myself —
from API calls and data formatting
to layout decisions and micro-interactions —
and truly understand how a real-world product comes together.

Many more projects are on the way.
