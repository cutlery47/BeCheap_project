import React, {useEffect, useState} from 'react'
import '../styles/AuthPopup.css'
import LogIn from './LogIn'
import SignUp from './SignUp';

function AuthPopup(props) {
  //с помощью этого проверям - логиниться или регаться
  let [doLogin, setLoginState] = useState(false);
  let [forms, setForms] = useState(null)

  //рендерим логинг или регинг в зависимости от выбора юзера
  useEffect(() => {
    if (doLogin == false) {
      setForms(<SignUp setAuthClicked={props.setAuthClicked} setLoginState={setLoginState}/>);
    } else {
      setForms(<LogIn setAuthClicked={props.setAuthClicked} setLoginState={setLoginState}/>);
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