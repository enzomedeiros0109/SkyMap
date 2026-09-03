import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet"
import 'leaflet/dist/leaflet.css'
import type { Coords } from "../types"
import { API_KEY } from "@/api/api"

type Props = {
   coords: Coords
   onMapClick: (lat: number, lon: number) => void
   mapType: string
}

const Map = ({ coords, onMapClick, mapType }: Props) => {
   const { lat, lon } = coords
   return (
      <MapContainer
         center={[lat, lon]}
         zoom={5}
         scrollWheelZoom={false}
         style={{ width: '1000px', height: '500px' }}
      >

         <MapClick onMapClick={onMapClick} coords={coords} />
         <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
         />
         <TileLayer
            url={`https://tile.openweathermap.org/map/${mapType}/{z}/{x}/{y}.png?appid=${API_KEY}`}
         >

         </TileLayer>
         <Marker position={[lat, lon]} />
      </MapContainer>
   )
}

function MapClick({ onMapClick, coords }: {
   onMapClick: (lat: number, lon: number) => void
   coords: Coords
}) {
   const map = useMap()
   map.panTo([coords.lat, coords.lon])

   map.on('click', (e) => {
      const { lat, lng } = e.latlng
      onMapClick(lat, lng)
   })

   return null
}

export default Map