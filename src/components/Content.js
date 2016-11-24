import React, { Component } from 'react'
import FilterPanel from './FilterPanel'
import LastSavedCameraImage from './LastSavedCameraImage'
import ControlPanel from './ControlPanel'
import InfoTable from './InfoTable'


export default class Content extends Component {
	constructor(props) {
		super(props);
		this.state = {
			light: null,
			sensor: null,
			alarm_zone: null,
			camera: null,
			chosenImage: null,
			last_saved: null,
			menu_active: false,
			controlling: "light"
		}
		this.get_last_save_image = this.get_last_save_image.bind(this)
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.site != this.props.site) {
			this.get_last_save_image(nextProps.site)
			this.setState({
				light: null,
				sensor: null,
				alarm_zone: null,
				camera: null,
				chosenImage: null,
				menu_active: false,
				controlling: "light"
			})
		}
	}
	getLight(light) {
		this.setState({
			light: light,
			chosenImage: null,
			menu_active: true
		})
	}
	getSensor(sensor) {
		this.setState({
			sensor: sensor,
			chosenImage: null,
			menu_active: true
		})
	}
	getAlarmZone(alarm_zone) {
		this.setState({
			alarm_zone: alarm_zone,
			chosenImage: null,
			menu_active: true
		})
	}
	getCamera(camera) {
		this.setState({
			camera: camera,
			menu_active: true
		})
	}
	getChosenImage(image) {
		console.log("in content:", image)
		this.setState({
			chosenImage: image
		})
	}
	getControlling(type) {
		var controlling = null;
		if (type == "light") {
			controlling = type
		}
		if (type == "sensor") {
			controlling = type
		}
		if (type == "alarm_zone") {
			controlling = type
		}
		if (type == "camera") {
			controlling = type
		}
		this.setState({
			controlling: controlling
		})
	}
	get_last_save_image(site) {
		var self = this;
		var headers = new Headers();
		headers.append("Authorization", "Token " + localStorage.token);
		var request = new Request(
			'http://127.0.0.1:8000/api/v1/sites/'+site.id+'/last-saved-image/',
			{
				method: "GET", 
			 	headers: headers
		    });

		fetch(request)
			  .then(function(response) {
			  	if (response.status != 200) {
			  		self.setState({
			  			last_saved: null
			  		})
			  	}
			    return response.json();
			   })
			  .then(function(result) {
			  		if (result.hasOwnProperty('detail')) {
				  		self.setState({
							last_saved: null
				  		})
			  		} else {
				  		self.setState({
				  			last_saved: result
				  		})
			  		}
			  	});
	}
	render() {
		return (
			<div className="content">
				<FilterPanel site={this.props.site} getLight={this.getLight.bind(this)} 
													getSensor={this.getSensor.bind(this)} 
													getAlarmZone={this.getAlarmZone.bind(this)} 
													getCamera={this.getCamera.bind(this)}
													controlling={this.getControlling.bind(this)}
													menu_active={this.state.menu_active} />
				<div className="left-content-panel">
				{this.state.chosenImage ?
					<LastSavedCameraImage header={"Camera Image "+this.state.chosenImage.logged} image={this.state.chosenImage.image_data} /> :
					<LastSavedCameraImage header="Last saved camera image" image={this.state.last_saved ? this.state.last_saved.image_data : null} />}
				</div>
				<div className="right-content-panel">
					<ControlPanel light={this.state.light} 
								  sensor={this.state.sensor}
								  alarm_zone={this.state.alarm_zone}
								  camera={this.state.camera}
								  controlling={this.state.controlling}
								  getChosenInContent={this.getChosenImage.bind(this)} />
				</div>
				<InfoTable site={this.props.site} />
			</div>
		);
	}
}