import React ,{useState, useEffect} from "react";
import '../styles/ItemsGrid.css'
import Item from './Item'
import arrowImgL from '../media/arrow_left.png'
import arrowImgR from '../media/arrow_right.png'
import Loading from '../templates/Loading'

//наследуем класс от React.Component
function ItemsGrid(props) {
    //==============================ITEMS=DATA===================================
    let [item_data, setItems] = useState();
    let [favorites_data, setFavorites] = useState([]) //пока что для хранения данных буду использовать массив, затем желательно перейти на set
    
    //==============================PAGINATION===================================
    let [currentPage, setCurPage] = useState(1);

    //html кусок одежды
    let [rows, setRows] = useState(null);
  
    //http запрос на получение одежды
    function fetchClothes() {
      return fetch('http://127.0.0.1:8000/api/v1/items/' + currentPage)
      .then(response => {
        console.log('clothes: ' + response.status)
        return response.json()
      })
      .then(data => setItems(prettify_items(data)))
    }
  
    //собираем данные по избранному у юзера и записываем в массив 
    function fetchFavorites() {
      return fetch('http://127.0.0.1:8000/api/v1/' + props.User.name + '/favorites', {
        method: 'GET',
        headers: {
          "Authorization": "Token " + props.User.token,
        }
      })
      .catch(error => {
        console.log(error)
      })
      .then((response) => {
        console.log('favs: ' + response.status)
        return response.json()
      })
      .then((data) => setFavorites(prettify_favorites(data)))
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
        proper_favs.push(dat.id)
      }
  
      return proper_favs
    }
  
    //при перелистывании страниц - запрос на избранное и на одежду (если залогинен)
    //если не залогинен - просто перелистываем страницу
    //я хз, но он все равно отправляет при запуске два запроса на одежду если юзер залогинен
    //проебал весь вечер в попытках пофиксить - нихуя, поэтому оставим пока что
    useEffect(() => {
      //также нужен рендер при выходе из профиля
      if (props.profile_clicked == true) {
        return 
      }

      if (props.User.token != 'None') {
        fetchFavorites().then(fetchClothes())
      } else {
        fetchClothes()
      }
    }, [props.User, currentPage, props.profile_clicked])

    //когда зафетчил одежду - вставляем html кусок
    useEffect(() => {
      if (item_data != undefined) {
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
          obj={proper_objects[i]} 
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

    //экран загрузки пока данные фетчаются
    if (!item_data) {
      return (Loading())
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
                setItems()
                window.scrollTo(0, 0)
              } 
              }}>
            </img>
            <span id='page'>
              {currentPage} 
            </span>
            <img src={arrowImgR} id="btnR" className="page_btn" onClick={() => {
              //перелистывание страницы
              setCurPage(currentPage + 1)
              setItems()
              window.scrollTo(0, 0)}}>
            </img>
          </div>
        </div>
      </div>
    )
}

export default ItemsGrid;