import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import Provider from './lib/react-redux-2/provider'
import store from './store'
function render() {
  ReactDOM.render(
    <Provider store={store}>
      <div>
        <App/>
      </div>
    </Provider>, document.getElementById('root'));
}

render()
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
