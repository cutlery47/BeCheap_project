import React, { useEffect, useState } from 'react'
import ItemsGrid from './ItemsGrid'
import Pannel from './Pannel'
import AuthPopup from '../authentification/AuthPopup';
import Cookies from 'js-cookie'
import ProfilePopup from '../profile/ProfilePopup'


function InterfaceMain() {
  //========================BUTTONS==============================
  //state-переменные, которые хранят состояния кнопок (нажаты/нет)
  let [authorize, setAuthClicked] = useState(false);
  let [profile_clicked, setProfileClicked] = useState(false);

  //========================USER_DATA============================
  let [User, setUser] = useState({
    name: 'None',
    token: 'None',
    email: 'None',
    telegram: 'None',
    date_joined: 'None',
  })

  //при запуске сайта проверка на токен в куках, если токен есть - обновляем стейт юзера
  useEffect(() => {
    if (Cookies.get('token') != undefined) {
      console.log('existing user')
      const obj = Object();
      Object.assign(obj, User);
      
      obj.token = Cookies.get('token');
      obj.name = Cookies.get('username');
      
      setUser(obj);
    }
  }, [])

  //если у юзера в атрибутах внезапно появился токен - добавлем куки с токеном и ником для автоматической авторизации (см. пред.)
  useEffect(() => {
    if (User.token != "None") {
      document.getElementById("sign_btn_txt").textContent="Change account"
      Cookies.set('token', User.token)
      document.getElementById("usrname_txt").textContent="Profile: " + User.name;
      Cookies.set('username', User.name);
    }
  }, [User])

  return (
    <div className="everything">
      <div className='main_page'>
        {/* верхняя панель */}
        <Pannel 
        authorize={authorize} setAuthClicked={setAuthClicked}
        profile_clicked={profile_clicked} setProfileClicked={setProfileClicked}
        User={User} setUser={setUser}/>
        {/* сетка товаров */}
        <ItemsGrid 
        authorize={authorize} setAuthClicked={setAuthClicked}
        User={User} setUser={setUser}/>
      </div>
      <div className='popups'>
        <div className='auth_popup'>
          {/* поле авторизации и аутентификации */}
          <AuthPopup 
          authorize={authorize} setAuthClicked={setAuthClicked} 
          User={User} setUser={setUser}/>
        </div>
        <div className='profile_popup'>
          {/* профиль */}
          <ProfilePopup
          profile_clicked={profile_clicked} setProfileClicked={setProfileClicked}
          User={User} setUser={setUser}/>
        </div>
      </div>
    </div>
  )
}

export default InterfaceMain;

