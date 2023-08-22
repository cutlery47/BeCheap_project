import React, {useEffect, useState} from 'react'
import '../styles/ProfileData.css'
import MyButton from '../templates/MyButton';

function ProfileItem(props) {
    //состояния кнопки 
    const conditions = ['Add to favorites', 'In favorites!']

    //кнопка
    let [favs_btn, setFavsClicked] = useState(false);
    //состояние кнопки
    let [condition, setFavs] = useState(conditions[1]);

    function addToFavorites() {
        fetch('http://127.0.0.1:8000/api/v1/items/add/' + props.obj.id, {
        method: 'POST',
        headers: {
            "Authorization": "Token " + props.User.token,
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

    return (
        <div className='pr_item' id={props.index}> 
            <a className='pr_item_stuff' href={props.obj.item_link}>
                <div className = "pr_item_image">
                    <img src={props.obj.item_image}/>
                </div>
                <div className="pr_item_descript">
                    <span className='pr_item_txt' id='name'>
                        {props.obj.item_name}
                    </span>
                </div>
            </a>
            <MyButton id={props.obj.id} onClick={addToFavorites} text={condition} style={favoritesBtnStyle}/>
        </div>
  )
}

const favoritesBtnStyle = {
    'margin-top': '5px',
    'height': '15px',
    'font-size': '10px',
    'min-width': '90%',
    'padding-bottom': '2px,'
}

export default ProfileItem