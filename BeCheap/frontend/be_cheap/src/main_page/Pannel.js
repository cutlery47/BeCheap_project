import React, { useEffect } from "react";
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
            {/* будем изменять значение is_sorted при нажатии на кнопку */}
            <div className="buttons">
                <button className="button" id="auth_btn" onClick={() => 
                    {
                    //просто оставлю на всякий лог токена
                    console.log(props.User.token)
                    props.setAuthClicked(!props.authorize)
                    }}>
                    <span id="sign_btn_txt">
                        Sign Up / Log in
                    </span>
                </button>
                <button class="button" id="profile_btn" onClick={() => 
                    {   
                        if (props.User.token == 'None') {
                            props.setAuthClicked(!props.authorize)
                        } else {
                            props.setProfileClicked(!props.profile_clicked)
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