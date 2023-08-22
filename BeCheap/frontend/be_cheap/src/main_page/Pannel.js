import React from "react";
import MyButton from "../templates/MyButton";
import '../styles/Pannel.css'

function Pannel(props) { 
    return (
        <div className="pannel">
            <div className="upper_pannel">
                <span className="pannel_label">
                    BeCheap
                </span>
            </div>
            <div className="lower_pannel">
                <MyButton id='auth_btn' text="Sign Up / Log In" onClickVal={true} onClick={props.setAuthClicked} style={PannelBtnsStyle}/>
                <div className="pannel_spacing"/>
                <MyButton id='profile_btn' text="Authorize to access profile" onClickVal={true} onClick={props.setProfileClicked} style={PannelBtnsStyle}/>
            </div>
        </div>
    )    
}

const PannelBtnsStyle = {
    'margin-top': '5px',
    'margin-bottom': '10px',
    'margin-left': '10px',
    'margin-right': '10px',
    'padding-bottom': '5px',
    'padding-top': '5px',
    'min-width': '130px',     
}
export default Pannel;