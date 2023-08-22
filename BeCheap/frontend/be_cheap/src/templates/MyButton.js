import React from 'react'
import '../styles/MyButton.css'

//решил создать свою кнопку
//реюзабельная и универсальная
function MyButton(props) {
  return (
    <button className='MyBtn' id={props.id} type='primary' size='small' style={props.style} onClick={() => props.onClick(props.onClickVal)}>
      {props.text}
    </button>
  )
}

export default MyButton