import React ,{useState, useEffect} from "react";
import '../styles/ItemsGrid.css'
import _ from 'lodash'
import Item from './Item'

//наследуем класс от React.Component
function ItemsGrid(props) {

  let [item_data, setItems] = useState([]);
  let [rows, setRows] = useState(null);
  // let [favorites, setFavs] = useState([]);
  
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
    const rows=proper_objects.map((obj, index)=>
      <Item index={index} obj={obj}/>
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
    }, [props.sort_clothes])

    return (
      <div className="clothing">
        {rows}
      </div>
    )
}

export default ItemsGrid;