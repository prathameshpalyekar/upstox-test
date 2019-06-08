/* global document */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { PersistGate } from 'redux-persist/es/integration/react';
import configureStore from './store';
import Routes from './routes/index';

const { persistor, store } = configureStore();

const Root = () => (
    <Provider store={store}>
        <PersistGate persistor={persistor}>
            <Router>
                <Routes />
            </Router>
        </PersistGate>
    </Provider>
);

ReactDOM.render(<Root />, document.getElementById('app'));
