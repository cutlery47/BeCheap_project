import React, {useEffect, useState} from 'react'
import '../styles/ProfileItem.css'

function ProfileItem(props) {

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
        </div>
  )
}

export default ProfileItem