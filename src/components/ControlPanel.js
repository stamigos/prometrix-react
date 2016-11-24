import React, { Component } from 'react'

import LightControlling from './controlling/LightControlling'
import SensorControlling from './controlling/SensorControlling'
import AlarmZoneControlling from './controlling/AlarmZoneControlling'
import CameraControlling from './controlling/CameraControlling'


export default class ControlPanel extends Component {
	constructor(props) {
		super(props);
		this.state = {
			light: null,
			sensor: null,
			alarm_zone: null,
			camera: null,
			controlling: null
		}
	}
	componentWillReceiveProps(nextProps) {
		console.log("nextProps:", nextProps)
		this.setState({
			light: nextProps.light,
			sensor: nextProps.sensor,
			alarm_zone: nextProps.alarm_zone,
			camera: nextProps.camera,
			controlling: nextProps.controlling
		})
	}
	getChosenImage(image) {
		this.props.getChosenInContent(image)
	}
	render() {
		var light = this.state.light;
		var sensor = this.state.sensor;
		var alarm_zone = this.state.alarm_zone;
		var camera = this.state.camera;
		var controlling = this.state.controlling;
		var panel = null;
		if (controlling && controlling == "light") {
			panel = <LightControlling light={light}/>
		}
		if (controlling && controlling == "sensor") {
			panel = <SensorControlling sensor={sensor}/>
		}
		if (controlling && controlling == "alarm_zone") {
			panel = <AlarmZoneControlling alarm_zone={alarm_zone} />
		}
		if (controlling && controlling == "camera") {
			panel = <CameraControlling camera={camera} getChosenImage={this.getChosenImage.bind(this)} />
		}
		return (
	    	<div className="last-saved">
	    		{panel}
	    	</div>
		);
	}
}