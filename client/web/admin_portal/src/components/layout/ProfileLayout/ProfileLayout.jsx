import React from 'react';
import "./ProfileLayout.css"
import Dp from "../../common/Dp/Dp";
import dpPic from "../../../assets/images/img.png";



function ProfileLayout({props}) {
    const profilePicUrl = props.profilePictureUrl || dpPic;
    return (
        <div className="grid-container">
            <div className="profile-image">
                <Dp name={`${props.firstName} ${props.lastName}`} dp={profilePicUrl} designation={props.designation} />
            </div>
            <div></div>
            <div>
                <h3>Employee Access</h3>
            </div>
        </div>
    );
}

export default ProfileLayout;