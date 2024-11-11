import React, {useEffect} from 'react';
import Portal from '../../components/layout/Portal/Portal';
import Table from '../../components/common/Table/Table';
import {useDispatch, useSelector} from 'react-redux';
import {fetchLocations} from '../../app/locationSlice';
import AddLocation from "../../components/features/AddLocation/AddLocation";
import {useNavigate} from "react-router-dom";
import InfoCardGroup from "../../components/features/InfoCardGroup/InfoCardGroup";
import GridLayout from "../../components/layout/GridLayout/GridLayout";
import Chart from "../../components/common/Chart/Chart";
import {blueColors, greenColors, orangeColors, purpleColors, redColors} from "../../utils/chartThemes";
import StaticTable from "../../components/common/StaticTable/StaticTable";

function Locations() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {locations, loading, error} = useSelector((state) => state.locations);

    useEffect(() => {
        if (locations.length === 0) {
            dispatch(fetchLocations());
        }
    }, [dispatch, locations.length]);

    const columns = [
        {key: 'locationId', label: 'ID'},
        {key: 'locationName', label: 'Location'},
        {key: 'radius', label: 'Geofence (m)'},
        {key: 'division', label: 'Region'},
        {key: 'address', label: 'Address'},
        {key: 'type', label: 'Type'},
    ];

    const topThree = [
        {key: 'locationName', label: 'Location'},
        {key: 'division', label: 'Region'},
        {key: 'footFall', label: 'Visitors'},
    ];

    const data = [
        {id: 1, locationName: 'Gail Office, Chennai', division: 'South', footFall: '1000'},
        {id: 2, locationName: 'Gail Office, Mumbai', division: 'West', footFall: '998'},
        {id: 2, locationName: 'Gail Office, Mumbai', division: 'West', footFall: '998'},
        {id: 3, locationName: 'Gail Office, Delhi', division: 'North', footFall: '319'},
        {id: 3, locationName: 'Gail Office, Delhi', division: 'North', footFall: '319'},
    ];

    if (loading) return <p>Loading locations...</p>;
    if (error) return <p>Error: {error}</p>;

    const cardData = [
        {title: 'Office Locations', value: `10000`, icon: <i className="bi bi-buildings"></i>},
        {title: 'Unique Visitors', value: '3209423', icon: <i className="bi bi-person-badge"></i>},
        {title: 'Highest Footfall', value: 'GAIL Office, Delhi', icon: <i className="bi bi-graph-up-arrow"></i>},
        {title: 'Least Footfall', value: "GAIL Office, Mumbai", icon: <i className="bi bi-graph-down-arrow"></i>},
        {title: 'Avg. Dwell Time', value: '8.5 Hrs', icon: <i className="bi bi-hourglass-split"></i>},
    ];

    const sampleData = [
        {name: 'North', value: 4000},
        {name: 'South', value: 3000},
        {name: 'East', value: 2000},
        {name: 'West', value: 2780},
    ];

    const footfallData = [
        {date: 'Mon', value: 500},
        {date: 'Tue', value: 600},
        {date: 'Wed', value: 550},
        {date: 'Thu', value: 620},
        {date: 'Fri', value: 680},
        {date: 'Sat', value: 300},
        {date: 'Sun', value: 200},
    ];

    const attendanceDistribution = [
        {type: 'Employee', count: 700},
        {type: 'Contractor', count: 200},
        {type: 'Visitor', count: 100},
    ];

    const utilizationData = [
        {location: 'North', utilization: 85},
        {location: 'South', utilization: 65},
        {location: 'East', utilization: 75},
        {location: 'West', utilization: 80},
    ];

    const dwellTimeData = [
        {region: 'North', time: 7.5},
        {region: 'South', time: 8.2},
        {region: 'East', time: 7.8},
        {region: 'West', time: 8.5},
    ];

    return (
        <Portal>
            <InfoCardGroup cardData={cardData}/>

            <GridLayout columns={2} columnSizes={["2fr", "1fr"]} gap={"10px"} alignItems={"center"}>
                <div>
                    <Table
                        tableHeading="Locations"
                        columns={columns}
                        data={locations}
                        onRowClick={(row) => navigate(`/location/${row.locationId}`)}
                    />
                    <br/>
                    <AddLocation/>
                </div>

                <Chart
                    isResponsive
                    chartType="pie"
                    innerRadius={50}
                    data={attendanceDistribution}
                    xKey="type"
                    yKey="count"
                    title="Visitor Type Breakdown"
                    colors={redColors}
                    height={300}/>
            </GridLayout>

            <GridLayout columns={3} columnSizes={["3fr", "2fr", "2fr"]} gap={"20px"}>
                <Chart
                    isResponsive
                    chartType="line"
                    data={footfallData}
                    xKey="date"
                    yKey="value"
                    title="Weekly Footfall Pattern"
                    colors={redColors}
                    height={250}/>

                <Chart
                    isResponsive
                    chartType="bar"
                    data={sampleData}
                    xKey="name"
                    yKey="value"
                    title="Office Distribution by Region"
                    colors={purpleColors}
                    height={250}/>

                <Chart
                    isResponsive
                    chartType="bar"
                    data={utilizationData}
                    xKey="location"
                    yKey="utilization"
                    title="Location Utilization (%)"
                    colors={blueColors}
                    height={250}/>
            </GridLayout>

            <GridLayout columns={3} columnSizes={["5fr", "4fr", "5fr"]} gap={"20px"}>

                <div>
                    <h3 style={{textAlign: "center"}}> Top 5 Locations by Visitors</h3>
                    <StaticTable
                        columns={topThree}
                        data={data}
                    />
                </div>
                <Chart
                    isResponsive
                    chartType="bar"
                    data={dwellTimeData}
                    xKey="region"
                    yKey="time"
                    title="Avg. Dwell Time by Region"
                    colors={greenColors}
                    height={250}/>
                <div>
                    <h3 style={{textAlign: "center"}}> Last 5 Locations by Visitors</h3>
                    <StaticTable
                        columns={topThree}
                        data={data}
                    />
                </div>
            </GridLayout>
        </Portal>
    );
}

export default Locations;
