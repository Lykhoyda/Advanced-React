import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import reduxThunk from 'redux-thunk';

import Welcome from './components/welcome';
import App from './components/app';
import Signin from './components/auth/signin';
import SignOut from './components/auth/signout';
import Signup from './components/auth/signup';
import Feature from './components/feature';
import RequireAuth from './components/auth/require_auth';
import reducers from './reducers';

// TYPES
import { AUTH_USER } from './actions/types';

// MANAGE STORE
const token = localStorage.getItem('token');
const store = createStore(reducers, composeWithDevTools(
  applyMiddleware(reduxThunk),
));
// if token exist, sign in user
if (token) { store.dispatch({ type: AUTH_USER }) }

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory} >
      <Route path="/" component={App} >
        <IndexRoute component={Welcome} />
        <Route path="signin" component={Signin} />
        <Route path="signout" component={SignOut} />
        <Route path="signup" component={Signup} />
        <Route path="feature" component={RequireAuth(Feature)} />
      </Route>
    </Router>
  </Provider>
  , document.querySelector('.container'));
