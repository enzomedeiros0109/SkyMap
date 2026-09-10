import Card from "../../cards/card"
import { Skeleton } from "../../ui/skeleton"

const HourlyForecastSkeleton = () => {
  return (
    <Card
      title="Hourly Forecast"
      childrenClassName="flex flex-row gap-6 overflow-x-scroll">
      {Array.from({ length: 48}).map((_, index) => (
        <div
          className="flex flex-col gap-2 items-center p-2 2xl:justify-between"
          key={index}
        >
          <Skeleton className="w-15 h-6"/>
          <Skeleton className="size-8 rounded-full 2xl:size-12"/>
          <Skeleton className="w-8.5 h-6"/>
        </div>
      ))}
    </Card>
  )
}

export default HourlyForecastSkeleton