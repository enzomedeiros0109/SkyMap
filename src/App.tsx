import DailyForecast from "./components/cards/daily-forecast"
import HourlyForecast from "./components/cards/hourly-forecast"
import CurrentWeather from "./components/cards/current-weather"
import AdditionalInfo from "./components/cards/additional-info"
import Map from "./components/map"
import { useState } from "react"
import type { Coords } from "./types"
import LocationDropdown from "./components/dropdowns/location-dropdown"
import { useQuery } from "@tanstack/react-query"
import { getGeocode } from "./api/api"
import MapTypeDropdown from "./components/dropdowns/map-type-dropdown"

function App() {

  const [coordinates, setCoords] = useState<Coords>({lat: 25, lon: 25})
  const [location, setLocation] = useState<string | null>("Brasília")

  const {data} = useQuery({
    queryKey: ['geocode', location],
    queryFn: () => getGeocode(location ?? "Brasília")
  })

  const onMapClick = (lat: number, lon: number) => {
    setCoords({lat, lon})
    setLocation('custom')
  }

  const coords = location === 'custom'
    ? coordinates
    : {
        lat: data?.[0]?.lat ?? 0,
        lon: data?.[0]?.lon ?? 0
      }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex gap-2">
        <LocationDropdown location={location ?? "Brasília"} setLocation={setLocation} />
        <MapTypeDropdown />
      </div>
      <Map coords={coords} onMapClick={onMapClick}/>
      <CurrentWeather coords={coords} />
      <HourlyForecast coords={coords}/>
      <DailyForecast coords={coords}/>
      <AdditionalInfo coords={coords}/>
    </div>
  )
}



export default App
