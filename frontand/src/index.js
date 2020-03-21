import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import {ConnectedRouter} from 'connected-react-router';
import * as serviceWorker from './serviceWorker';
import App from './App';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {createBrowserHistory} from "history";
import {connectRouter, routerMiddleware} from "connected-react-router";
import reducerUsers from "./Store/Reducers/reducerUsers";
import reducerProducts from "./Store/Reducers/reducerProducts";
import reducerCategories from "./Store/Reducers/reducerCategories";


const saveToLocalStorage = state => {
    try {
        const serializedState = JSON.stringify(state);

        localStorage.setItem('state', serializedState);
    } catch (e) {
        console.log('Could not save state');
    }
};

const loadFromLocalStorage = () => {
    try {
        const serializedState = localStorage.getItem('state');
        if (serializedState === null) {
            return undefined;
        }
        return  JSON.parse(serializedState);
    } catch (e) {
        return undefined;
    }
};


export const history = createBrowserHistory();

const rootReducer = combineReducers({
    router: connectRouter(history),
    users: reducerUsers,
    products: reducerProducts,
    categories: reducerCategories
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middleware = [
    thunkMiddleware,
    routerMiddleware(history)
];

const enhancers = composeEnhancers(applyMiddleware(...middleware));

const persistedSate = loadFromLocalStorage();

const store = createStore(rootReducer, persistedSate, enhancers);

store.subscribe(() => {
    saveToLocalStorage({
        users: {
            user: store.getState().users.user
        }
    });
});

const app = (
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <App/>
        </ConnectedRouter>
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));

serviceWorker.unregister();
