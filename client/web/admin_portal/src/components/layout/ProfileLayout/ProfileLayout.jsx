import React, { useState } from 'react';
import "./ProfileLayout.css";
import Dp from "../../common/Dp/Dp";
import dpPic from "../../../assets/images/img.png";
import Button from "../../common/Button/Button";
import Input from "../../common/Input/Input";
import Select from "../../common/Select/Select";
import { departmentOptions, designationOptions, employeeTypeOptions, statusOptions } from "../../../data/employee/data";
import AttendanceStatus from "../../features/AttendanceStatus/AttendanceStatus";
import Map from "../../common/Map/Map";
import RecentActivityList from "../RecentActivityList/RecentActivityList";

function ProfileLayout({ props }) {
    const {
        profilePictureUrl,
        firstName,
        lastName,
        employeeId,
        department,
        designation,
        status,
        workEmail,
        phoneNumber,
        employeeType
    } = props;

    // State for edit mode and form data
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        firstName,
        lastName,
        employeeId,
        department,
        designation,
        status,
        workEmail,
        phoneNumber,
        employeeType,
    });

    const activities = [
        {
            title: 'Checked in at Mumbai Office',
            description: 'Employee checked in at 09:30 AM',
            timestamp: '2024-11-09 09:30 AM',
        },
        {
            title: 'Checked out from Delhi Office',
            description: 'Employee checked out at 06:00 PM',
            timestamp: '2024-11-09 | 06:00 PM',
        },
        {
            title: 'Meeting with HR',
            description: 'Attended a virtual HR meeting.',
            timestamp: '2024-11-09 04:30 PM',
        }
    ];

    const handleEditButtonClick = () => {
        if (isEditing) {
            console.log('Saving changes...', formData);
        }
        setIsEditing(!isEditing);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    return (
        <>
            <div className="grid-container-2" style={{ marginBottom: 0 }}>
                <h2>Employee Details</h2>
                <div className="center" style={{ gap: 10 }}>
                    <Button variant="success">
                        <i className="bi bi-download"></i>
                        Download PDF
                    </Button>
                    <Button onClick={handleEditButtonClick}>
                        <i className={`bi ${isEditing ? 'bi-check2-square' : 'bi-pencil-square'}`}></i>
                        {isEditing ? 'Save Changes' : 'Edit Details'}
                    </Button>
                </div>
            </div>
            <div className="grid-container">
                {/* Profile Image Section */}
                <div className="profile-image">
                    <Dp name={`${formData.firstName} ${formData.lastName}`} dp={profilePictureUrl || dpPic} designation={formData.designation} />

                    {isEditing ? (<Button name="edit-image" variant="link">
                        <i className="bi bi-pencil-square"></i>
                        Change Image
                    </Button>) : ""}
                </div>

                {/* Profile Information Section */}
                <div>
                    <h3>Employee Profile</h3>
                    <br />

                    <div className="name-field-div">
                        <Input
                            disabled={true}
                            label="Employee ID"
                            value={formData.employeeId}
                            name="employeeId"
                        />
                        <Input
                            disabled={!isEditing}
                            label="First Name"
                            value={formData.firstName}
                            name="firstName"
                            onChange={handleInputChange}
                        />
                        <Input
                            disabled={!isEditing}
                            label="Last Name"
                            value={formData.lastName}
                            name="lastName"
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="third-field-div">
                        <Select
                            disabled={!isEditing}
                            label="Department"
                            value={formData.department}
                            options={departmentOptions}
                            name="department"
                            onChange={handleInputChange}
                        />
                        <Select
                            disabled={!isEditing}
                            label="Designation"
                            value={formData.designation}
                            options={designationOptions}
                            name="designation"
                            onChange={handleInputChange}
                        />
                        <Select
                            disabled={!isEditing}
                            label="Status"
                            value={formData.status}
                            options={statusOptions}
                            name="status"
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="name-field-div">
                        <Input
                            disabled={!isEditing}
                            label="Email Address"
                            value={formData.workEmail}
                            name="workEmail"
                            onChange={handleInputChange}
                        />
                        <Input
                            disabled={!isEditing}
                            label="Contact Number"
                            value={formData.phoneNumber}
                            name="phoneNumber"
                            onChange={handleInputChange}
                        />
                        <Select
                            disabled={!isEditing}
                            label="Employment Type"
                            value={formData.employeeType}
                            options={employeeTypeOptions}
                            name="employeeType"
                            onChange={handleInputChange}
                        />
                    </div>
                </div>

                {/* Employee Access Section */}
                <div>
                    <h3>Attendance Status</h3>
                    <AttendanceStatus status="present" />
                    <h3>Reporting To</h3>
                    <br />
                    <Input disabled={true} value="Manager Name" name="reportingTo" /> {/* Always disabled */}
                    <div className="center">
                        <Button>
                            <i className="bi bi-person"></i>
                            View Profile
                        </Button>
                    </div>
                </div>
            </div>

            <div className="grid-container-2">
                <div className="map">
                    <h3>Last Known Location</h3>
                    <Map
                        disableInteractions
                        center={[13.000, 80.23123]}
                        zoom={13}
                        markers={[
                            {
                                position: [13.000, 80.23123],
                                popupContent: "GAIL Office, Delhi"
                            }
                        ]}
                    />
                </div>

                <div className="recent-activities">
                    <RecentActivityList activities={activities} />
                </div>
            </div>
        </>
    );
}

export default ProfileLayout;
