import "leaflet/dist/leaflet.css";

import L from "leaflet";
import { MapContainer, Marker, Popup,TileLayer } from "react-leaflet";

const iconProto = L.Icon.Default.prototype as unknown as {
  _getIconUrl?: unknown;
};

delete iconProto._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: "/leaflet/marker-icon-2x.png",
  iconUrl: "/leaflet/marker-icon.png",
  shadowUrl: "/leaflet/marker-shadow.png",
});

type Props = {
  lat: number;
  lon: number;
  name?: string;
};

export default function EventMap({ lat, lon, name }: Props) {
  return (
    <div className="mt-6 overflow-hidden rounded-lg border border-gray-600">
      <MapContainer
        center={[lat, lon]}
        zoom={16}
        scrollWheelZoom={false}
        style={{ height: 320, width: "100%" }}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[lat, lon]}>
          <Popup>{name ?? "Event location"}</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
