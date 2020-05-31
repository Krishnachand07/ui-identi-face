import React, { Component, Fragment } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './Components/NavBar';

import { Provider } from 'react-redux';
import store from './store';
import Register from './Components/auth/Register';
import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import Home from './Home';
import Login from './Components/auth/Login';
import Admin from './Components/auth/Admin';
import AddProfile from './Components/auth/AddProfile';

class App extends Component {
	renderRoutes = () => {
		if (window.localStorage.getItem('token')) {
			return (
				<Fragment>
					<Route path="/" exact component={Home} />
					<Route path="/admin" component={Admin} />
					<Route path="/profile" component={AddProfile} />
					<Redirect to="/admin" />
				</Fragment>
			);
		} else {
			return (
				<Fragment>
					<Route path="/" exact component={Home} />
					<Route path="/register" component={Register} />
					<Route path="/login" component={Login} />
					<Redirect to="/" />
				</Fragment>
			);
		}
	};
	render() {
		return (
			<div className="App">
				<Provider store={store}>
					<Router>
						<NavBar />
						<Switch>{this.renderRoutes()}</Switch>
					</Router>
				</Provider>
			</div>
		);
	}
}

export default App;
