import React from 'react';
import ReactDOM from 'react-dom';
import './normalize.css';
import './reset.css';
import App from './App';
import Home from './components/Home/Home';
import Beer from './components/Beer/Beer';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter as Router, Route} from 'react-router-dom';

ReactDOM.render((
    <Router>
        <App>
            <Route exact path="/" component={Home} />
            <Route path="/beer/:id" component={Beer}/>
        </App>
    </Router>
), document.getElementById('root'));
registerServiceWorker();
