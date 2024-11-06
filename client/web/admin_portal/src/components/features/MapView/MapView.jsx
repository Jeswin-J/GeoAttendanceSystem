import React from 'react';
import Map from "../../common/Map/Map";
import './MapView.css';
import Button from "../../common/Button/Button";

function MapView({ location }) {

    if (!location) {
        return <p>Location data is not available.</p>;
    }

    return (
        <div className="map-view">
            <div className="map-info-grid">
                <div className="map-container">
                    <div>
                        <h4 style={{marginBottom: 0}}>Address</h4>
                        <p>{location.address}</p>
                        <p>Type: {location.type}</p>
                    </div>

                    <div className="center">
                        <Button
                            className="edit-button"
                            onClick={() => alert('Location information has been edited.')}
                        >
                            <i className="bi bi-pencil-square"></i>
                            Edit Information
                        </Button>
                    </div>

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
