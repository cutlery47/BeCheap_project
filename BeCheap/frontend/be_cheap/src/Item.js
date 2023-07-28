import React from "react";
import './Item.css'

//наследуем класс от React.Component
class Item extends React.Component{
    constructor() {
        //конструктор класса родителя (как я понимаю это React.Component)
        super();
        //честно, хз нахуй тут state
        //почему нельзя юзать просто параметр класса...
        //предстоит разобраться
        this.state = {
            item_data: []
        }

        this.info = new Object
    }

    fetchData() {
        //берем данные с сервака и обноваляем данные для каждого Item
        fetch('http://127.0.0.1:8000/api/v1/items/').then(response=> response.json())
        .then((data)=>{
            this.setState({
                item_data:data
            });
        });
    }

    //метод, который вызывает фетч сразу после рендеринга компонента
    componentDidMount() {
        this.fetchData();
    }

    //render - метод, возвращающий содержание React.Component-объекта (у нас это Item)
    //ну типо просто рендерит хуету
    render() {
      const allData = this.state.item_data;
      let proper_objects = []

      for (const data of allData) {
        let info = new Object;
        Object.assign(info, data);
        proper_objects.push(info) 
      }
      
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
        return (
          <div class="clothing">
            <style>
               <link rel="stylesheet" href="Item.css" type="text/css"/>
            </style>
            {rows}
          </div>
        );
    }
}

export default Item;