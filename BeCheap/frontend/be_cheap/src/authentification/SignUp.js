import React, {useState, useEffect} from 'react'
import '../styles/SignUp.css'

function SignUp(props) {
  let [formsData, setFormsData] = useState([])
  let [errCode, setErrCode] = useState(0)

  useEffect(() => {
    //при вводе данных для регистрации производится два пост-запроса
    //первый запрос - запрос на регистрацию пользователя
    //если первый запрос был успешен - выполняется второй запрос
    //второй запрос - запрос на логин, чтобы юзер сразу же логинился в аккаунт
    let signup_status = false //переменная чтобы хранить статус регистрации

    //бля какую же хуету я написал это просто пизец
    if (formsData.length !== 0) {
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
          if (data.password != undefined) {
            console.log("password: " + data.password)
            // sendErrorMsg(1)
          } else if (data.username != undefined) {
            console.log("username: " + data.username)
            //sendErrorMsg(2)
          } else {
            console.log(data)
            //sendErrorMsg(3) 
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
            props.setUserToken(data);
            props.setUserName(formsData[0])

            document.getElementById("close").click()
          })
        } 
      })

      
    }
  }, [formsData])


  //проверка на ошибки ввода данных в формы
  function sendErrorMsg() {
    if (errCode === 1) {
      return(
        <span className='error_msg'>
          Passwords don't match!
        </span>
      )
    }

    if (errCode === 2) {
      return(
        <span className='error_msg'>
          No login entered
        </span>
      )
    }

    if (errCode === 3) {
      return(
        <span className='error_msg'>
          Ny tipo hyeta
        </span>
      )
    }
  }

  return (
    <div className="sign_up">
      <div className="sign_up_inner">
        <button className="close_button" id="close" onClick={() => props.setAuthClicked(false)}> 
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
            //доделать проверку

            }}>
              Sign Up!
          </button>
          {sendErrorMsg()}
      </div>
    </div>
  )
}

export default SignUp