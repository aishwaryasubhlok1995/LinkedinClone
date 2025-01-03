

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import reducer from './redux/reducers/reducer';
import {compose} from  "redux";

import { createStore} from 'redux';

//import Provider from react-redux
import {Provider} from 'react-redux';

//create a store and pass reducer as an argument
const store = createStore(reducer,
    
    compose(
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()
    )
);

//render App component on the root element
ReactDOM.render(<Provider store = {store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
