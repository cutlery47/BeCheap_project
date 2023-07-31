import React, { useEffect } from "react";
import '../styles/Pannel.css'

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
                <button class="button" role="button" onClick={() => props.setSortClicked(!props.is_sorted)}>
                    Sort
                </button>
                <button class="button" id="auth_btn" onClick={() => {props.setAuthClicked(!props.is_authorized)}}>
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