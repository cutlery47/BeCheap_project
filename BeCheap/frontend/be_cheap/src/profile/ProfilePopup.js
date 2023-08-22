import React, {useEffect, useState} from 'react'
import ProfileData from './ProfileData'
import ProfileEdit from './ProfileEdit'

function ProfilePopup(props) {
    //само окно профиля
    let [forms, setForms] = useState(<></>);

    //статус кнопки редактирования
    let [doEdit, setEdit] = useState(false);

    useEffect(() => {
      //проверка на логин
      if (props.User.token == 'None' && props.profile_clicked == true) {
        props.setAuthClicked(true)
      } 
      
      if (doEdit == false) {
        //при нажатии выводим хуйню
        setForms(<ProfileData 
            profile_clicked={props.profile_clicked} setProfileClicked={props.setProfileClicked}
            User={props.User} setUser={props.setUser}
            setEdit={setEdit}
            />);
      } else {
        setForms(<ProfileEdit
          profile_clicked={props.profile_clicked} setProfileClicked={props.setProfileClicked}
          User={props.User} setUser={props.setUser}
          setEdit={setEdit}
        />)
      }
      
    }, [props.profile_clicked, doEdit])

    return (props.profile_clicked) ? (
      <>{forms}</>
    ) : <></>;
}

export default ProfilePopup