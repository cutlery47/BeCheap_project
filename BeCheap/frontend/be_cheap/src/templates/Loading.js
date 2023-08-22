import React from 'react'
import ReactLoading from 'react-loading'
import '../styles/Loading.css'

function Loading() {
  return (
    <div className='loading_scrn'>
        <ReactLoading type='balls' color='0000FF'
        height={100} width={100}/> 
    </div>
  )
}

export default Loading