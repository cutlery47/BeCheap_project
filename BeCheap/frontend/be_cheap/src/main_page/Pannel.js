import React from "react";
import '../styles/Pannel.css'
import '../authentification/AuthPopup'

function Pannel(props) { 
    let rows = 
    <>
        <div className="upper_pannel">
            <div className="labels">
                <div>
                    BeCheap
                </div>   
            </div>  
            <div className="buttons">
                <button className="button" id="auth_btn" onClick={() => 
                    // поле логина
                    {
                    props.setAuthClicked(true)
                    }}>
                    <span id="sign_btn_txt">
                        Sign Up / Log in
                    </span>
                </button>
                <button className="button" id="profile_btn" onClick={() => 
                    // если зареган - поле профиля
                    // иначе - поле регистрации
                    {   
                        if (props.User.token == 'None') {
                            props.setAuthClicked(true)
                        } else {
                            props.setProfileClicked(true)
                        }
                        
                    }}>
                    <span id="usrname_txt">
                        Profile
                    </span>
                </button>
            </div>
        </div>
        <div className="side_pannel">
        </div>
    </>
       
    return (
        <div className="pannels">
            {rows}
        </div>
    )    
}

export default Pannel;