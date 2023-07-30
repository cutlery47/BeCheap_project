import React from "react";
import {useState, useEffect} from "react";
import './Item.css'
import _ from 'lodash'

//наследуем класс от React.Component
function Item(props) {

  let [item_data, setItems] = useState([]);
  let [rows, setRows] = useState(null);

  function fetchData() {
      //берем данные с сервака и обноваляем данные для каждого Item
      fetch('http://127.0.0.1:8000/api/v1/items/').then(response=> response.json())
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
    const rows=proper_objects.map((obj)=>
    <div className='item'>
        <div className = "item_image">
              <img src={obj.item_image}/>
        </div>
        <div className="item_descript">
        <span>
            <b>Name:</b> {obj.item_name}
          </span>
          <span>
            <b>Category:</b> {obj.item_category}
          </span>
          <span>
            <b>Price:</b> {obj.item_cur_price} <strike> {obj.item_prev_price} </strike>
          </span>
        </div>
    </div>
    )

      return rows;
    }

    //метод, который вызывает фетч сразу после рендеринга компонента
    //вторым аргументом возвращаю dependency array
    //это значит что данные фетчаются только при первом рендере (иногда вызывает ошибку -- хз)
    useEffect(() => {
      fetchData();
    }, []); 

    //при изменении данных одежды - ререндерим
    useEffect(() => setRows(render_items(item_data)), [item_data]);

    //при изменении значения is_sorted - меняем значения Items и рендерим
    useEffect(() => {
        setItems(_.sortBy(item_data, 'item_name'))
    }, [props.is_sorted])

    return (
      <div className="clothing">
        {rows}
      </div>
    )
}

export default Item;