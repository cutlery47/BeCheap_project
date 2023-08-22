import React, {useState, useEffect} from 'react'
import '../styles/LogIn.css'
import MyButton from '../templates/MyButton'

function LogIn(props) {
  //данные на ввод
  let [formsData, setFormsData] = useState([])

  useEffect(() => {
    let login_status = false

    //запрос на логин
    //если все норм - получаю токен
    //иначе выдаю ошибку
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

  function closeLogin() {
    props.setAuthClicked(false);
    props.setLoginState(false);
  }

  function LoginData() {
    const data = document.getElementsByClassName('input_auth')
    const data_arr = []

    for (let dat of data) {
      data_arr.push(dat.value)
    }
    
    setFormsData(data_arr);
  }

  return (
    <div className="log_in">
      <div className="log_in_inner">
        <MyButton id={'close'} onClick={closeLogin} text={'Close'}/>
        <span id='title_log'>
          Log In!
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
          <span id="error_msg"/>  
          <MyButton id='submit_log' text={'Log In'} onClick={LoginData} style={SubmitBtnStyle}/>      
      </div>
    </div>
  )
}

const SubmitBtnStyle = {
  'min-width': '20px',
  'position': 'absolute',
  'left': '50%',
  '-ms-transform': 'translate(-50%, -50%)',
  'transform': 'translate(-50%, -50%)',
  'bottom': '0.3%',
  'padding-top': '5px',
  'padding-bottom': '5px',
}

export default LogIn