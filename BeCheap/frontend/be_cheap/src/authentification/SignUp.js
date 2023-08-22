import React, {useState, useEffect} from 'react'
import '../styles/SignUp.css'
import MyButton from '../templates/MyButton'

function SignUp(props) {
  let [formsData, setFormsData] = useState([])

  useEffect(() => {
    //при вводе данных для регистрации производится два пост-запроса
    //первый запрос - запрос на регистрацию пользователя
    //если первый запрос был успешен - выполняется второй запрос
    //второй запрос - запрос на логин, чтобы юзер сразу же логинился в аккаунт
    let signup_status = false //переменная чтобы хранить статус регистрации

    //бля какую же хуету я написал это просто пизец
    if (formsData.length !== 0) {
      const span = document.getElementById("error_msg")

      if (formsData[1] != formsData[2]) {
        span.textContent=("Password: passwords should be the same");
        return;
      }

      fetch('http://127.0.0.1:8000/auth/users/', {
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
          //если не было ошибки 4xx или 5xx - запрос прошел
          signup_status = response.ok;
          return response.json()
      }).then((data) => {
        if (signup_status == true) {
          console.log("signed up successfully!");
        } else {
          //вывожу ошибки в консоль (если были)
          console.log(data)
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
      }).then(() => {
        //второй пост-запрос
        if (signup_status == true) {
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
          .then((response) => response.json())
          .then((data) => {
            //при логине обновляем state юзера
            const obj = Object();
            Object.assign(obj, props.User)

            obj.token = data.auth_token;
            obj.name = formsData[0];
            
            props.setUser(obj);

            document.getElementById("close").click()
          })
        } 
      })

      
    }
  }, [formsData])

  function SubmitData() {
    const data = document.getElementsByClassName('input_auth')
    const data_arr = []

    for (let dat of data) {
      data_arr.push(dat.value)
    }
    
    setFormsData(data_arr);
  }

  return (
    <div className="sign_up">
      <div className="sign_up_inner">
        <MyButton id="close" onClick={props.setAuthClicked} onClickVal={false} text={"Close"}/>
        <span id='title'>
          Sign Up!
        </span>
        <div className='fields'>
          <div className="field" id="login_field">
            <span>
            Choose your login:
            </span>
            <input id="inpt_1" className='input_auth' maxLength={15}/>
          </div>
          <div className='field' id="passwrd_field">
            <span>
            Choose your password:
            </span>
            <input id="inpt_2" className='input_auth'  type='password' maxLength={15}/>
          </div>
          <div className='field' id="passwrd_field_2">
            <span> 
              Confirm your password:
            </span>
            <input id="inpt_3" className='input_auth' type='password'  maxLength={15}/>
          </div>
          <span className = "login_link" onClick={() => props.setLoginState(true)}>
            I already have an account!
          </span>

        </div>
          
          <span id="error_msg"/>
          <MyButton id='submit' onClick={SubmitData} text={'Sign Up'} style={SubmitBtnStyle}/>
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

export default SignUp