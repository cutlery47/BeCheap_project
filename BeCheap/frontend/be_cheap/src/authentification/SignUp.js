import React, {useState, useEffect} from 'react'
import '../styles/SignUp.css'

function SignUp(props) {
  let [formsData, setFormsData] = useState([])

  useEffect(() => {
    console.log(formsData);
  }, [formsData])

  return (
    <div className="sign_up">
      <div className="sign_up_inner">
        <button className="close_button" onClick={() => props.setAuthClicked(false)}> 
          Close
        </button>
        <span id='title'>
          Create an account!
        </span>
        <div className='fields'>
          
          <div className="field" id="login_field">
            <span>
            Choose your login:
            </span>
            <input id="inpt_1" className='input'/>
          </div>
          <div className='field' id="passwrd_field">
            <span>
            Choose your password:
            </span>
            <input id="inpt_2" className='input'/>
          </div>
          <div className='field' id="passwrd_field_2">
            <span> 
              Confirm your password:
            </span>
            <input id="inpt_3" className='input'/>
          </div>
          <span className = "login_link" onClick={() => props.setLoginState(true)}>
            
            I already have an account!
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
              Sign Up!
          </button>
      </div>
    </div>
  )
}

export default SignUp