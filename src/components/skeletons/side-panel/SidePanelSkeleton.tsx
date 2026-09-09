import { Skeleton } from "@/components/ui/skeleton"
import SideCardSkeleton from "./SideCardSkeleton"

type Props = {}

const SidePanelSkeleton = ({ }: Props) => {
   return (
      <div className="flex flex-col gap-4">
         {/* Side Panel Header */}
         <h1 className="text-2xl font-semibold">Air Pollution</h1>
         <div className="flex items-baseline gap-2">
            <div className="flex items-center gap-2">
               <Skeleton className="w-7 h-12" />
               <h1 className="text-3xl font-semibold">AQI</h1>
            </div>
         </div>

         {Array.from({ length: 8 }).map((_, index) => (
            <SideCardSkeleton key={index} />
         ))}
      </div>
   )
}

export default SidePanelSkeleton