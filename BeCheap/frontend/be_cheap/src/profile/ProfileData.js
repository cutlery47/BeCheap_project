import React, { useEffect } from 'react'
import '../styles/ProfileData.css'
import user_img from'../media/baga.jpg'
import ProfileFavorites from './ProfileFavorites'

function ProfileData(props) {
    return (
    <div className='profile_data'>
        <div className='profile_data_inner'>
            <div className='forms'>
                <h1 className='title_3'>Profile</h1>
                <img src={user_img} id='user_img' alt='img'/>
                <h1 className='title_1'>{props.User.name}</h1>
                <button className='btn_profile' id='edit_profile' onClick={() => {
                    props.setEdit(true)
                    }}>
                    Edit Profile
                </button>
            </div>
            <div className='favorite_items'>
                <h2 className='title_2'>
                    Your favorite items:
                </h2>
                <div className='profile_favorites'>
                    <ProfileFavorites
                    User={props.User} setUser={props.setUser}
                    profile_clicked={props.profile_clicked} setProfileClicked={props.setProfileClicked}/>
                </div>
            </div>
            <div className='profile_btns'>
                <button className='btn_profile' id='close_profile' onClick={() => {
                    props.setProfileClicked(false);
                }}>
                    Close
                </button>
            </div>
            
        </div>
        
    </div>
    )
}

export default ProfileData