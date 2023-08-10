import React, {useEffect, useState} from 'react'
import ProfileData from './ProfileData'

function ProfilePopup(props) {
    return (props.profile_clicked) ? (
        <ProfileData 
        profile_clicked={props.profile_clicked} setProfileClicked={props.setProfileClicked}
        User={props.User} setUser={props.setUser}/>
      ) : <></>;
}

export default ProfilePopup