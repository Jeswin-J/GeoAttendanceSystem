import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, Tooltip } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const Map = ({
    center = [51.505, -0.09],
    zoom = 13,
    markers = [],
    onMarkerClick
}) => {

    const ChangeMapCenter = ({ center }) => {
        const map = useMap();
        map.setView(center);
        return null;
    };


    return (
        <MapContainer center={center} zoom={zoom} style={{ height: '100%', width: '100%' }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />

            <ChangeMapCenter center={center} />

            {markers.map((marker, index) => (
                <Marker
                    key={index}
                    position={marker.position}
                    eventHandlers={{
                        click: () => onMarkerClick && onMarkerClick(marker),
                    }}
                >
                    <Popup>{marker.popupContent}</Popup>
                    <Tooltip>
                        <span>
                            <b>{marker.popupContent}</b> <br />
                            ({marker.position[0]}, {marker.position[1]})
                        </span>
                    </Tooltip>
                </Marker>
            ))}
        </MapContainer>
    );
};

export default Map;