import type { Dispatch, SetStateAction } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"

type Props = {
   mapType: string | null,
   setMapType: Dispatch<SetStateAction<string | null>>
}

const MapTypeDropdown = ({ mapType, setMapType }: Props) => {
   return (
      <Select value={mapType} onValueChange={(value) => setMapType(value)}>
         <SelectTrigger className="w-45">
            <SelectValue placeholder="Map types" className="capitalize">
               {mapType?.split('_')[0]}
            </SelectValue>
         </SelectTrigger >
         <SelectContent>
            {types.map((type) => (
               <SelectItem key={type} value={type} className="capitalize">
                  {type.split('_')[0]}
               </SelectItem>
            ))}
         </SelectContent>
      </Select>
   )
}

const types = [
  "clouds_new",
  "precipitation_new",
  "pressure_new",
  "wind_new",
  "temp_new"
];

export default MapTypeDropdown
