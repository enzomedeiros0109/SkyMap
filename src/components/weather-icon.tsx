import clsx from 'clsx'

type Props = {
   source: string
   className?: string
}

const WeatherIcon = ({ source, className }: Props) => {
   return (
      <img
         className={clsx("size-8", className)}
         src={`https://openweathermap.org/payload/api/media/file/${source}.png`}
         alt="Day's weather icon"
      />
   )
}

export default WeatherIcon