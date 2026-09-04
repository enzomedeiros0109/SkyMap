import { getWeather } from '../../api/api'
import { useSuspenseQuery } from '@tanstack/react-query'
import Card from './card'
import WeatherIcon from '../weather-icon'
import type { Coords } from '../../types'

type Props = {
   coords: Coords
}

const CurrentWeather = ({ coords }: Props) => {

   const { data } = useSuspenseQuery({
      queryKey: ['weather', coords],
      queryFn: () => getWeather({ lat: coords.lat, lon: coords.lon })
   })

   return (
      <Card
         title='Current Weather'
         childrenClassName='flex flex-col items-center gap-6'
      >
         <div className='flex flex-col gap-2 items-center'>
            <h2 className='text-6xl font-semibold text-center'>{Math.round(data.current.temp)}°C</h2>
            <WeatherIcon
               source={data.current.weather[0].icon}
               className='size-18'
            />
            <h3 className='capitalize text-xl'>{data.current.weather[0].description}</h3>

         </div>

         <div className='flex flex-col gap-1 text-center'>
            <p className='text-xl'>Local time:</p>
            <h3 className='text-4xl font-semibold'>{new Intl.DateTimeFormat('en-US', {
               hour: '2-digit',
               minute: '2-digit',
               hour12: true,
               timeZone: data.timezone
            }).format(new Date(data.current.dt * 1000))} { /* Converts from ms to seconds */ }
            </h3>
         </div>

         <div className='flex justify-between w-full'>
            <div className='flex flex-col gap-2 items-center'>
               <p className='text-gray-500'>Feels like</p>
               <p>{Math.round(data.current.feels_like)}°C</p>
            </div>

            <div className='flex flex-col gap-2 items-center'>
               <p className='text-gray-500'>Humidity</p>
               <p>{Math.round(data.current.humidity)}%</p>
            </div>

            <div className='flex flex-col gap-2 items-center'>
               <p className='text-gray-500'>Wind Speed</p>
               <p>{Math.round(data.current.wind_speed)} m/s</p>
            </div>
         </div>
      </Card>
   )
}

export default CurrentWeather