import React from 'react';
import ReactDOM from 'react-dom/client';
import App from "./main_page/InterfaceMain"

//тут создается root элемент React DOM
//React DOM - это объект, который заменяет какой-то кусок исходного DOM (как я понял)
//под root элементом находятся все элементы которые может поменять React DOM
//и типо мы создали root и затем под ним вставляем и рендерим наши React Apps на страницу
//возможно я не прав
//https://blog.logrocket.com/virtual-dom-react
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  //тут стоял strict mode но нахуй надо я считаю...
    <App/>
);
