import React, {useState, useEffect}from 'react'
import '../styles/Item.css'

function Item(props) {
    const conditions = ['Add to favorites', 'In favorites!']
    //из-за того, что элементы в бд нужно транкейтнуть
    const id_diff = 77 

    let [favs_btn, setFavsClicked] = useState(false);
    let [condition, setFavs] = useState(conditions[0]);
    let [loaded, setLoaded] = useState(false);

    useEffect(() => {
        setLoaded(false);
        
        if (props.User.favorites.has(String(props.index + id_diff))) {
            setFavs(conditions[1]);
            setFavsClicked(true);
        } else {
            setFavs(conditions[0]);
            setFavsClicked(false);
        }
    }, [props.currentPage])

    function editCSS() {
        if (loaded == false) {
            const btn = document.getElementById('btn_' + String(props.index + id_diff))
            
            if (btn == null) {
                return
            }

            if (favs_btn === true) {
                // console.log('in truers: ' + String(props.index))
                document.getElementById('btn_' + String(props.index + id_diff)).style.cssText = "background-color: white; color: black;"
                setLoaded(true);
            } else if (favs_btn === false) {
                // console.log('in falsers: ' + String(props.index))
                document.getElementById('btn_' + String(props.index + id_diff)).style.cssText = "background-color: black; color: white;"
                setLoaded(true);
            }
        }
    
    }

    function addToFavorites(id, token) {
        fetch('http://127.0.0.1:8000/api/v1/items/add/' + id, {
        method: 'POST',
        headers: {
            "Authorization": "Token " + token,
            "Content-type": "application/json; charset=UTF-8",
        }
        }).then((response) => {
            if (response.ok) {
                setFavsClicked(!favs_btn);

                if (condition == conditions[0]) {
                    setFavs(conditions[1]);
                } else {
                    setFavs(conditions[0]);
                }

                const obj = Object();
                Object.assign(obj, props.User)
                

                if (favs_btn == false) {
                    if (obj.favorites.has("None")) {
                        obj.favorites.delete("None")
                    }
                    obj.favorites.add(String(id));

                    document.getElementById('btn_' + id).style.cssText = "background-color: white; color: black;"

                } else {
                    obj.favorites.delete(String(id));
                    if (obj.favorites.size == 0) {
                        obj.favorites.add("None");
                    }

                    document.getElementById('btn_' + id).style.cssText = "background-color: black; color: white;"
                   
                }

                props.setUser(obj)
            } else {
                console.log("error");
            }
        })
    }
    
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
                    props.setAuthClicked(true)
                } else {
                    addToFavorites(props.index + id_diff, props.User.token);
                }
            }}>
                
                {editCSS()}
                {condition}
            </button>
        </div>
    )
}

export default Item
