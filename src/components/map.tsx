import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet"
import 'leaflet/dist/leaflet.css'
import type { Coords } from "../types"
import { API_KEY } from "@/api/api"
import { useEffect } from "react"
import { MaptilerLayer } from "@maptiler/leaflet-maptilersdk";

type Props = {
   coords: Coords
   onMapClick: (lat: number, lon: number) => void
   mapType: string
}

const MAP_TILE_API_KEY = import.meta.env.VITE_MAP_TILER_API_KEY

const Map = ({ coords, onMapClick, mapType }: Props) => {
   const { lat, lon } = coords
   return (
      <MapContainer
         center={[lat, lon]}
         zoom={4}
         scrollWheelZoom={false}
         style={{ width: '100%', height: '500px' }}
      >

         <MapClick onMapClick={onMapClick} coords={coords} />
         <MapTileLayer/>
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

function MapTileLayer(){

   const map = useMap()

   useEffect(() => {
      const tileLayer = new MaptilerLayer({style: 'basic-dark', apiKey: `${MAP_TILE_API_KEY}`})
      tileLayer.addTo(map)

      return () => {map.removeLayer(tileLayer)}
   }, [])

   return null
}

export default Map