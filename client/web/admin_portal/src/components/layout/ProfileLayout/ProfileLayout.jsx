import React from 'react';
import "./ProfileLayout.css"
import Dp from "../../common/Dp/Dp";
import dpPic from "../../../assets/images/img.png";
import Button from "../../common/Button/Button";
import Input from "../../common/Input/Input";
import Select from "../../common/Select/Select";
import {departmentOptions, designationOptions, employeeTypeOptions, statusOptions} from "../../../data/employee/data";



function ProfileLayout({props}) {
    const profilePicUrl = props.profilePictureUrl || dpPic;
    return (
        <div className="grid-container">
            <div className="profile-image">
                <Dp name={`${props.firstName} ${props.lastName}`} dp={profilePicUrl} designation={props.designation} />
                <Button name="edit-image"
                variant="link">
                    <i className="bi bi-pencil-square"></i>
                    Change Image
                </Button>
            </div>
            <div>
                <h3>Employee Profile</h3>
                <br/>
                <div className="name-field-div">
                    <Input
                        disabled
                        label="Employee ID"
                        value={props.employeeId}
                        name="employeeId"/>

                    <Input
                        disabled
                        label="First Name"
                        value={props.firstName}
                        name="firstName"/>

                    <Input
                        disabled
                        label="Last Name"
                        value={props.lastName}
                        name="lastName"/>
                </div>
                <div className="second-field-div">
                    <Input
                        disabled
                        label="Official Email Address"
                        value={props.workEmail}
                        name="workEmail"/>

                    <Select
                        disabled
                        label="Employment Type"
                        value={props.employeeType}
                        options={employeeTypeOptions}
                        name="firstName"/>
                </div>
                <div className="third-field-div">
                    <Select
                        disabled
                        label="Department"
                        value={props.department}
                        options={departmentOptions}
                        name="department"/>

                    <Select
                        disabled
                        label="Designation"
                        value={props.designation}
                        options={designationOptions}
                        name="designation"/>

                    <Select
                        disabled
                        label="Status"
                        value={props.status}
                        options={statusOptions}
                        name="firstName"/>
                </div>
            </div>
            <div>
            <h3>Employee Access</h3>
            </div>
        </div>
    );
}

export default ProfileLayout;