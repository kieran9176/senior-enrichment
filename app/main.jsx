import React from 'react';
import Home from './components/Home';
// import CampusList from './components/CampusList';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux'
import store from './store'

ReactDOM.render (
    <Provider store={store}>
        <Router>
            <Home />
        </Router>
    </Provider>,
    document.getElementById('main')
);