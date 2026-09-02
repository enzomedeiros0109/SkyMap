import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"

type Props = {}

const LocationDropdown = (props: Props) => {
   return (
      <Select>
         <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Theme" />
         </SelectTrigger >
         <SelectContent>
            {locations.map((location) => (
               <SelectItem key={location} value={location}>
                  {location}
               </SelectItem>
            ))}
         </SelectContent>
      </Select>
   )
}

const locations = [
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