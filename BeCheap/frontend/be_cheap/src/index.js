import React from 'react';
import ReactDOM from 'react-dom/client';
import App from "./InterfaceMain"

//��� ��������� root ������� React DOM
//React DOM - ��� ������, ������� �������� �����-�� ����� ��������� DOM (��� � �����)
//��� root ��������� ��������� ��� �������� ������� ����� �������� React DOM
//� ���� �� ������� root � ����� ��� ��� ��������� � �������� ���� React Apps �� ��������
//�������� � �� ����
//https://blog.logrocket.com/virtual-dom-react
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>
);
