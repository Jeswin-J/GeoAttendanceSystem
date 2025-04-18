import React, { useEffect } from 'react';
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
                 zoom = 18,
                 markers = [],
                 onMarkerClick,
                 disableInteractions = false
             }) => {

    const ChangeMapCenter = ({ center }) => {
        const map = useMap();
        useEffect(() => {
            map.setView(center);
        }, [center, map]);
    };

    const DisableScrollZoom = () => {
        const map = useMap();
        useEffect(() => {
            map.scrollWheelZoom.disable();
        }, [map]);

        return null;
    };

    const DisableAllInteractions = () => {
        const map = useMap();
        useEffect(() => {
            if (disableInteractions) {
                map.dragging.disable();
                map.touchZoom.disable();
                map.doubleClickZoom.disable();
                map.scrollWheelZoom.disable();
                map.boxZoom.disable();
                map.keyboard.disable();
                if (map.tap) map.tap.disable();
                map.off('click');
            }
        }, [map]);

        return null;
    };

    return (
        <MapContainer center={center} zoom={zoom} style={{ height: '100%' }}>

            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />

            <ChangeMapCenter center={center} />
            <DisableScrollZoom />
            <DisableAllInteractions />

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
