import Card from "@/components/cards/card"
import { Skeleton } from "@/components/ui/skeleton"

type Props = {}

const SideCardSkeleton = ({}: Props) => {
   return (
      <Card
         childrenClassName="flex flex-col gap-3"
         className="hover:scale-105 transition-transform duration-300 from-sidebar-accent to-sidebar-accent/60 gap-0!"
      >
         <div className="flex justify-between">
            <Skeleton className="w-12 h-7 bg-sidebar" />
            <Skeleton className="w-12 h-7 bg-sidebar" />
         </div>
         <Skeleton className="w-full h-1.5 bg-sidebar" />
         <div className="flex justify-between text-sm">
            <Skeleton className="w-2 h-4 bg-sidebar" />
            <Skeleton className="w-2 h-4 bg-sidebar" />
         </div>

         <div className="flex justify-between select-none">
            {Array.from({length: 5}).reverse().map((_, index) => (
               <Skeleton key={index} className="w-12 h-6 bg-sidebar"/>
            ))}
         </div>
      </Card>
   )
}

export default SideCardSkeleton