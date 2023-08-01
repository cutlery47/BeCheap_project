import React, {useState, useEffect} from 'react'
import '../styles/LogIn.css'

function LogIn(props) {
  let [formsData, setFormsData] = useState([])

  useEffect(() => {
    console.log(formsData);
  }, [formsData])

  return (
    <div className="log_in">
      <div className="log_in_inner">
        <button className="close_button" onClick={() => {
          props.setAuthClicked(false);
          props.setLoginState(false);}}> 
          Close
        </button>
        <span id='title_log'>
          Log into your account!
        </span>
        <div className='fields'>
          <div className="field" id="login_field">
            <span>
            Your login:
            </span>
            <input className='input'/>
          </div>
          <div className='field' id="passwrd_field">
            <span>
            Your password:
            </span>
            <input className='input'/>
          </div>
          <span className = "login_link" onClick={() => props.setLoginState(false)}>
            I dont have an account yet!
          </span>

        </div>
          <button  className='submit_button' onClick={() => {
            const data = document.getElementsByClassName('input')
            const data_arr = []

            for (let dat of data) {
              data_arr.push(dat.value)
            }
            
            setFormsData(data_arr);
            }}>
              Log in!
          </button>
        
      </div>
    </div>
  )
}

export default LogIn