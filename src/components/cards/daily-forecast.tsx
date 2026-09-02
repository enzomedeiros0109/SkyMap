import { getWeather } from '../../api/api'
import WeatherIcon from '../weather-icon'
import Card from './card'
import { useSuspenseQuery } from '@tanstack/react-query'
import type { Coords } from '../../types'

type Props = {
   coords: Coords
}

const DailyForecast = ({ coords }: Props) => {

   const { data } = useSuspenseQuery({
      queryKey: ['weather', coords],
      queryFn: () => getWeather({ lat: coords.lat, lon: coords.lon })
   })

   return (
      <Card title="Daily Forecast" childrenClassName='flex flex-col gap-4'>
            {data.daily.map((day) => (
               <div
                  key={day.dt}
                  className='flex justify-between'
               >
                  <p className='w-9 text-center'>
                     {new Date(day.dt * 1000).toLocaleDateString(undefined, {
                        weekday: "short"
                     })}
                  </p>
                  <WeatherIcon source={day.weather[0].icon}/>
                  <p className='text-white/80'>{Math.round(day.temp.day)}°C</p>
                  <p className='text-blue-500/75'>{Math.round(day.temp.min)}°C</p>
                  <p className='text-red-500/75'>{Math.round(day.temp.max)}°C</p>
               </div>
            ))}
      </Card>
   )
}

export default DailyForecast