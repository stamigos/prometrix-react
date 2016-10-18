import React, { Component } from 'react'


export default class Login extends Component {
	constructor(props) {
		super(props);
		this.state = this.getState()
	}
	getState() {
		return {
			username: "",
			password: "",
			remember: false,
			erros: false
		}
	}
	onChange(e) {
		console.log("changed!")
	    var state = {};
    	state[e.target.name] = e.target.value;
    	this.setState(state);
	}
	onSubmit(e) {
		var self = this;
		e.preventDefault();
		var headers = new Headers();
		headers.append('Content-Type', 'application/json');
		var request = new Request(
			'http://127.0.0.1:8000/api/v1/rest-auth/login/', 
			{
				method: "POST", 
			 	headers: headers,
			 	body: JSON.stringify({
			 		username: this.state.username,
			 		password: this.state.password
			 	})
		    });

		fetch(request)
			  .then(function(response) {
			  	console.log('then1:', response)
			    return response.json();
			   })
			  .then(function(obj) {
			  		if (obj.hasOwnProperty('key')) {
				  		localStorage.token = obj.key
			  			window.location.reload()
			  		}
			  		console.log('then2:', obj)
			  	});
	}
	render() {
		return (
			<div>
				<div className="logo-wrapper">
					<img src={require("../img/logo.png")}/>
				</div>
				<div className="login-wrapper">
					<span>Log In/Sign In</span>
					<div className="login-block">
						<form onSubmit={this.onSubmit.bind(this)} method="POST">
							<label htmlFor="username" className="Username">User Name</label>
							<input id="username" name="username" placeholder="Enter user name" onChange={this.onChange.bind(this)} />
							<label htmlFor="password" className="Password">Password</label>
							<input id="password" type="password" name="password" placeholder="Enter password" onChange={this.onChange.bind(this)} />
							<div className="remember-me">
								<input type="checkbox" id="remember" className="remember" />
								<label htmlFor="remember">Remember me</label>
							</div>
							<div className="forgot-password">
								<a href="#">Forgot password?</a>
							</div>
							<div className="submit-wrapper">
								<input type="submit" value="Login" />
							</div>
						</form>
					</div>
				</div>
			</div>
		);
	}
}