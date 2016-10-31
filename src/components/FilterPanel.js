import React, { Component } from 'react'


export default class FilterPanel extends Component {
	constructor(props) {
		super(props);
		this.state = {
			site: null,
			lightActive: false,
			alarmZoneActive: false,
			cameraActive: false,
			sensorActive: false,
			firstSelected: null,
			selectedLight: null,
			selectedAlarmZone: null,
			selectedCamera: null,
			selectedSensor: null,
			menu_active: null,
			lights: [],
			alarm_zones: [],
			cameras: [],
			sensors: []
		}
		this.get_lights = this.get_lights.bind(this);
		this.get_alarm_zones = this.get_alarm_zones.bind(this);
		this.get_cameras = this.get_cameras.bind(this);
		this.get_sensors = this.get_sensors.bind(this);
	}
	get_lights(site) {
		var self = this;
		var headers = new Headers();
		headers.append("Authorization", "Token " + localStorage.token);
		var request = new Request(
			'http://127.0.0.1:8000/api/v1/sites/'+site.id+'/lights/', 
			{
				method: "GET", 
			 	headers: headers
		    });

		fetch(request)
			  .then(function(response) {
			    return response.json();
			   })
			  .then(function(objects) {
			  		console.log('lights:', objects)
			  		if (objects.hasOwnProperty('detail')) {
				  		self.setState({
				  			lights: [],
				  			selectedLight: null
				  		})
			  		} else {
				  		self.setState({
				  			lights: objects,
				  			selectedLight: objects[0],
				  			menu_active: 1
				  		})
			  			self.props.getLight(objects[0]);
			  		}
			  	});
	}
	get_alarm_zones(site) {
		var self = this;
		var headers = new Headers();
		headers.append("Authorization", "Token " + localStorage.token);
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
				  			selectedAlarmZone: null
				  		})
			  		} else {
				  		self.setState({
			  				alarm_zones: objects,
				  			selectedAlarmZone: objects[0],
				  			menu_active: 2
				  		})
			  		}

			  	});
	}
	get_cameras(site) {
		var self = this;
		var headers = new Headers();
		headers.append("Authorization", "Token " + localStorage.token);
		var request = new Request(
			'http://127.0.0.1:8000/api/v1/sites/'+site.id+'/cameras/', 
			{
				method: "GET", 
			 	headers: headers
		    });

		fetch(request)
			  .then(function(response) {
			  	console.log('then cameras:', response)
			    return response.json();
			   })
			  .then(function(objects) {
			  		console.log('then cameras 2:', objects)
			  		if (objects.hasOwnProperty('detail')) {
				  		self.setState({
				  			cameras: [],
				  			selectedCamera: null
				  		})
			  		} else {
				  		self.setState({
				  			cameras: objects,
				  			selectedCamera: objects[0],
				  			menu_active: 3
				  		})
			  		}
			  	});
	}
	get_sensors(site) {
		var self = this;
		var headers = new Headers();
		headers.append("Authorization", "Token " + localStorage.token);
		var request = new Request(
			'http://127.0.0.1:8000/api/v1/sites/'+site.id+'/sensors/', 
			{
				method: "GET", 
			 	headers: headers
		    });

		fetch(request)
			  .then(function(response) {
			  	console.log('then sensors:', response)
			    return response.json();
			   })
			  .then(function(objects) {
			  		console.log('then sensors 2:', objects)
			  		if (objects.hasOwnProperty('detail')) {
				  		self.setState({
				  			sensors: [],
				  			selectedSensor: null
				  		})
			  		} else {
				  		self.setState({
				  			sensors: objects,
				  			selectedSensor: objects[0],
				  			menu_active: 4
				  		})
				  		self.props.getSensor(objects[0]);
			  		}
			  	});
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.site != this.props.site) {
			this.get_lights(nextProps.site)
			this.get_alarm_zones(nextProps.site)
			this.get_cameras(nextProps.site)
			this.get_sensors(nextProps.site)
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
	onCameraClick() {
		this.setState({
			cameraActive: !this.state.cameraActive
		})
	}
	onSensorClick() {
		this.setState({
			sensorActive: !this.state.sensorActive
		})
	}
	onLightSelect(light) {
		console.log("light selected:", light)
		this.setState({
			selectedLight: light
		})
		this.props.getLight(light);
		this.props.controlling("light")
	}
	onAlarmZoneSelect(alarm_zone) {
		console.log("alarm_zone selected:", alarm_zone)
		this.setState({
			selectedAlarmZone: alarm_zone
		})
	}
	onCameraSelect(camera) {
		console.log("camera selected:", camera)
		this.setState({
			selectedCamera: camera
		})
	}
	onSensorSelect(sensor) {
		console.log("sensor selected:", sensor)
		this.setState({
			selectedSensor: sensor
		})
		this.props.getSensor(sensor);
		this.props.controlling("sensor")
	}
	render() {
		var self = this;
		var lightClass = "wrapper-dropdown-3";
		if (this.state.lightActive) {
			lightClass = "wrapper-dropdown-3 active menu_active"
		} else {
			if (this.state.menu_active == 1) {
				lightClass = "wrapper-dropdown-3 menu_active"
			} else {
				lightClass = "wrapper-dropdown-3"
			}
		}
		return (
			<div className="filter-panel">
				<div className="site-name">
					{this.state.site ? (<span>Site {this.state.site.id}</span>) : (<span></span>)}
				</div>
				<div className="filters">
					<div className="filter-label">
						<span>Lights:</span>
					</div>
					<div id="dd5" onClick={this.onLightClick.bind(this)} className={lightClass} tabIndex="1">
						{this.state.selectedLight ? <span>Light {this.state.selectedLight.id}</span> : <span>Not selected</span>}
						{this.state.lights[0] != null ?
							<ul className="dropdown">
								{this.state.lights.map(function(light, i) {
									return <li key={i} onClick={self.onLightSelect.bind(self, light)}><a href="#">Light {light.id}</a></li>
								})}
							</ul> : null}
					</div>
					<div className="filter-label">
						<span>Alarm zones:</span>
					</div>
					<div id="dd1" onClick={this.onAlarmZoneClick.bind(this)} className={this.state.alarmZoneActive ? ("wrapper-dropdown-3 active"):("wrapper-dropdown-3")} tabIndex="1">
						{this.state.selectedAlarmZone ? <span>Alarm Zone {this.state.selectedAlarmZone.id}</span> : <span>Not selected</span>}
						{this.state.alarm_zones[0] != null ?
							<ul className="dropdown">
								{this.state.alarm_zones.map(function(alarm_zone, i) {
									return <li key={i} onClick={self.onAlarmZoneSelect.bind(self, alarm_zone)}><a href="#">Alarm zone {alarm_zone.id}</a></li>
								})}
							</ul> : null}
					</div>
					<div className="filter-label">
						<span>Cameras:</span>
					</div>
					<div id="dd2" onClick={this.onCameraClick.bind(this)} className={this.state.cameraActive ? ("wrapper-dropdown-3 active"):("wrapper-dropdown-3")} tabIndex="1">
						{this.state.selectedCamera ? <span>Camera {this.state.selectedCamera.id}</span> : <span>Not selected</span>}
						{this.state.cameras[0] != null ?
						<ul className="dropdown">
							{this.state.cameras.map(function(camera, i) {
								return <li key={i} onClick={self.onCameraSelect.bind(self, camera)}><a href="#">Camera {camera.id}</a></li>
							})}
						</ul> : null}
					</div>
					<div className="filter-label">
						<span>Sensors:</span>
					</div>
					<div id="dd3" onClick={this.onSensorClick.bind(this)} className={this.state.sensorActive ? ("wrapper-dropdown-3 active"):("wrapper-dropdown-3")} tabIndex="1">
						{this.state.selectedSensor ? <span>Sensor {this.state.selectedSensor.id}</span> : <span>Not selected</span>}
						{this.state.sensors[0] != null ?
						<ul className="dropdown">
							{this.state.sensors.map(function(sensor, i) {
								return <li key={i} onClick={self.onSensorSelect.bind(self, sensor)}><a href="#">Sensor {sensor.id}</a></li>
							})}
						</ul> : null}
					</div>
				</div>
			</div>
		);
	}
}