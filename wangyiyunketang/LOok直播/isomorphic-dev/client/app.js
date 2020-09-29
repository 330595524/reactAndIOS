import React from 'react';
import ReactDOM from 'react-dom';
import { hot } from 'react-hot-loader/root';
import { Provider } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import { loadableReady } from '@loadable/component';
import Approutes from './routes';
import createStore from './store';
import './app.less';

const store = createStore(window.CURRENT_STATE);
const App = () => (
    <Provider store={store}>
        <BrowserRouter>
            <HelmetProvider>
                <Approutes />
            </HelmetProvider>
        </BrowserRouter>
    </Provider>
);
const HotApp = hot(App);

loadableReady(() => {
    ReactDOM.hydrate(
        <HotApp />,
        document.getElementById('j-app')
    );
});