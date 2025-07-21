import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const MapFooter = () => {
  const lumajangPosition = [import.meta.env.VITE_Y_COOR, import.meta.env.VITE_X_COOR];

  return (
      <div className="w-full h-48">
        <MapContainer center={lumajangPosition} zoom={13} scrollWheelZoom={false} className="h-full w-full rounded-lg shadow-lg">
          <TileLayer
            attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={lumajangPosition}>
            <Popup>
              Lokasi Tambak - Lumajang, Jawa Timur
            </Popup>
          </Marker>
        </MapContainer>
      </div>
  );
};

export default MapFooter;
