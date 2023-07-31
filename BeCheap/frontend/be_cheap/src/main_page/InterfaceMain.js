import React, { useEffect, useState } from 'react'
import ItemsGrid from './ItemsGrid'
import Pannel from './Pannel'

function InterfaceMain() {

  //state-переменные, которые хранят состояния кнопок (нажаты/нет)
  //передаем их в младшие компоненты
  let [is_sorted, setSortClicked] = useState(false);
  let [is_authorized, setAuthClicked] = useState(false);

  return (
    <div className="everything">
        <Pannel 
        is_sorted={is_sorted} setSortClicked={setSortClicked}
        is_authorized={is_authorized} setAuthClicked={setAuthClicked}/>

        <ItemsGrid 
        is_sorted={is_sorted} setSortClicked={setSortClicked}
        is_authorized={is_authorized} setAuthClicked={setAuthClicked}/>
    </div>
  )
}

export default InterfaceMain;

