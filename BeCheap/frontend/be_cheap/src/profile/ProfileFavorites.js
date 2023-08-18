import React, { useEffect, useState } from 'react'
import ProfileItem from './ProfileItem';
import '../styles/ProfileFavorites.css'
import arrowImgL from '../media/arrow_left.png'
import arrowImgR from '../media/arrow_right.png'

function ProfileFavorites(props) {
  //массив с избранными товарами для юзера
  let [favorites, setFavorites] = useState([]);
  //html-блок с одеждой
  let [clothes, setClothes] = useState(<></>)
  //страница компонента
  let [favsPage, setFavsPage] = useState(1)

  //при открытии профиля - сразу фетч избранного
  useEffect(() => {
    fetchData();
  }, [props.profile_clicked])

  //обновляем одежду после получения данных
  useEffect(() => {
    setClothes(render_items(favorites))
  }, [favorites, favsPage])

  //запрос на избранное
  function fetchData() {
    if (props.User.name != 'None') {
      const url = 'http://127.0.0.1:8000/api/v1/' + props.User.name + '/favorites'
      fetch(url, {
        method: 'GET',
        headers: {
          "Authorization": "Token " + props.User.token,
          "Content-type": "application/json; charset=UTF-8", 
        }
      }).then((response) => {
        if (response.ok) {
          return response.json()
        } else {
          console.log(response)
        }
      }).then((data) => {
        setFavorites(hz_kak_nazvat_2(data))
    })
    }
  }

  //преобразование непонятнй хуйни в понятную (Javascript moment num. 2)
  function hz_kak_nazvat_2(data) {
    const proper_objects = [];

    for (const dat of data) {
      let info = new Object();
      Object.assign(info, dat);
      proper_objects.push(info) 
    }

    return proper_objects;
  }

  //выведение одежды
  function render_items(proper_objects) {
    //для каждого объекта создаю html блок
    let rows = []
    const items_on_page = 3


    //проверка, чтобы при инициализации предметы не начинали добавляться (еще не успели зафетчиться)
    if (proper_objects.length != 0) {
      for (let i = (favsPage - 1) * items_on_page; i < items_on_page * favsPage; i += 1) {
        if (proper_objects[i] != undefined) {
          rows.push(
            //товар
            <ProfileItem
            index={i} obj={proper_objects[i]}
            />
          )
        }
      }
    }
    
    return rows;
    }

  return (
    <>
    <div className='fav_clothes'>
     {clothes}
    </div>
    <div className='items_scroll'>
      <img src={arrowImgL} id='img_1' onClick={() => {
        if (favsPage > 1)
          setFavsPage(favsPage - 1);
      }}>
      </img>
      <img src={arrowImgR} id='img_2' onClick={() => {
        if (favsPage < Math.ceil(favorites.length / 3))
          setFavsPage(favsPage + 1);
      }}>
      </img>
    </div>

    <img className='btn'>
    
    </img>
    </>
  )
}

export default ProfileFavorites