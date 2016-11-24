import React, { Component } from 'react'


export default class SideMenu extends Component {
	constructor(props) {
		super(props);
		this.state = {
			sites: []
		}
		this.get_sites = this.get_sites.bind(this)();
	}
	get_sites() {
		var self = this;
		var headers = new Headers();
		headers.append("Authorization", "Token " + localStorage.token);
		console.log("auth:", headers.get("Authorization"))
		var request = new Request(
			'http://54.194.155.176/api/v1/sites/', 
			{
				method: "GET", 
			 	headers: headers
		    });

		fetch(request)
			  .then(function(response) {
			  	console.log('then1:', response)
			    return response.json();
			   })
			  .then(function(objects) {
			  		console.log('then2:', objects)
			  		self.setState({
			  			sites: objects
			  		})
			  		self.props.getSelectedSite(objects[0]);
			  	});
	}
	onSiteSelect(site) {
		console.log("site selected:", site)
		this.props.getSelectedSite(site);
	}
	render() {
		var self = this;
		return (
			<div className="sidebar">
				<ul>
					{this.state.sites.map(function(site, i) {
						return <li key={i} onClick={self.onSiteSelect.bind(self, site)}><i className="fa fa-globe" aria-hidden="true"></i><a>Site {site.id}</a></li>
					})}
				</ul>
			</div>
		);
	}
}