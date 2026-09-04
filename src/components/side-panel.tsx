import { getAirPollution } from "@/api/api"
import type { Coords } from "@/types"
import { useSuspenseQuery } from "@tanstack/react-query"
import { Suspense } from "react"
import Card from "./cards/card"
import { Slider } from "./ui/slider"
import clsx from "clsx"
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip"
import Info from '/src/assets/info.svg?react'


type Props = {
   coords: Coords
}

const SidePanel = (props: Props) => {
   return (
      <div className="fixed top-0 right-0 h-screen w-90 shadow-md bg-sidebar z-1001 py-8 px-4 overflow-y-scroll">
         <Suspense>
            <AirPollution {...props} />
         </Suspense>
      </div>
   )
}

function AirPollution({ coords }: Props) {
   const { data } = useSuspenseQuery({
      queryKey: ['pollution', coords],
      queryFn: () => getAirPollution(coords)
   })

   return (
      <div className="flex flex-col gap-4">
         <h1 className="text-2xl font-semibold">Air Pollution</h1>
         <div className="flex items-baseline gap-2">
            <h1 className="text-5xl font-semibold">{data.list[0].main.aqi}</h1>
            <div className="flex items-center gap-2">
               <h1 className="text-3xl font-semibold">AQI</h1>
               <Tooltip>
                  <TooltipTrigger>
                     <Info className="size-4 invert" />
                  </TooltipTrigger>
                  <TooltipContent>
                     <p className="text-sm max-w-xs wrap-break-word whitespace-pre-line">
                        {`Air Quality Index. Possible values: 1, 2, 3, 4, 5.
                           1 = Good
                           2 = Fair
                           3 = Moderate
                           4 = Poor
                           5 = Very Poor`}
                     </p>
                  </TooltipContent>
               </Tooltip>
            </div>
         </div>

         {Object.entries(data.list[0].components).map(([key, value]) => {


            const pollutant = airQualityRanges[key.toUpperCase()]
            if (!pollutant) return null

            const max = Math.max(pollutant['Very Poor'].min, value)
            const currentLevel = (() => {
               for (const [level, range] of Object.entries(pollutant)) {
                  if (value >= range.min && value <= range.max) return level
               }
            })()

            const qualityColor = (() => {
               switch (currentLevel) {
                  case 'Good':
                     return 'bg-green-500'
                  case 'Fair':
                     return 'bg-yellow-500'
                  case 'Moderate':
                     return 'bg-orange-500'
                  case 'Poor':
                     return 'bg-red-500'
                  case 'Very Poor':
                     return 'bg-purple-500'
                  default:
                     return 'bg-gray-500'
               }
            })()

            return (
               <Card
                  key={key}
                  childrenClassName="flex flex-col gap-3"
                  className="hover:scale-105 transition-transform duration-300 from-sidebar-accent to-sidebar-accent/60 gap-0!"
               >
                  <div className="flex justify-between">
                     <span className="text-lg font-bold capitalize">{key}</span>
                     <span className="text-lg font-semibold capitalize">{value}</span>
                  </div>
                  <Slider min={0} max={max} value={[value]} disabled />
                  <div className="flex justify-between text-sm">
                     <p>0</p>
                     <p>{max}</p>
                  </div>

                  <div className="flex justify-between select-none">
                     {Object.keys(pollutant).reverse().map((quality) => (
                        <span className={clsx("px-2 py-1 rounded-md text-xs font-medium", quality === currentLevel ? qualityColor : 'bg-muted text-muted-foreground')}
                        >
                           {quality}
                        </span>
                     ))}
                  </div>
               </Card>
            )
         })}
      </div>
   )
}

export type AirQualityLevel = "Good" | "Fair" | "Moderate" | "Poor" | "Very Poor"

export type AirQualityRange = Record<AirQualityLevel, { min: number; max: number }>

export const airQualityRanges: Record<string, AirQualityRange> = {
   SO2: {
      "Good": { min: 0, max: 20 },
      "Fair": { min: 20, max: 80 },
      "Moderate": { min: 80, max: 250 },
      "Poor": { min: 250, max: 350 },
      "Very Poor": { min: 350, max: Infinity },
   },
   NO2: {
      "Good": { min: 0, max: 40 },
      "Fair": { min: 40, max: 70 },
      "Moderate": { min: 70, max: 150 },
      "Poor": { min: 150, max: 200 },
      "Very Poor": { min: 200, max: Infinity },
   },
   PM10: {
      "Good": { min: 0, max: 20 },
      "Fair": { min: 20, max: 50 },
      "Moderate": { min: 50, max: 100 },
      "Poor": { min: 100, max: 200 },
      "Very Poor": { min: 200, max: Infinity },
   },
   PM2_5: {
      "Good": { min: 0, max: 10 },
      "Fair": { min: 10, max: 25 },
      "Moderate": { min: 25, max: 50 },
      "Poor": { min: 50, max: 75 },
      "Very Poor": { min: 75, max: Infinity },
   },
   O3: {
      "Good": { min: 0, max: 60 },
      "Fair": { min: 60, max: 100 },
      "Moderate": { min: 100, max: 140 },
      "Poor": { min: 140, max: 180 },
      "Very Poor": { min: 180, max: Infinity },
   },
   CO: {
      "Good": { min: 0, max: 4400 },
      "Fair": { min: 4400, max: 9400 },
      "Moderate": { min: 9400, max: 12400 },
      "Poor": { min: 12400, max: 15400 },
      "Very Poor": { min: 15400, max: Infinity },
   },
}

export default SidePanel