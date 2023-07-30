import React, { useEffect, useState } from 'react'
import Item from './Item'
import Pannel from './Pannel'

function InterfaceMain() {

  //����������, ������� ������ ��������� ������ (������/���)
  //�������� �� � ������� ����������
  let [is_sorted, setSortClicked] = useState(false);

  return (
    <div className="everything">
        <Pannel is_sorted={is_sorted} setSortClicked={setSortClicked}/>
        <Item is_sorted={is_sorted} setSortClicked={setSortClicked}/>
    </div>
  )
}

export default InterfaceMain;
