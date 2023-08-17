import React, {useState, useEffect} from 'react'
import '../styles/LogIn.css'

function LogIn(props) {
  let [formsData, setFormsData] = useState([])

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

          //при логине обновляем state юзера
          const obj = Object();
          Object.assign(obj, props.User)
          
          obj.token = data.auth_token;
          obj.name = formsData[0];

          props.setUser(obj);
          document.getElementById("close").click()
        } else {
          const span = document.getElementById("error_msg")
          //вывожу ошибки в консоль (если были)
          if (data.username != undefined) {
            span.textContent=("Login: " + data.username[0])
          } else if (data.password != undefined) {
            span.textContent=("Password: " + data.password[0])
          } else if (data.non_field_errors != undefined) {
            span.textContent=("Error: " + data.non_field_errors[0])
          } else {
            console.log(data)
          }
        }
      })
    }
  }, [formsData])

  return (
    <div className="log_in">
      <div className="log_in_inner">
        <button className="button_log" id="close" onClick={() => {
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
            <input className='input_auth' maxLength={15}/>
          </div>
          <div className='field' id="passwrd_field">
            <span>
            Your password:
            </span>
            <input className='input_auth' type='password' maxLength={15}/>
          </div>
          <span className = "login_link" onClick={() => props.setLoginState(false)}>
            I dont have an account yet!
          </span>

        </div>
          <button  className='button_log' id='submit_log' onClick={() => {
            const data = document.getElementsByClassName('input_auth')
            const data_arr = []

            for (let dat of data) {
              data_arr.push(dat.value)
            }
            
            setFormsData(data_arr);
            }}>
              Log in!
          </button>
          <span id="error_msg"/>        
      </div>
    </div>
  )
}

export default LogIn