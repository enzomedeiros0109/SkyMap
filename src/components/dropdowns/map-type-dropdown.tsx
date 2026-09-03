import type { Dispatch, SetStateAction } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"

type Props = {
   mapType: string,
   setMapType: Dispatch<SetStateAction<string | null>>
}

const MapTypeDropdown = ({ mapType, setMapType }: Props) => {
   return (
      <Select value={mapType} onValueChange={(value) => setMapType(value)}>
         <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Main cities" />
         </SelectTrigger >
         <SelectContent>
            {cities.map((city) => (
               <SelectItem key={city} value={city}>
                  {city}
               </SelectItem>
            ))}
         </SelectContent>
      </Select>
   )
}

const cities = [
  "Washington, D.C.",
  "Beijing",
  "Moscow",
  "London",
  "Paris",
  "Tokyo",
  "New Delhi",
  "Berlin",
  "Cairo",
  "Brasília",
];

export default MapTypeDropdown
