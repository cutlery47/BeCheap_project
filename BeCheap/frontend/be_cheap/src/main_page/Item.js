import React, {useState, useEffect}from 'react'
import '../styles/Item.css'

function Item(props) {
    //состояния кнопки 
    const conditions = ['Add to favorites', 'In favorites!']
    
    //из-за того, что элементы в бд нужно транкейтнуть
    const id_diff = 77 

    //кнопка
    let [favs_btn, setFavsClicked] = useState(false);
    //состояние кнопки
    let [condition, setFavs] = useState(conditions[0]);

    //добавление в избранное по нажатию кнопки
    function addToFavorites(id, token) {
        fetch('http://127.0.0.1:8000/api/v1/items/add/' + id, {
        method: 'POST',
        headers: {
            "Authorization": "Token " + token,
            "Content-type": "application/json; charset=UTF-8",
        }
        }).then((response) => {
            if (response.ok) {
                console.log('fav items added or removed!')
                setFavsClicked(!favs_btn);  
                
                if (condition == conditions[0]) {
                    setFavs(conditions[1])
                } else {
                    setFavs(conditions[0])
                }
                   
            } else {
                console.log("error when adding or removing favorites");
            }
        })
    }

    //при перелистывании страницы смотрим,
    //есть ли товары с новой страницы в избранном
    //если есть - кнопку меняем
    useEffect(() => {
        if (props.favorites_data.includes(props.obj.item_name)) {
            setFavs(conditions[1]);
        } else {
            setFavs(conditions[0]);
        }
    }, [props.item_data])
    
    return (
        <div className='item' id={(props.index) + id_diff}> 
            <a className='item_stuff' href={props.obj.item_link}>
                <div className = "item_image">
                    <img src={props.obj.item_image}/>
                </div>
                <div className="item_descript">
                    <span className='item_txt' id='name'>
                        <b>Name:</b> {props.obj.item_name}
                    </span>
                    <span className='item_txt' id='category'>
                        <b>Category:</b> {props.obj.item_category}
                    </span>
                    <span className='item_txt' id='prices'>
                        <b>Price:</b> {props.obj.item_cur_price} <strike> {props.obj.item_prev_price} </strike>
                    </span>
                </div>
            </a>
            <button className='item_btn' id={"btn_" + (props.index + id_diff)} 
            onClick={() => {
                if (props.User.token == 'None') {
                    //переброс на поле логина
                    props.setAuthClicked(true)
                } else {
                    //если залогинен - збс
                    addToFavorites(props.index + id_diff, props.User.token);
                }
            }}>
                {condition}
            </button>
        </div>
    )
}

export default Item
