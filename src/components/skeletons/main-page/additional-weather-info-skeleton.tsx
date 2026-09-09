import Card from "../../cards/card"
import { Skeleton } from "../../ui/skeleton"

const AdditionalInfoSkeleton = () => {

  const rows = [
    { valueSkeleton: <Skeleton className="w-9 h-8" /> },       // clouds → "NN%"
    { valueSkeleton: <Skeleton className="size-8" /> },         // uvi → number
    { valueSkeleton: <Skeleton className="size-7 rounded-full" /> }, // wind_deg → icon
    { valueSkeleton: <Skeleton className="w-9 h-8" /> },         // pressure → number
    { valueSkeleton: <Skeleton className="w-17.5 h-8" /> },      // sunrise → time
    { valueSkeleton: <Skeleton className="w-17.5 h-8" /> },      // sunset → time
  ] as const

  return (
    <Card
      title='Addtional Weather Info'
      childrenClassName="flex flex-col gap-8"
    >
      {rows.map((row, index) => (
        <div
          key={index}
          className="flex justify-between">
          <div className="flex gap-4">
            <Skeleton className="w-20 h-8" />
            <Skeleton className="size-8 rounded-full" />
          </div>
          <span>
            {row.valueSkeleton}
          </span>
        </div>
      ))}
    </Card>
  )
}

export default AdditionalInfoSkeleton