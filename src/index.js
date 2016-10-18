import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import App from './pages/App'
import Index from './pages/IndexPage'
import Login from './pages/Login'
import Logout from './pages/Logout'

import './css/index.css';

const root = document.getElementById('root')

function requireAuth(nextState, replace) {
	var loggedIn = (!!localStorage.token);
	  if (!loggedIn) {
	    replace({
	      pathname: '/login',
	      state: { nextPathname: nextState.location.pathname }
	    })
	  }
}
function afterLogin(nextState, replace) {
	var loggedIn = (!!localStorage.token);
	  if (loggedIn) {
	    replace({
	      pathname: '/',
	      state: { nextPathname: nextState.location.pathname }
	    })
	  }
}

ReactDOM.render(
	<Router history={hashHistory}>
		<Route path="/" component={App}>
			<IndexRoute component={Index} onEnter={requireAuth}></IndexRoute>
			<Route path='login' component={Login} onEnter={afterLogin}></Route>
			<Route path='logout' component={Logout} onEnter={requireAuth}></Route>
		</Route>
	</Router>,
  root);
