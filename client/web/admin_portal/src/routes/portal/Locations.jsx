import React, { useEffect } from 'react';
import Portal from '../../components/layout/Portal/Portal';
import Table from '../../components/common/Table/Table';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLocations } from '../../app/locationSlice';
import AddLocation from "../../components/features/AddLocation/AddLocation";
import {useNavigate} from "react-router-dom";
import InfoCardGroup from "../../components/features/InfoCardGroup/InfoCardGroup";
import GridLayout from "../../components/layout/GridLayout/GridLayout";

function Locations() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { locations, loading, error } = useSelector((state) => state.locations);

    useEffect(() => {
        if (locations.length === 0) {
            dispatch(fetchLocations());
        }
    }, [dispatch, locations.length]);

    const columns = [
        { key: 'locationId', label: 'ID' },
        { key: 'locationName', label: 'Location' },
        // { key: 'latitude', label: 'Latitude' },
        // { key: 'longitude', label: 'Longitude' },
        { key: 'radius', label: 'Geofence (m)' },
        { key: 'division', label: 'Region' },
        // { key: 'address', label: 'Address' },
        { key: 'type', label: 'Type' },
    ];

    if (loading) return <p>Loading locations...</p>;
    if (error) return <p>Error: {error}</p>;

    const cardData = [
        { title: 'Office Locations', value: `10000`, icon: <i className="bi bi-buildings"></i> },
        { title: 'Unique Visitors', value: '3209423', icon: <i className="bi bi-person-badge"></i> },
        { title: 'Highest Footfall', value: 'GAIL Office, Delhi', icon: <i className="bi bi-graph-up-arrow"></i> },
        { title: 'Least Footfall', value: "GAIL Office, Mumbai", icon: <i className="bi bi-graph-down-arrow"></i> },
        { title: 'Avg. Dwell Time', value: '8.5 Hrs', icon: <i className="bi bi-hourglass-split"></i> },
    ];

    return (
        <Portal>
            <InfoCardGroup cardData={cardData} />
            <GridLayout columns={2} columnSizes={["4fr", "3fr"]} gap={"10px"} alignItems={"center"}>
                <div>
                    <Table
                        tableHeading="Locations"
                        columns={columns}
                        data={locations}
                        onRowClick={(row) => navigate(`/location/${row.locationId}`)}
                    />
                    <br />
                    <AddLocation/>
                </div>
                <div></div>
            </GridLayout>
        </Portal>
    );
}

export default Locations;