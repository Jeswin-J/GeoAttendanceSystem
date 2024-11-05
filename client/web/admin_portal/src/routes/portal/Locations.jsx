import React, { useEffect } from 'react';
import Portal from '../../components/layout/Portal/Portal';
import Table from '../../components/common/Table/Table';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLocations } from '../../app/locationSlice';

function Locations() {
    const dispatch = useDispatch();
    const { locations, loading, error } = useSelector((state) => state.locations);

    useEffect(() => {
        dispatch(fetchLocations());
    }, [dispatch]);

    const columns = [
        { key: 'locationId', label: 'ID' },
        { key: 'locationName', label: 'Location' },
        { key: 'latitude', label: 'Latitude' },
        { key: 'longitude', label: 'Longitude' },
        { key: 'radius', label: 'Radius (m)' },
        { key: 'address', label: 'Address' },
        { key: 'type', label: 'Type' },
        { key: 'division', label: 'Division' },
        { key: 'createdAt', label: 'Created At' },
    ];

    const filterOptions = [
        { value: '', label: 'All Regions' },
        { value: 'EAST', label: 'East' },
        { value: 'NORTH', label: 'North' },
        { value: 'SOUTH', label: 'South' },
        { value: 'WEST', label: 'West' },
        { value: 'NORTHEAST', label: 'North East' },
        { value: 'SOUTHEAST', label: 'South East' },
        { value: 'NORTHWEST', label: 'North West' },
        { value: 'SOUTHWEST', label: 'South West' },
    ];

    if (loading) return <p>Loading locations...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <>
            <Portal>
                <Table
                 columns={columns} 
                 data={locations} 
                 filterOptions={filterOptions}
                 tableHeading={"Locations"} />
            </Portal>
        </>
    );
}

export default Locations;
