import React from 'react';
import "./ProfileLayout.css";
import Dp from "../../common/Dp/Dp";
import dpPic from "../../../assets/images/img.png";
import Button from "../../common/Button/Button";
import Input from "../../common/Input/Input";
import Select from "../../common/Select/Select";
import { departmentOptions, designationOptions, employeeTypeOptions, statusOptions } from "../../../data/employee/data";
import AttendanceStatus from "../../features/AttendanceStatus/AttendanceStatus";

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

    return (
        <div className="grid-container">
            {/* Profile Image Section */}
            <div className="profile-image">
                <Dp name={`${firstName} ${lastName}`} dp={profilePictureUrl || dpPic} designation={designation} />
                <Button name="edit-image" variant="link">
                    <i className="bi bi-pencil-square"></i>
                    Change Image
                </Button>
            </div>

            {/* Profile Information Section */}
            <div>
                <h3>Employee Profile</h3>
                <br />

                <div className="name-field-div">
                    <Input disabled label="Employee ID" value={employeeId} name="employeeId" />
                    <Input disabled label="First Name" value={firstName} name="firstName" />
                    <Input disabled label="Last Name" value={lastName} name="lastName" />
                </div>

                <div className="third-field-div">
                    <Select disabled label="Department" value={department} options={departmentOptions} name="department" />
                    <Select disabled label="Designation" value={designation} options={designationOptions} name="designation" />
                    <Select disabled label="Status" value={status} options={statusOptions} name="status" />
                </div>

                <div className="name-field-div">
                    <Input disabled label="Email Address" value={workEmail} name="workEmail" />
                    <Input disabled label="Contact Number" value={phoneNumber} name="phoneNumber" />
                    <Select disabled label="Employment Type" value={employeeType} options={employeeTypeOptions} name="employeeType" />
                </div>
            </div>

            {/* Employee Access Section */}
            <div>
                <h3>Attendance Status</h3>
                <AttendanceStatus status="present"/>
                <h3>Reporting To</h3>
                <br/>
                <Input disabled value="Manager Name" name="reportingTo"/>
                <div className="center">
                    <Button>
                        <i className="bi bi-person"></i>
                        View Profile
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default ProfileLayout;
