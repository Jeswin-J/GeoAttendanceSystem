import React, { useEffect } from 'react';
import Portal from '../../components/layout/Portal/Portal';
import Table from '../../components/common/Table/Table';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLocations } from '../../app/locationSlice';
import AddLocation from "../../components/features/AddLocation/AddLocation";
import {useNavigate} from "react-router-dom";
import InfoCardGroup from "../../components/features/InfoCardGroup/InfoCardGroup";
import GridLayout from "../../components/layout/GridLayout/GridLayout";
import Chart from "../../components/common/Chart/Chart";
import {greenColors, redColors} from "../../utils/chartThemes";

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
        { key: 'address', label: 'Address' },
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

    const sampleData = [
        { name: 'North', value: 4000 },
        { name: 'South', value: 3000},
        { name: 'East', value: 2000},
        { name: 'West', value: 2780},
    ];

    return (
        <Portal>
            <InfoCardGroup cardData={cardData} />
            <GridLayout columns={2} columnSizes={["2fr", "1fr"]} gap={"10px"} alignItems={"center"}>
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

                <Chart
                    isResponsive
                    chartType="line"
                    innerRadius={50}
                    data={sampleData}
                    xKey="name"
                    yKey="value"
                    title="Office Distribution by Region"
                    colors={redColors}
                    // colors={['#1E3A8A', '#38B2AC', '#F97316', '#4A5568', '#319795', '#E53E3E']}
                    height={300} />
            </GridLayout>
        </Portal>
    );
}

export default Locations;