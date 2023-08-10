import React from 'react'
import '../styles/ProfileData.css'
import user_img from'../media/baga.jpg'
import ProfileFavorites from './ProfileFavorites'

function ProfileData(props) {
  return (
    <div className='profile_data'>
        <div className='profile_data_inner'>
            <div className='forms'>
                <h1 className='title_1'>{props.User.name}</h1>
                <img src={user_img} id='user_img' alt='img'/>
                <div className='data'>
                    <span>
                        Your email: {props.User.email}
                    </span>
                </div>

                <div className='data'>
                    <span>
                        Your telegram @: {props.User.telegram}
                    </span>
                </div>

                <div className='data'>
                    <span>
                        Date joined: {props.User.data}
                    </span>
                </div>

            </div>

            <div className='favorite_items'>
                <h2 className='title_2'>
                    Your favorite items:
                </h2>
                <div className='profile_favorites'>
                    <ProfileFavorites/>
                </div>
            </div>
            

            <div className='profile_btns'>
                <button className='btn_profile' id='close_profile' onClick={() => {
                    props.setProfileClicked(!props.profile_clicked)
                }}>
                    Close
                </button>
                <button className='btn_profile' id='edit_profile'>
                    Edit Data
                </button>
            </div>
            
        </div>
        
    </div>
  )
}

export default ProfileData