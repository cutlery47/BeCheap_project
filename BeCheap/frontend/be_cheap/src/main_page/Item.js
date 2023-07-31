import React, {useState}from 'react'
import '../styles/Item.css'

function Item(props) {
    const conditions = ['🖤', '❤️']

    let [favs_btn, setFavsClicked] = useState(false);
    let [emoji, setEmoji] = useState(conditions[0])
    
    return (
        <div className='item' id={(props.index) + 1}>
            
            <div className = "item_image">
                <img src={props.obj.item_image}/>
            </div>
            <div className="item_descript">
            <span>
                <b>Name:</b> {props.obj.item_name}
            </span>
            <span>
                <b>Category:</b> {props.obj.item_category}
            </span>
            <span>
                <b>Price:</b> {props.obj.item_cur_price} <strike> {props.obj.item_prev_price} </strike>
                <button id={"btn_" + (props.index + 1)} onClick={() => {
                    setFavsClicked(!favs_btn);

                    if (emoji == conditions[0]) {
                        setEmoji(conditions[1]);
                    } else {
                        setEmoji(conditions[0]);
                    }
                }}>

                <b>
                    {emoji}
                </b>
                </button>
            </span>
            </div>
        </div> 
        )
}

export default Item
