import React, { useEffect, useState } from 'react'
import ItemsGrid from './ItemsGrid'
import Pannel from './Pannel'
import AuthPopup from '../authentification/AuthPopup';

function InterfaceMain() {
  //========================USER_DATA============================
  let [userToken, setUserToken] = useState("None");
  let [userName, setUserName] = useState('None');
  //определять авторизацию пользователя будем через токен (пока что)
  //если токен есть - юзер залогинен, иначе нет

  useEffect(() => {
    if (userToken != "None") {
      document.getElementById("sign_btn_txt").textContent="Logged in successfully!"
    }
  }, [userToken])

  useEffect(() => {
    if (userName != "None") {
      document.getElementById("usrname_txt").textContent=userName
    }
  }, [userName])

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

