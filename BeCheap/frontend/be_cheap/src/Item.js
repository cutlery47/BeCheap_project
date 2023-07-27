import React from "react";
import './Item.css'

//��������� ����� �� React.Component
class Item extends React.Component{
    constructor() {
        //����������� ������ �������� (��� � ������� ��� React.Component)
        super();
        //������, �� ����� ��� state
        //������ ������ ����� ������ �������� ������...
        //��������� �����������
        this.state = {
            item_data: []
        }
    }

    fetchData() {
        //����� ������ � ������� � ���������� ������ ��� ������� Item
        fetch('http://127.0.0.1:8000/api/v1/items/').then(response=>response.json())
        .then((data)=>{
            this.setState({
                item_data:data
            });
        });
    }

    //�����, ������� �������� ���� ����� ����� ���������� ����������
    componentDidMount() {
        this.fetchData();
    }

    //render - �����, ������������ ���������� React.Component-������� (� ��� ��� Item)
    //�� ���� ������ �������� �����
    render() {
        
        return (
            <div className = "item">
                <style>
                    <link rel="stylesheet" href="Item.css" type="text/css"/>
                </style>
              <div className = "item_image">
                <img src="https://media.endclothing.com/media/f_auto,q_auto:eco,w_1600/prodmedia/media/catalog/product/1/0/10-03-23-TC_125BT222010F_1_1.jpg">
                </img>
              </div>
              <div className = "item_descript">
                <span className = "item_name">
                  name
                </span>
                <span className = "item_color">
                  color
                </span>
                <span className = "item_price_new">
                  new price:
                </span>
                <span className = "item_price_prev">
                  prev price:
                </span>
                <span className = "item_sale">
                  sale:
                </span>
              </div>
            </div>
        );
    }
}

export default Item;