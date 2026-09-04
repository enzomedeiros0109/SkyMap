import Card from "../cards/card"
import { Skeleton } from "../ui/skeleton"

const CurrentWeatherSkeleton = () => {
  return (
    <Card
      title='Current Weather'
      childrenClassName='flex flex-col items-center gap-6'
    >
      <div className='flex flex-col gap-2 items-center'>
        <Skeleton className="w-30 h-15" />
        <Skeleton className="size-14 rounded-full" />
        <Skeleton className="w-36 h-7" />

      </div>

      <div className='flex flex-col gap-1 text-center'>
        <p className='text-xl'>Local time:</p>
        <Skeleton className="w-36 h-10" />
      </div>

      <div className='flex justify-between w-full'>
        <div className='flex flex-col gap-2 items-center'>
          <p className='text-gray-500'>Feels like</p>
          <Skeleton className="w-16 h-6" />
        </div>

        <div className='flex flex-col gap-2 items-center'>
          <p className='text-gray-500'>Humidity</p>
          <Skeleton className="w-16 h-6" />
        </div>

        <div className='flex flex-col gap-2 items-center'>
          <p className='text-gray-500'>Wind Speed</p>
          <Skeleton className="w-16 h-6" />
        </div>
      </div>
    </Card>
  )
}

export default CurrentWeatherSkeleton