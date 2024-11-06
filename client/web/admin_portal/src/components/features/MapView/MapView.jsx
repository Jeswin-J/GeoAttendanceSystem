import React from 'react';
import Map from "../../common/Map/Map";
import './MapView.css';

function MapView({ location }) {

    if (!location) {
        return <p>Location data is not available.</p>;
    }

    return (
        <div className="map-view">
            <div className="map-info-grid">
                <div className="map-container">
                    <h4 style={{marginBottom: 0}}>Address</h4>
                    <p>{location.address}</p>
                    <p>Type: {location.type}</p>
                </div>

                <div className="map-container">
                    {location ? (
                        <>
                        <div className="map">
                                <Map
                                    center={[location.latitude, location.longitude]}
                                    zoom={13}
                                    markers={[{
                                        position: [location.latitude, location.longitude],
                                        popupContent: location.locationName
                                    }]}
                                />
                            </div>
                        </>
                    ) : (
                        <p>No location found.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default MapView;
