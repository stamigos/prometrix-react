import React, { Component } from 'react'
import { Link } from 'react-router';

export default class Header extends Component {
	render() {
		return (
			<header>
				<img src={require("../img/logo-horizontal.png")}/>
				<div className="right-panel">
					<Link to="logout" className="logout">Log out<i className="fa fa-sign-out" aria-hidden="true"></i></Link>
					<a className="settings">Settings<i className="fa fa-cog" aria-hidden="true"></i></a>
				</div>
			</header>
		);
	}
}