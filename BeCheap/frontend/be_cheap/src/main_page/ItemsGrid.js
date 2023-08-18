import React ,{useState, useEffect} from "react";
import '../styles/ItemsGrid.css'
import Item from './Item'
import arrowImgL from '../media/arrow_left.png'
import arrowImgR from '../media/arrow_right.png'

//наследуем класс от React.Component
function ItemsGrid(props) {
    //==============================ITEMS=DATA===================================
    let [item_data, setItems] = useState([]);
    let [favorites_data, setFavorites] = useState([]) //пока что для хранения данных буду использовать массив, затем желательно перейти на set
    //переменные, чтобы понимать, когда товары и избранное зафетчены (Я БЛЯТЬ НЕНАВИЖУ АСИНХРОННОЕ ПРОГРАММИРОВАНИЕ)
    let [favs_loaded, setFavsLoaded] = useState(false) 
    let [items_loaded, setItemsLoaded] = useState(false)
    
    //==============================PAGINATION===================================
    let [currentPage, setCurPage] = useState(1);

    //html кусок одежды
    let [rows, setRows] = useState(null);
  
    //http запрос на получение одежды
    function fetchClothes() {
      return fetch('http://127.0.0.1:8000/api/v1/items/' + currentPage)
      .then((response) => {
        if (response.ok) {
          console.log('clothes fetched!')
          return response.json()
        } else {
          console.log('error when fetching clothes data')
        }
      })
      .then((data) => setItems(prettify_items(data)))
      .then(setItemsLoaded(true)) //надо, чтобы правильно работали асинхронные запросы
    }
  
    //собираем данные по избранному у юзера и записываем в массив 
    function fetchFavorites() {
      fetch('http://127.0.0.1:8000/api/v1/' + props.User.name + '/favorites', {
        method: 'GET',
        headers: {
          "Authorization": "Token " + props.User.token,
        }
      })
      .then((response) => {
        if (response.ok) {
          console.log('favs fetched!')
          return response.json()
        } else {
          console.log('error when fetching favorites data')
        }
      })
      .then((data) => setFavorites(prettify_favorites(data)))
      .then(setFavsLoaded(true))
    }
  
    //конвертируем непонятную хуету в понятную хуету (Javascript moment num. 1)
    function prettify_items(data) {
      const proper_objects = [];
  
      for (const dat of data) {
        let info = new Object();
        Object.assign(info, dat);
        proper_objects.push(info) 
      }
      
      return proper_objects;
    }
  
  
    //от избранного берем только имена, т.к. они уникальные
    function prettify_favorites(data) {
      const proper_favs = []
  
      for (const dat of data) {
        proper_favs.push(dat.item_name)
      }
  
      return proper_favs
    }
  
    //при перелистывании страниц - запрос на избранное и на одежду (если залогинен)
    //если не залогинен - просто перелистываем страницу
    useEffect(() => {
      if (props.User.token !== 'None') {
        fetchFavorites()
      } else {
        fetchClothes()
      }
    }, [props.User, currentPage])


    //когда зафетичил избранное - фетч одежды
    useEffect(() => {
      if (favs_loaded !== false) {
        fetchClothes()
      }
    }, [favorites_data])


    //когда зафетчил одежду - вставляем html кусок (СУКА Я БЛЯТЬ ГЕНИЙ (делал это часов 10))
    useEffect(() => {
      if (items_loaded !== false) {
        setRows(render_items(item_data))
      }
    }, [item_data])


    //пихаю в html-кусок данные одежды и вывожу
    function render_items(proper_objects) {
      //для каждого объекта создаю html блок
      let rows = []

      for (let i = 0; i < proper_objects.length; i += 1) {
        rows.push(
          <Item 
          index={(currentPage - 1) * 20 + i} obj={proper_objects[i]} 
          authorize={props.authorize} setAuthClicked={props.setAuthClicked}
          User={props.User} setUser={props.setUser}
          // currentPage={currentPage} setCurPage={setCurPage}
          favorites_data={favorites_data} setFavorites={setFavorites}
          // items_loaded={items_loaded}
          item_data={item_data}/>
        )
      }
      
      return rows;
    }

    return (
      <div className="clothing">
        {rows}
        <div className="page_conts">
          <div className="page_btns">
            
            <img src={arrowImgL} id="btnL" className="page_btn" onClick={() => {
              // перелистывание страницы
              if (currentPage > 1) {
                setCurPage(currentPage - 1)
                window.scrollTo(0, 0)
              } 
              }}>
            </img>
            <img src={arrowImgR} id="btnR" className="page_btn" onClick={() => {
              //перелистывание страницы
              setCurPage(currentPage + 1)
              window.scrollTo(0, 0)}}>
            </img>
          </div>
        </div>
      </div>
    )
}

export default ItemsGrid;