# Weather Maps

A React + TypeScript weather application that combines a map-based interface with current conditions, hourly forecasts, and multi-day weather details.

## Features

- Interactive map for selecting a location
- Current weather card with temperature and conditions
- Hourly forecast summary
- Daily forecast section
- Additional weather information such as humidity, wind, and visibility
- Responsive layout built with React and Tailwind
- MapTiler base map with OpenWeather weather map overlays

## Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- Leaflet and react-leaflet
- MapTiler SDK
- OpenWeather API

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file in the project root and add your OpenWeather API key:

```bash
VITE_API_KEY=your_api_key
VITE_MAP_TILER_API_KEY=your_maptiler_api_key
```

3. Start the app in development mode:

```bash
npm run dev
```

4. Open the local URL shown in the terminal to view the app.

### Map API

The map is built with Leaflet and uses the following services:

- **MapTiler** provides the base map using the `basic-dark` style.
- **OpenWeather Maps** provides weather overlay tiles. The selected map type is sent to the tile endpoint as the layer name.

Create API keys at [OpenWeather](https://openweathermap.org/api) and [MapTiler](https://www.maptiler.com/cloud/), then add them to the `.env` file in the project root:

```env
VITE_API_KEY=your_openweather_api_key
VITE_MAP_TILER_API_KEY=your_maptiler_api_key
```

Supported OpenWeather map layers are `precipitation_new`, `snow_new`, `clouds_new`, `temp_new`, `pressure_new`, and `wind_new`.

## Notes

- This project was made using a support material. You can access it [here](https://youtu.be/M-iV9R3kLNA?si=FfYQupwby2NDozpT)

