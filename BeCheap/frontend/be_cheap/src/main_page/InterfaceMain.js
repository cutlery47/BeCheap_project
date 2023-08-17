import React, { useEffect, useState } from 'react'
import ItemsGrid from './ItemsGrid'
import Pannel from './Pannel'
import AuthPopup from '../authentification/AuthPopup';
import Cookies from 'js-cookie'
import ProfilePopup from '../profile/ProfilePopup'


function InterfaceMain() {
  //========================BUTTONS==============================
  //state-переменные, которые хранят состояния кнопок (нажаты/нет)
  //передаем их в младшие компоненты
  let [sort_clothes, setClothesSortClicked] = useState(false);
  let [authorize, setAuthClicked] = useState(false);
  let [profile_clicked, setProfileClicked] = useState(false)

  //========================USER_DATA============================
  let [User, setUser] = useState({
    name: 'None',
    token: 'None',
    email: 'None',
    telegram: 'None',
    date_joined: 'None',
    favorites: new Set(),
  })

  //определять авторизацию пользователя будем через токен (пока что)
  //если токен есть - юзер залогинен, иначе нет

  useEffect(() => {
    if (User.token != "None") {
      document.getElementById("sign_btn_txt").textContent="Change account"
      Cookies.set('token', User.token)
    }

    if (User.name != "None") {
      document.getElementById("usrname_txt").textContent="Profile: " + User.name;
      Cookies.set('username', User.name);
    }

    if (User.favorites.size != 0) {
      Cookies.set('favorites', Array.from(User.favorites).join('/'));
      console.log(User.favorites)
    }

  }, [User])

  useEffect(() => {
    if (Cookies.get('token') != undefined) {
      const obj = Object();
      Object.assign(obj, User);
      
      obj.token = Cookies.get('token');
      obj.name = Cookies.get('username');

      if (Cookies.get('favorites') != undefined) {
        obj.favorites = new Set(Cookies.get('favorites').split('/'))
      }
      
      setUser(obj);
    }

  }, [])

  return (
    <div className="everything">
      <div className='main_page'>
        <Pannel 
        sort_clothes={sort_clothes} setClothesSortClicked={setClothesSortClicked}
        authorize={authorize} setAuthClicked={setAuthClicked}
        profile_clicked={profile_clicked} setProfileClicked={setProfileClicked}
        User={User} setUser={setUser}/>

        <ItemsGrid 
        sort_clothes={sort_clothes} setClothesSortClicked={setClothesSortClicked}
        authorize={authorize} setAuthClicked={setAuthClicked}
        User={User} setUser={setUser}/>
      </div>
      <div className='popups'>
        <div className='auth_popup'>
          <AuthPopup 
          authorize={authorize} setAuthClicked={setAuthClicked} 
          User={User} setUser={setUser}/>
        </div>
        <div className='profile_popup'>
          <ProfilePopup
          profile_clicked={profile_clicked} setProfileClicked={setProfileClicked}
          User={User} setUser={setUser}/>
        </div>
      </div>
        
    </div>
  )
}

export default InterfaceMain;

