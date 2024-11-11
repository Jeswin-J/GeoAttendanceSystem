import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEmployees } from '../../app/employeeSlice';
import Table from '../../components/common/Table/Table';
import Portal from "../../components/layout/Portal/Portal";
import { useNavigate } from "react-router-dom";
import AddEmployee from "../../components/features/AddEmployee/AddEmployee";
import InfoCardGroup from "../../components/features/InfoCardGroup/InfoCardGroup";
import GridLayout from "../../components/layout/GridLayout/GridLayout";
import Chart from "../../components/common/Chart/Chart";

function Employee() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { data: employees, loading, error } = useSelector((state) => state.employees);

    useEffect(() => {
        dispatch(fetchEmployees());
    }, [dispatch]);

    const columns = [
        { key: 'employeeId', label: 'Employee ID' },
        { key: 'fullName', label: 'Full Name' },
        { key: 'designation', label: 'Designation' },
        { key: 'department', label: 'Department' },
        { key: 'status', label: 'Status' },
        { key: 'employeeType', label: 'Employee Type' }
    ];

    // Preprocess the employees data to concatenate first and last names
    const processedEmployees = employees.map((employee) => ({
        ...employee,
        fullName: `${employee.firstName} ${employee.lastName}`,  // Concatenate firstName and lastName
    }));

    if (loading) return <p>Loading employee data...</p>;
    if (error) return <p>Error: {error}</p>;

    const cardData = [
        { title: 'Total Employees', value: `10000`, icon: <i className="bi bi-people"></i> },
        { title: 'Full-Time Employees', value: '987', icon: <i className="bi bi-watch"></i> },
        { title: 'Gender Ratio', value: "2 : 1", icon: <i className="bi bi-percent"></i> },
        { title: 'New Hires', value: "1000", icon: <i className="bi bi-stars"></i> },
        { title: 'Average Tenure', value: '5 Years', icon: <i className="bi bi-person-workspace"></i> },
    ];

    const sampleData = [
        { name: 'HR', value: 4000 },
        { name: 'Projects', value: 3000},
        { name: 'Finance', value: 2000},
        { name: 'CSR', value: 2780},
        { name: 'Petrochemicals', value: 1890},
        { name: 'Panning', value: 2390},
    ];

    return (
        <Portal>
            <InfoCardGroup cardData={cardData} />
            <GridLayout columns={2} gap="10px" columnSizes={["2fr", "1fr"]}  alignItems="center">

                <div>
                    <Table
                        tableHeading="Employee Directory"
                        columns={columns}
                        data={processedEmployees}  // Pass processed employees data
                        onRowClick={(row) => navigate(`/portal/emp/${row.employeeId}`)}
                    />
                    <br />
                    <AddEmployee />
                </div>
                <Chart
                    isResponsive
                    chartType="pie"
                    innerRadius={50}
                    data={sampleData}
                    xKey="name"
                    yKey="value"
                    title="Employee Distribution by Department"
                    colors={["#5A9BD5", "#A7C6ED", "#1E3A8A", "#4A90E2", "#7FBAE4", "#4682B4"]}
                    // colors={['#1E3A8A', '#38B2AC', '#F97316', '#4A5568', '#319795', '#E53E3E']}
                    height={300} />
            </GridLayout>
        </Portal>
    );
}

export default Employee;
