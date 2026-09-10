import { useSuspenseQuery } from "@tanstack/react-query"
import Card from "./card"
import { getWeather } from "../../api/api"
import WeatherIcon from "../weather-icon"
import type { Coords } from '../../types'

type Props = {
   coords: Coords
}

const HourlyForecast = ({ coords }: Props) => {

   const { data: geocodeData } = useSuspenseQuery({
      queryKey: ['weather', coords],
      queryFn: () => getWeather({ lat: coords.lat, lon: coords.lon })
   })

   return (
      <Card
         title="Hourly Forecast"
         childrenClassName="flex flex-row gap-6 overflow-x-scroll">
         {geocodeData.hourly.map((hour) => (
            <div
               className="flex flex-col gap-2 items-center p-2 2xl:justify-between"
               key={hour.dt}
            >
               <p className="whitespace-nowrap 2xl:scale-110">{new Date(hour.dt * 1000).toLocaleTimeString(undefined,
                  {
                     hour: "numeric",
                     minute: "2-digit",
                     hour12: true,
                  })}
               </p>
               <WeatherIcon source={hour.weather[0].icon} className="2xl:size-12"/>
               <p className="2xl:scale-110">{Math.round(hour.temp)}°C</p>
            </div>
         ))}
      </Card>
   )
}

export default HourlyForecast