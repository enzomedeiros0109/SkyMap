import DailyForecast from "./components/cards/daily-forecast"
import HourlyForecast from "./components/cards/hourly-forecast"
import CurrentWeather from "./components/cards/current-weather"
import AdditionalInfo from "./components/cards/additional-info"
import Map from "./components/map"
import { Suspense, useState } from "react"
import type { Coords } from "./types"
import LocationDropdown from "./components/dropdowns/location-dropdown"
import { useQuery } from "@tanstack/react-query"
import { getGeocode } from "./api/api"
import MapTypeDropdown from "./components/dropdowns/map-type-dropdown"
import MapLegend from "./components/map-legend"
import CurrentWeatherSkeleton from "./components/skeletons/main-page/current-weather-skeleton"
import DailyForecastSkeleton from "./components/skeletons/main-page/daily-forecast-skeleton"
import HourlyForecastSkeleton from "./components/skeletons/main-page/hourly-forecast-skeleton"
import AdditionalInfoSkeleton from "./components/skeletons/main-page/additional-weather-info-skeleton"
import SidePanel from "./components/side-panel"
import { TooltipProvider } from "./components/ui/tooltip"


function App() {

  const [coordinates, setCoords] = useState<Coords>({ lat: 25, lon: 25 })
  const [location, setLocation] = useState<string | null>(null)
  const [mapType, setMapType] = useState<string | null>(null)
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false)

  const { data } = useQuery({
    queryKey: ['geocode', location],
    queryFn: () => getGeocode(location ?? "Brasília")
  })

  const onMapClick = (lat: number, lon: number) => {
    setCoords({ lat, lon })
    setLocation('custom')
  }

  const coords = location === 'custom'
    ? coordinates
    : {
      lat: data?.[0]?.lat ?? 0,
      lon: data?.[0]?.lon ?? 0
    }

  return (
    <>
      <div className="flex flex-col gap-8 p-8 w-full lg:w-[cal(100dvw-var(--sidebar-width))] 2xl:h-screen">
        <div className="flex flex-col md:flex-row gap-2 md:gap-4 justify-center items-center">
          <div className="flex gap-4 lg:flex-col lg:gap-2 items-center">
            <h1 className="text-1xl font-semibold">Location</h1>
            <LocationDropdown location={location ?? ""} setLocation={setLocation} />
          </div>
          <div className="flex gap-4 items-center lg:flex-col lg:gap-2">
            <h1 className="text-1xl font-semibold whitespace-nowrap">Map Type</h1>
            <MapTypeDropdown mapType={mapType} setMapType={setMapType} />
          </div>
        </div>




        <div className="grid grid-cols-1 2xl:flex-1 md:grid-cols-2 2xl:grid-cols-4 2xl:grid-rows-4 gap-4">
          <div className="relative h-120 2xl:h-auto col-span-1 md:col-span-2 2xl:col-span-4 2xl:row-span-2 order-1 ">
            <Map coords={coords} onMapClick={onMapClick} mapType={mapType ?? ""} />
            <MapLegend mapType={mapType} />
          </div>

          <div className="col-span-1 2xl:row-span-2 order-2">
            <Suspense fallback={<CurrentWeatherSkeleton />}>
              <CurrentWeather coords={coords} />
            </Suspense>
          </div>

          <div className="col-span-1 order-3 2xl:order-4 2xl:row-span-2">
            <Suspense fallback={<DailyForecastSkeleton />}>
              <DailyForecast coords={coords} />
            </Suspense>
          </div>

          <div className="col-span-1 md:col-span-2 2xl:row-span-1 order-4 2xl:order-3">
            <Suspense fallback={<HourlyForecastSkeleton/>}>
              <HourlyForecast coords={coords} />
            </Suspense>
          </div>


          <div className="col-span-1 md:col-span-2 2xl:row-span-1 order-5">
            <Suspense fallback={<AdditionalInfoSkeleton/>}>
              <AdditionalInfo coords={coords} />
            </Suspense>
          </div>

        </div>
      </div>
      <TooltipProvider>
        <SidePanel coords={coords} isSidePanelOpen={isSidePanelOpen} setIsSidePanelOpen={setIsSidePanelOpen}/>
      </TooltipProvider>
    </>
  )
}



export default App
