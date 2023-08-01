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
                <button className="button" role="button" onClick={() => props.setClothesSortClicked(!props.is_sorted)}>
                    Sort
                </button>
                <button className="button" id="auth_btn" onClick={() => {props.setAuthClicked(!props.authorize)}}>
                    Sign Up / Log in
                </button>
                <button class="button">
                  Profile
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