import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import { productReducer } from './store/reducers/product';
import { composeWithDevTools } from 'redux-devtools-extension';
import { orderReducer } from './store/reducers/order';
import { userReducer } from './store/reducers/user';
import { BrowserRouter } from 'react-router-dom';

const myX = createStore(combineReducers({ ord: orderReducer,user:userReducer, prod: productReducer }), composeWithDevTools())
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <Provider store={myX}>
      <App />
    </Provider></BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
