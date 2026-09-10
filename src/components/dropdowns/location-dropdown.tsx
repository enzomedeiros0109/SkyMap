import type { Dispatch, SetStateAction } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"

type Props = {
   location: string,
   setLocation: Dispatch<SetStateAction<string | null>>
}

const LocationDropdown = ({ location, setLocation }: Props) => {
   return (
      <Select value={location} onValueChange={(value) => setLocation(value)}>
         <SelectTrigger className="w-45">
            <SelectValue placeholder="Main cities" />
         </SelectTrigger >
         <SelectContent>
            {location === 'custom' &&
               <SelectItem value='custom'>
                  Custom
               </SelectItem>
            }
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

export default LocationDropdown