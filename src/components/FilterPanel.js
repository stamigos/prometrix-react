import React, { Component } from 'react'


export default class FilterPanel extends Component {
	constructor(props) {
		super(props);
		this.state = {
			site: null,
			menu_active: null,
			lightActive: false,
			alarmZoneActive: false,
			cameraActive: false,
			sensorActive: false,
			firstSelected: null,
			selectedLight: null,
			selectedAlarmZone: null,
			selectedCamera: null,
			selectedSensor: null,
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
			'http://54.194.155.176/api/v1/sites/'+site.id+'/lights/', 
			{
				method: "GET", 
			 	headers: headers
		    });

		fetch(request)
			  .then(function(response) {
			  	if (response.status != 200) {
			  		self.setState({
			  			lights: [],
			  			selectedLight: null
			  		})
			  	}
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
				  			lights: objects
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
			'http://54.194.155.176/api/v1/sites/'+site.id+'/alarm_zones/', 
			{
				method: "GET", 
			 	headers: headers
		    });

		fetch(request)
			  .then(function(response) {
			  	if (response.status != 200) {
			  		self.setState({
			  			alarm_zones: [],
			  			selectedAlarmZone: null
			  		})
			  	}
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
			  				alarm_zones: objects
				  		})
				  		self.props.getAlarmZone(objects[0]);
			  		}
			  	});
	}
	get_cameras(site) {
		var self = this;
		var headers = new Headers();
		headers.append("Authorization", "Token " + localStorage.token);
		var request = new Request(
			'http://54.194.155.176/api/v1/sites/'+site.id+'/cameras/', 
			{
				method: "GET", 
			 	headers: headers
		    });

		fetch(request)
			  .then(function(response) {
			  	console.log('then cameras:', response)
			  	if (response.status != 200) {
			  		self.setState({
			  			cameras: [],
			  			selectedCamera: null
			  		})
			  	}
			  	console.log("err:", response.status)
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
				  			cameras: objects
				  		})
				  		self.props.getCamera(objects[0])
			  		}
			  	});
	}
	get_sensors(site) {
		var self = this;
		var headers = new Headers();
		headers.append("Authorization", "Token " + localStorage.token);
		var request = new Request(
			'http://54.194.155.176/api/v1/sites/'+site.id+'/sensors/', 
			{
				method: "GET", 
			 	headers: headers
		    });

		fetch(request)
			  .then(function(response) {
			  	if (response.status != 200) {
			  		self.setState({
			  			sensors: [],
			  			selectedSensor: null
			  		})
			  	}
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
				  			sensors: objects
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
			if (!nextProps.menu_active) {
				this.setState({
					menu_active: null
				})
			}
		}
	}
	onLightClick() {
		if (this.state.lights[0] != null) {
			this.setState({
				lightActive: !this.state.lightActive
			})
		}
	}
	onAlarmZoneClick() {
		if (this.state.alarm_zones[0] != null) {
			this.setState({
				alarmZoneActive: !this.state.alarmZoneActive
			})
		}
	}
	onCameraClick() {
		if (this.state.cameras[0] != null) {
			this.setState({
				cameraActive: !this.state.cameraActive
			})
		}
	}
	onSensorClick() {
		if (this.state.sensors[0] != null) {
			this.setState({
				sensorActive: !this.state.sensorActive
			})
		}
	}
	onLightSelect(light) {
		console.log("light selected:", light)
		this.setState({
			menu_active: 1,
			selectedLight: light,
			selectedAlarmZone: null,
			selectedCamera: null,
			selectedSensor: null,
		})
		this.props.getLight(light);
		this.props.controlling("light")
	}
	onAlarmZoneSelect(alarm_zone) {
		console.log("alarm_zone selected:", alarm_zone)
		this.setState({
			menu_active: 2,
			selectedAlarmZone: alarm_zone,
			selectedLight: null,
			selectedCamera: null,
			selectedSensor: null,
		})
		this.props.getAlarmZone(alarm_zone);
		this.props.controlling("alarm_zone");
	}
	onCameraSelect(camera) {
		console.log("camera selected:", camera)
		this.setState({
			menu_active: 3,
			selectedCamera: camera,
			selectedLight: null,
			selectedAlarmZone: null,
			selectedSensor: null,
		})
		this.props.getCamera(camera);
		this.props.controlling("camera");
	}
	onSensorSelect(sensor) {
		console.log("sensor selected:", sensor)
		this.setState({
			menu_active: 4,
			selectedSensor: sensor,
			selectedLight: null,
			selectedAlarmZone: null,
			selectedCamera: null
		})
		this.props.getSensor(sensor);
		this.props.controlling("sensor");
	}
	render() {
		var self = this;
		var light_style = this.state.menu_active == 1 ? ({background: '#59caf5'}) : ({background: 'transparent'})
		var alarm_zone_style = this.state.menu_active == 2 ? ({background: '#59caf5'}) : ({background: 'transparent'})
		var camera_style = this.state.menu_active == 3 ? ({background: '#59caf5'}) : ({background: 'transparent'})
		var sensor_style = this.state.menu_active == 4 ? ({background: '#59caf5'}) : ({background: 'transparent'})

		return (
			<div className="filter-panel">
				<div className="site-name">
					{this.state.site ? (<span>Site {this.state.site.id}</span>) : (<span></span>)}
				</div>
				<div className="filters">
					<div className="filter-label">
						<span>Lights:</span>
					</div>
					<div id="dd5" onClick={this.onLightClick.bind(this)} className={this.state.lightActive ? ("wrapper-dropdown-3 active"):("wrapper-dropdown-3")} style={light_style} tabIndex="1">
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
					<div id="dd1" onClick={this.onAlarmZoneClick.bind(this)} className={this.state.alarmZoneActive ? ("wrapper-dropdown-3 active"):("wrapper-dropdown-3")} style={alarm_zone_style} tabIndex="1">
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
					<div id="dd2" onClick={this.onCameraClick.bind(this)} className={this.state.cameraActive ? ("wrapper-dropdown-3 active"):("wrapper-dropdown-3")} style={camera_style} tabIndex="1">
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
					<div id="dd3" onClick={this.onSensorClick.bind(this)} className={this.state.sensorActive ? ("wrapper-dropdown-3 active"):("wrapper-dropdown-3")} style={sensor_style} tabIndex="1">
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