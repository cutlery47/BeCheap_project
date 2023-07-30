import React, { useEffect } from "react";
import './Pannel.css'

function Pannel(props) { 

    let rows = 
    <>
        <div className="upper_pannel">
            <div className="u_pannel_contents">
                <div className="labels">
                        <div>
                            BeCheap
                        </div>   
                </div>  
                {/* будем изменять значение is_sorted при нажатии на кнопку */}
                <div className="buttons" onClick={() => props.setSortClicked(!props.is_sorted)}>
                    <button id="sort_btn">
                        Sort
                    </button>
                    <button>
                        Authorize
                    </button>
                    <button>
                        Show More
                    </button>
                    <button>
                        YA PIDOR
                    </button>
                </div>
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