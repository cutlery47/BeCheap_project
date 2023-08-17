import React, { useEffect, useState } from 'react'
import '../styles/ProfileEdit.css'

function ProfileEdit(props) {
    let [confirmEdit, setConfirmed] = useState(false);

    useEffect(() => {
        console.log('XYU');

    }, [confirmEdit])

    return (
        <div className='profile_edit'>
            <div className='profile_edit_inner'>
                <div className='data'>
                    <div className='edit_field' id='curr_email'>
                        <span>
                            Your current email: {props.User.email}
                        </span>
                    </div>
                    <div className='edit_field' id='edit_email'>
                        <span>
                            Change your email: 
                        </span>
                        <input/>    
                    </div>
                    <div className='edit_field' id='curr_tg'>
                        <span>
                            Your current telegram: {props.User.telegram}
                        </span>
                    </div>
                    <div className='edit_field' id='edit_tg'>
                    <span>
                            Change your telegram: 
                        </span>
                        <input/>    
                    </div>
                </div>
                <div className='edit_btns'>
                    <button id='edit_close' onClick={() => {
                        props.setEdit(false)
                    }}>
                        Close
                    </button>

                    <button id='edit_apply' onClick={() => {
                        setConfirmed(true);
                    }}>
                        Confirm changes
                    </button>
                </div>
                
            </div>
        </div>
    )
}

export default ProfileEdit