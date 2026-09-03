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
  const [location, setLocation] = useState<string | null>(null)
  const [mapType, setMapType] = useState<string | null>(null)

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
      <div className="pt-8 flex gap-8 justify-center">
        <div className="flex gap-4 items-center lg:flex-col lg:gap-4">
          <h1 className="text-1xl font-semibold">Location</h1>
          <LocationDropdown location={location ?? ""} setLocation={setLocation} />
        </div>
        <div className="flex gap-4 items-center lg:flex-col lg:gap-4">
          <h1 className="text-1xl font-semibold ">Map Type</h1>
          <MapTypeDropdown mapType={mapType} setMapType={setMapType} />
        </div>
      </div>
      <Map coords={coords} onMapClick={onMapClick} mapType={mapType ?? ""} />
      <CurrentWeather coords={coords} />
      <HourlyForecast coords={coords}/>
      <DailyForecast coords={coords}/>
      <AdditionalInfo coords={coords}/>
    </div>
  )
}



export default App
