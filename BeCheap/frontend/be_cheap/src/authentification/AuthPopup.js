import React, {useEffect, useState} from 'react'
import '../styles/AuthPopup.css'
import LogIn from './LogIn'
import SignUp from './SignUp';

function AuthPopup(props) {
  //с помощью этого проверям - логиниться или регаться
  let [doLogin, setLoginState] = useState(false);
  let [forms, setForms] = useState(<></>)

  //catch response - для обработки ошибок сети (4XX И 5XX)
  //catch data - для обработки ошибок в самих данных
  
  //рендерим логинг или регинг в зависимости от выбора юзера
  useEffect(() => {
    if (doLogin == false) {
      setForms(<SignUp 
        setAuthClicked={props.setAuthClicked} setLoginState={setLoginState}
        User={props.User} setUser={props.setUser}
      />);
    } else {
      setForms(<LogIn 
        setAuthClicked={props.setAuthClicked} setLoginState={setLoginState}
        User={props.User} setUser={props.setUser}
      />);
    }
  }, [doLogin])
  
  //рендерим popup только если была нажата кнопка
  return (props.authorize) ?  (
    <>{forms}</>
  ) : <></>;
}

export default AuthPopup