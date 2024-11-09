import React, { useEffect } from 'react';
import Portal from '../../components/layout/Portal/Portal';
import Table from '../../components/common/Table/Table';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLocations } from '../../app/locationSlice';
import AddLocation from "../../components/features/AddLocation/AddLocation";
import {useNavigate} from "react-router-dom";

function Locations() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { locations, loading, error } = useSelector((state) => state.locations);

    useEffect(() => {
        if (locations.length === 0) {  // Only fetch if locations are not yet loaded
            dispatch(fetchLocations());
        }
    }, [dispatch, locations.length]);

    const columns = [
        { key: 'locationId', label: 'ID' },
        { key: 'locationName', label: 'Location' },
        { key: 'latitude', label: 'Latitude' },
        { key: 'longitude', label: 'Longitude' },
        { key: 'radius', label: 'Geofence (m)' },
        { key: 'division', label: 'Region' },
        { key: 'address', label: 'Address' },
        { key: 'type', label: 'Type' },
    ];

    if (loading) return <p>Loading locations...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <Portal>
            <Table
                tableHeading="Locations"
                columns={columns}
                data={locations}
                onRowClick={(row) => navigate(`/location/${row.locationId}`)}
            />
            <AddLocation/>
        </Portal>
    );
}

export default Locations;