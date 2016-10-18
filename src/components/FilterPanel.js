import React, { Component } from 'react'


export default class FilterPanel extends Component {
	constructor(props) {
		super(props);
		this.state = {
			site: null,
			lightActive: false,
			alarmZoneActive: false,
			firstSelected: null,
			selectedAlarmZone: null,
			alarm_zones: []
		}
		this.get_alarm_zones = this.get_alarm_zones.bind(this);
	}
	get_alarm_zones(site) {
		var self = this;
		var headers = new Headers();
		headers.append("Authorization", "Token " + localStorage.token);
		console.log("auth:", headers.get("Authorization"))
		var request = new Request(
			'http://127.0.0.1:8000/api/v1/sites/'+site.id+'/alarm_zones/', 
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
			  		if (objects.hasOwnProperty('detail')) {
				  		self.setState({
				  			alarm_zones: [],
				  			selectedAlarmZone: objects[0]
				  		})
			  		}
			  		self.setState({
			  			alarm_zones: objects,
			  			selectedAlarmZone: objects[0]
			  		})
			  	});
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.site != this.props.site) {
			this.get_alarm_zones(nextProps.site)
			this.setState({
				site: nextProps.site
			})
		}
	}
	onLightClick() {
		this.setState({
			lightActive: !this.state.lightActive
		})
	}
	onAlarmZoneClick() {
		this.setState({
			alarmZoneActive: !this.state.alarmZoneActive
		})
	}
	onAlarmZoneSelect(alarm_zone) {
		console.log("alarm_zone selected:", alarm_zone)
		this.setState({
			selectedAlarmZone: alarm_zone
		})
	}
	render() {
		var self = this;
		return (
			<div className="filter-panel">
				<div className="site-name">
					{this.state.site ? (<span>Site {this.state.site.id}</span>) : (<span></span>)}
				</div>
				<div className="filters">
					<div className="filter-label">
						<span>Lights:</span>
					</div>
					<div id="dd5" onClick={this.onLightClick.bind(this)} className={this.state.lightActive ? ("wrapper-dropdown-3 active"):("wrapper-dropdown-3")} tabIndex="1">
						<span>Light 1</span>
						<ul className="dropdown">
							<li><a href="#">Light 1</a></li>
							<li><a href="#">Light 2</a></li>
							<li><a href="#">Light 3</a></li>
						</ul>
					</div>
					<div className="filter-label">
						<span>Alarm zones:</span>
					</div>
					<div id="dd1" onClick={this.onAlarmZoneClick.bind(this)} className={this.state.alarmZoneActive ? ("wrapper-dropdown-3 active"):("wrapper-dropdown-3")} tabIndex="1">
						{this.state.selectedAlarmZone ? <span>Alarm Zone {this.state.selectedAlarmZone.id}</span> : <span>Not selected</span>}
						<ul className="dropdown">
							{this.state.alarm_zones.map(function(alarm_zone, i) {
								return <li key={i} onClick={self.onAlarmZoneSelect.bind(self, alarm_zone)}><a href="#">Alarm zone {alarm_zone.id}</a></li>
							})}
						</ul>
					</div>
					<div className="filter-label">
						<span>Cameras:</span>
					</div>
					<div id="dd2" className="wrapper-dropdown-3" tabIndex="1">
						<span>Camera 1</span>
						<ul className="dropdown">
							<li><a href="#">Camera 1</a></li>
							<li><a href="#">Camera 2</a></li>
							<li><a href="#">Camera 3</a></li>
						</ul>
					</div>
					<div className="filter-label">
						<span>Sensors:</span>
					</div>
					<div id="dd3" className="wrapper-dropdown-3" tabIndex="1">
						<span>Sensor 1</span>
						<ul className="dropdown">
							<li><a href="#"><i className="icon-envelope icon-large"></i>Sensor 1</a></li>
							<li><a href="#"><i className="icon-truck icon-large"></i>Sensor 2</a></li>
							<li><a href="#"><i className="icon-plane icon-large"></i>Sensor 3</a></li>
						</ul>
					</div>
				</div>
			</div>
		);
	}
}