import React ,{useState, useEffect, useCallback} from "react";
import '../styles/ItemsGrid.css'
import _ from 'lodash'
import Item from './Item'
import arrowImgL from '../media/arrow_left.png'
import arrowImgR from '../media/arrow_right.png'

//наследуем класс от React.Component
function ItemsGrid(props) {
  //==============================ITEMS=DATA===================================
  let [item_data, setItems] = useState([]);
  let [rows, setRows] = useState(null);
  
  //==============================PAGINATION===================================
  let [currentPage, setCurPage] = useState(1);

  function fetchData() {
      //берем данные с сервака и обноваляем данные для каждого Item
      fetch('http://127.0.0.1:8000/api/v1/items/' + currentPage)
      .then(response => response.json())
      .then((data)=> setItems(hz_kak_nazvat(data)));
  }

  //конвертируем непонятную хуету в понятную хуету
  function hz_kak_nazvat(data) {
    const proper_objects = [];

    for (const dat of data) {
      let info = new Object();
      Object.assign(info, dat);
      proper_objects.push(info) 
    }

    return proper_objects;
  }


  function render_items(proper_objects) {
    //для каждого объекта создаю html блок
    let rows = []

    //проверка, чтобы при инициализации предметы не начинали добавляться (еще не успели зафетчиться)
    if (proper_objects.length != 0) {
      for (let i = 0; i < proper_objects.length; i += 1) {
        rows.push(
          <Item 
          index={(currentPage - 1) * 20 + i} obj={proper_objects[i]} 
          authorize={props.authorize} setAuthClicked={props.setAuthClicked}
          User={props.User} setUser={props.setUser}
          currentPage={currentPage} setCurPage={setCurPage}/>
        )
    }
    }
    
    return rows;
    }

    //метод, который вызывает фетч сразу после рендеринга компонента
    //вторым аргументом возвращаю dependency array
    //это значит что данные фетчаются только при первом рендере (иногда вызывает ошибку -- хз)
    useEffect(() => {
      setRows(render_items(item_data));
    }, [item_data, props.User]); 

    //при изменении данных одежды или юзера - ререндерим
    useEffect(() => {
      fetchData();
    }, [currentPage]);

    //при изменении значения is_sorted - меняем значения Items и рендерим
    // useEffect(() => {
    //     setItems(_.sortBy(item_data, 'item_name'))
    // }, [props.sort_clothes])

    return (
      <div className="clothing">
        {rows}
        <div className="page_conts">
          <span>
            Page {currentPage}
          </span>
          <div className="page_btns">
            
            <img src={arrowImgL} id="btnL" className="page_btn" onClick={() => {
              if (currentPage > 1) {
                setCurPage(currentPage - 1)
              } 
              }}>
            </img>
            <img src={arrowImgR} id="btnR" className="page_btn" onClick={() => setCurPage(currentPage + 1)}>
            </img>
          </div>
        </div>
      </div>
    )
}

export default ItemsGrid;