import React from 'react';
import ReactDOM from 'react-dom'
import './index.css';
import App from './App';
import List from './List'
import reportWebVitals from './reportWebVitals';
import {BrowserRouter as Router, Route} from 'react-router-dom'

const Routing = (
    <Router>
        <Route exact path='/' component={App}/>
        <Route exact path='/list-2021' component={List}/>
    </Router>
)
ReactDOM.render(Routing, document.getElementById('root'))
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
