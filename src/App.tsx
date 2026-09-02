import DailyForecast from "./components/cards/daily-forecast"
import HourlyForecast from "./components/cards/hourly-forecast"
import CurrentWeather from "./components/cards/current-weather"
import AdditionalInfo from "./components/cards/additional-info"
import Map from "./components/map"
import { useState } from "react"
import type { Coords } from "./types"
import LocationDropdown from "./components/dropdowns/location-dropdown"

function App() {

  const [coords, setCoords] = useState<Coords>({lat: 25, lon: 25})

  const onMapClick = (lat: number, lon: number) => {
    setCoords({lat, lon})
  }

  return (
    <div className="flex flex-col gap-8">
      <LocationDropdown />
      <Map coords={coords} onMapClick={onMapClick}/>
      <CurrentWeather coords={coords} />
      <HourlyForecast coords={coords}/>
      <DailyForecast coords={coords}/>
      <AdditionalInfo coords={coords}/>
    </div>
  )
}



export default App
