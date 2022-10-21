import React from 'react';
import './resources/css/index.css'
import ReactDOM from 'react-dom/client';
import App from './App';
import store from './store';
import { Provider } from 'react-redux';
import {  BrowserRouter as Router  } from 'react-router-dom';
store.subscribe( () => console.log( store.getState() ) );
const root = ReactDOM.createRoot( document.getElementById( 'root' ) );
root.render(
    <React.StrictMode>
        <Router >
            <Provider store = { store } >
                <App />
            </Provider>
        </Router >
    </React.StrictMode>
);
