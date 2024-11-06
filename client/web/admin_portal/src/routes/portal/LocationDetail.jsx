import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLocationById } from '../../app/locationSlice';
import { useParams } from 'react-router-dom';
import Portal from '../../components/layout/Portal/Portal';
import InfoCardGroup from '../../components/features/InfoCardGroup/InfoCardGroup';
import MapView from "../../components/features/MapView/MapView";

function LocationDetail() {
    const { locationId } = useParams();
    const dispatch = useDispatch();
    const { location, loading, error } = useSelector((state) => state.locations);

    useEffect(() => {
        dispatch(fetchLocationById(locationId));
    }, [dispatch, locationId]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    const cardData = [
        { title: 'Location ID', value: `${location?.locationId || 'N/A'}`, icon: <i className="bi bi-bookmark-star"></i> },
        { title: 'Official Name', value: location?.locationName || 'N/A', icon: <i className="bi bi-building"></i> },
        { title: 'Coordinates', value: `${location?.latitude}, ${location?.longitude}`, icon: <i className="bi bi-geo-alt"></i> },
        { title: 'Geofence', value: location?.radius + ' (m)' || 'N/A', icon: <i className="bi bi-shield-lock"></i> },
        { title: 'Region', value: location?.division || 'N/A', icon: <i className="bi bi-globe"></i> },
    ];

    return (
        <>
            <Portal>
                <h2>{location?.locationName || 'Location Details'}</h2>
                <InfoCardGroup cardData={cardData} />
                <MapView location={location} />
            </Portal>
        </>
    );
}

export default LocationDetail;
