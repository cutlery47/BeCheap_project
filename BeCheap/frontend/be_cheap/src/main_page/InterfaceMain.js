import React, { useEffect, useState } from 'react'
import ItemsGrid from './ItemsGrid'
import Pannel from './Pannel'
import AuthPopup from '../authentification/AuthPopup';
import Cookies from 'js-cookie'

function InterfaceMain() {
  //========================USER_DATA============================
  let [userToken, setUserToken] = useState("None");
  let [userName, setUserName] = useState('None');
  //определять авторизацию пользователя будем через токен (пока что)
  //если токен есть - юзер залогинен, иначе нет

  useEffect(() => {
    if (userToken != "None") {
      document.getElementById("sign_btn_txt").textContent="Change account"
      Cookies.set('token', userToken)
    }
  }, [userToken])

  useEffect(() => {
    if (userName != "None") {
      document.getElementById("usrname_txt").textContent=userName
      Cookies.set('username', userName);
    }
  }, [userName])

  useEffect(() => {
    if (Cookies.get('token') != undefined) {
      setUserToken(Cookies.get('token'));
      setUserName(Cookies.get('username'));
    }
    
    
  }, [])

  //========================BUTTONS==============================
  //state-переменные, которые хранят состояния кнопок (нажаты/нет)
  //передаем их в младшие компоненты
  let [sort_clothes, setClothesSortClicked] = useState(false);
  let [authorize, setAuthClicked] = useState(false);

  return (
    <div className="everything">
      <div className='main_page'>
        <Pannel 
        sort_clothes={sort_clothes} setClothesSortClicked={setClothesSortClicked}
        authorize={authorize} setAuthClicked={setAuthClicked}
        userToken={userToken} setUserToken={setUserToken}
        userName={userName} setUserName={setUserName}/>

        <ItemsGrid 
        sort_clothes={sort_clothes} setClothesSortClicked={setClothesSortClicked}
        authorize={authorize} setAuthClicked={setAuthClicked}
        userToken={userToken} setUserToken={setUserToken}/>
      </div>
      <div className='popups'>
        <AuthPopup 
        authorize={authorize} setAuthClicked={setAuthClicked} 
        userToken={userToken} setUserToken={setUserToken}
        userName={userName} setUserName={setUserName}/>
      </div>
        
    </div>
  )
}

export default InterfaceMain;

