import { createBrowserHistory } from 'history';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import App from './App';
import 'semantic-ui-css/semantic.min.css'

const history = createBrowserHistory()

ReactDOM.render(
    <Router history={history}>
      <App />
    </Router>,
  document.getElementById('root')
);


