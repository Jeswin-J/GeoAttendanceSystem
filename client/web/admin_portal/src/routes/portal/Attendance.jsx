import React from 'react';
import Portal from "../../components/layout/Portal/Portal";
import InfoCardGroup from "../../components/features/InfoCardGroup/InfoCardGroup";
import Table from "../../components/common/Table/Table";
import GridLayout from "../../components/layout/GridLayout/GridLayout";
import Chart from "../../components/common/Chart/Chart";
import { greenColors, redColors, purpleColors, blueColors } from "../../utils/chartThemes";

function Attendance(props) {

    const cardData = [
        {title: 'Office Locations', value: `10000`, icon: <i className="bi bi-buildings"></i>},
        {title: 'Total Employees', value: '3209423', icon: <i className="bi bi-person-badge"></i>},
        {title: 'Employees Present', value: '3109233', icon: <i className="bi bi-graph-up-arrow"></i>},
        {title: 'Employees Absent', value: "4234", icon: <i className="bi bi-graph-down-arrow"></i>},
        {title: 'Avg. Break Time', value: '1.5 Hrs', icon: <i className="bi bi-hourglass-split"></i>},
    ];

    const columns = [
        { key: 'employeeId', label: 'Employee ID' },
        { key: 'fullName', label: 'Full Name' },
        { key: 'designation', label: 'Designation' },
        { key: 'department', label: 'Department' },
        { key: 'score', label: 'Score (%)' },
    ];

    const data = [
        {id: '1', employeeId: 'EMP1', fullName: "Jeswin Joseph", designation: 'Engineer', department: 'Projects', score: 97},
        {id: '2', employeeId: 'EMP2', fullName: "Joseph", designation: 'Officer', department: 'Human Resources', score: 92},
        {id: '3', employeeId: 'EMP3', fullName: "Ramu Somu", designation: 'Chief Engineer', department: 'Finance', score: 91},
        {id: '4', employeeId: 'EMP4', fullName: "Trump", designation: 'Director', department: 'CSR', score: 98},
        {id: '5', employeeId: 'EMP5', fullName: "Jhon doe", designation: 'Senior Officer', department: 'Projects', score: 100},
        {id: '6', employeeId: 'EMP6', fullName: "Kelly", designation: 'Engineer', department: 'Planning', score: 35},
        {id: '7', employeeId: 'EMP7', fullName: "Jeswin", designation: 'Director', department: 'Petrochemicals', score: 99}
    ];

    // Attendance metrics
    const attendanceData = [
        { type: 'Present', count: 3109233 },
        { type: 'Absent', count: 4234 },
    ];

    // Employee Absence Trends (example)
    const absenceTrendsData = [
        { month: 'Jan', absences: 250 },
        { month: 'Feb', absences: 220 },
        { month: 'Mar', absences: 180 },
        { month: 'Apr', absences: 300 },
        { month: 'May', absences: 350 },
        { month: 'Jun', absences: 280 },
        { month: 'Jul', absences: 400 },
    ];

    // Employee Attendance Over Time (line chart)
    const hourlyAttendanceData = [
        { hour: '09:00 AM', attendance: 1200 },
        { hour: '10:00 AM', attendance: 1500 },
        { hour: '11:00 AM', attendance: 1400 },
        { hour: '12:00 PM', attendance: 1600 },
        { hour: '01:00 PM', attendance: 1300 },
        { hour: '02:00 PM', attendance: 1100 },
        { hour: '03:00 PM', attendance: 900 },
        { hour: '04:00 PM', attendance: 850 },
    ];

    // Attendance by Department
    const attendanceByDepartment = [
        { department: 'Projects', attendance: 5000 },
        { department: 'HR', attendance: 3000 },
        { department: 'Finance', attendance: 3500 },
        { department: 'CSR', attendance: 2000 },
        { department: 'Planning', attendance: 4000 },
        { department: 'R&D', attendance: 3000 },
        { department: 'Procurement', attendance: 3500 },
        { department: 'Operations', attendance: 2000 },
        { department: 'Petrochemicals', attendance: 3000 },
    ];

    // Attendance Rate per Region (e.g. offices or regions)
    const attendanceByRegion = [
        { location: 'North', rate: 95 },
        { location: 'South', rate: 90 },
        { location: 'East', rate: 88 },
        { location: 'West', rate: 92 },
    ];

    // Weekly Absence Breakdown
    const weeklyAbsenceData = [
        { day: 'Mon', absences: 30 },
        { day: 'Tue', absences: 25 },
        { day: 'Wed', absences: 40 },
        { day: 'Thu', absences: 20 },
        { day: 'Fri', absences: 35 },
        { day: 'Sat', absences: 10 },
        { day: 'Sun', absences: 5 },
    ];

    // Employee Attendance by Time of Day (for detailed trends)
    const attendanceByTimeOfDay = [
        { time: 'Morning', attendance: 4000 },
        { time: 'Midday', attendance: 3000 },
        { time: 'Afternoon', attendance: 2500 },
        { time: 'Evening', attendance: 1800 },
    ];

    // Absence Rate by Gender (example for diversity)
    const absenceByGender = [
        { gender: 'Male', rate: 4 },
        { gender: 'Female', rate: 3 },
    ];

    return (
        <Portal>
            <InfoCardGroup cardData={cardData} />

            <GridLayout columns={2} gap={"10px"} columnSizes={["2fr", "1fr"]}>
                <Table
                    tableHeading="Productivity Score"
                    columns={columns}
                    data={data}
                />

                {/* Employee Absence Trends: Bar Chart */}
                <Chart
                    isResponsive
                    chartType="bar"
                    data={absenceTrendsData}
                    xKey="month"
                    yKey="absences"
                    title="Employee Absence Trends (Monthly)"
                    colors={redColors}
                    height={300}
                />
            </GridLayout>

                <GridLayout columns={1} gap={"20px"}>
                    {/* Hourly Attendance Distribution: Line Chart */}
                    <Chart
                        isResponsive
                        chartType="line"
                        data={hourlyAttendanceData}
                        xKey="hour"
                        yKey="attendance"
                        title="Hourly Attendance Distribution"
                        colors={blueColors}
                        height={300}
                    />
                </GridLayout>

            <GridLayout columns={2} columnSizes={["2fr", "1fr"]} gap={"10px"} alignItems={"center"}>
                {/* Attendance by Department: Bar Chart */}
                <Chart
                    isResponsive
                    chartType="bar"
                    data={attendanceByDepartment}
                    xKey="department"
                    yKey="attendance"
                    title="Attendance by Department"
                    colors={greenColors}
                    height={300}
                />

                {/* Attendance by Region: Line Chart */}
                <Chart
                    isResponsive
                    chartType="line"
                    data={attendanceByRegion}
                    xKey="location"
                    yKey="rate"
                    title="Attendance Rate by Region"
                    colors={purpleColors}
                    height={300}
                />
            </GridLayout>

            <GridLayout columns={3} gap={"20px"}>
                {/* Weekly Absence Breakdown: Area Chart */}
                <Chart
                    isResponsive
                    chartType="area"
                    data={weeklyAbsenceData}
                    xKey="day"
                    yKey="absences"
                    title="Weekly Absence Breakdown"
                    colors={redColors}
                    height={300}
                />

                {/* Attendance by Time of Day: Line Chart */}
                <Chart
                    isResponsive
                    chartType="line"
                    data={attendanceByTimeOfDay}
                    xKey="time"
                    yKey="attendance"
                    title="Attendance by Time of Day"
                    colors={greenColors}
                    height={300}
                />

                <Chart
                    isResponsive
                    chartType="pie"
                    innerRadius={50}
                    data={[
                        { shift: 'Morning', attendance: 4000 },
                        { shift: 'Afternoon', attendance: 3000 },
                        { shift: 'Night', attendance: 1500 },
                    ]}
                    xKey="shift"
                    yKey="attendance"
                    title="Employee Attendance by Shift"
                    colors={blueColors}
                    height={300}
                />
            </GridLayout>
        </Portal>
    );
}

export default Attendance;
