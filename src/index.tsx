import { createBrowserHistory } from 'history';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import App from './App';
import 'semantic-ui-css/semantic.min.css'
import React from 'react';
import { Provider } from 'react-redux';
import store from './store/store';


const history = createBrowserHistory()

ReactDOM.render(
  <Router history={history}>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>,
  document.getElementById('root')
);


