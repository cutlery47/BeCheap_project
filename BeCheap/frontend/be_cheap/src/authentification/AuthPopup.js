import React, {useEffect, useState} from 'react'
import '../styles/AuthPopup.css'
import LogIn from './LogIn'
import SignUp from './SignUp';

function AuthPopup(props) {
  //с помощью этого проверям - логиниться или регаться
  let [doLogin, setLoginState] = useState(false);
  let [forms, setForms] = useState(null)

  //catch response - для обработки ошибок сети (4XX И 5XX)
  //catch data - для обработки ошибок в самих данных
  
  //рендерим логинг или регинг в зависимости от выбора юзера
  useEffect(() => {
    if (doLogin == false) {
      setForms(<SignUp 
        setAuthClicked={props.setAuthClicked} setLoginState={setLoginState}
        userToken={props.userToken} setUserToken={props.setUserToken}
        userName={props.userName} setUserName={props.setUserName}
      />);
    } else {
      setForms(<LogIn 
        setAuthClicked={props.setAuthClicked} setLoginState={setLoginState}
        userToken={props.userToken} setUserToken={props.setUserToken}
        userName={props.userName} setUserName={props.setUserName}
      />);
    }
  }, [doLogin])
  
  //рендерим popup только если была нажата кнопка
  return (props.authorize) ?  (
    <div className='authpopup'>
        {forms}
    </div>
  ) : <></>;
}

export default AuthPopup