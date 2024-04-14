import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { applyMiddleware, compose,  legacy_createStore } from 'redux'; // Note: replaced legacy_createStore with createStore
import thunk from 'redux-thunk';

import { reducers } from './reducers';
import App from './App';
import './index.css';

// Note: removed legacy_createStore and replaced it with createStore
const store = legacy_createStore(reducers, compose(applyMiddleware(thunk)));

// Use createRoot instead of ReactDOM.render
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
