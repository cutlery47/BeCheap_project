import React, {useState, useEffect} from 'react'
import '../styles/LogIn.css'

function LogIn(props) {
  let [formsData, setFormsData] = useState([])
  let [errCode, setErrCode] = useState(0)

  useEffect(() => {
    let login_status = false

    if (formsData.length !== 0) {
      fetch('http://127.0.0.1:8000/auth/token/login', {
        method: 'POST',
        body: JSON.stringify({
          username: formsData[0],
          password: formsData[1]
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      })
      .then((response) => { 
        login_status = response.ok
        return response.json()
      })
      .then((data) => {
        if (login_status == true) {
          console.log("logged in successfully!");
          //при логине обновляем state переменные
          props.setUserToken(data)
          props.setUserName(formsData[0])

          document.getElementById("close").click()
        } else {
          //вывожу ошибки в консоль (если были)
          if (data.password != undefined) {
            console.log("password: " + data.password)
            // sendErrorMsg(1)
          } else if (data.username != undefined) {
            console.log("username: " + data.username)
            //sendErrorMsg(2)
          } else if (data.non_field_errors != undefined) {
            console.log("an error occured: " + data.non_field_errors)
            //sendErrorMsg(2)
          } else {
            console.log(data)
            //sendErrorMsg(3) 
          }
        }
      })
    }
  }, [formsData])

  return (
    <div className="log_in">
      <div className="log_in_inner">
        <button className="close_button" id="close" onClick={() => {
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