import React, { useEffect, useState } from 'react'
import ItemsGrid from './ItemsGrid'
import Pannel from './Pannel'
import AuthPopup from '../authentification/AuthPopup';

function InterfaceMain() {

  //========================USER_DATA============================
  let[is_logged, setLogged] = useState(false)

  //========================BUTTONS==============================
  //state-переменные, которые хранят состояния кнопок (нажаты/нет)
  //передаем их в младшие компоненты
  let [sort_clothes, setClothesSortClicked] = useState(false);
  let [authorize, setAuthClicked] = useState(false);

  return (
    <div className="everything">
      <div className='main_page'>

      </div>
        <Pannel 
        sort_clothes={sort_clothes} setClothesSortClicked={setClothesSortClicked}
        authorize={authorize} setAuthClicked={setAuthClicked}/>

        <ItemsGrid 
        sort_clothes={sort_clothes} setClothesSortClicked={setClothesSortClicked}
        authorize={authorize} setAuthClicked={setAuthClicked}/>

      <div className='popups'>
        <AuthPopup 
        authorize={authorize} setAuthClicked={setAuthClicked} 
        is_logged={is_logged} setLogged={setLogged}/>
      </div>
        
    </div>
  )
}

export default InterfaceMain;

