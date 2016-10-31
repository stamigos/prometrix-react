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
			controlling: "light"
		}
	}
	getLight(light) {
		this.setState({
			light: light
		})
	}
	getSensor(sensor) {
		this.setState({
			sensor: sensor
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
	render() {
		return (
			<div className="content">
				<FilterPanel site={this.props.site} getLight={this.getLight.bind(this)} getSensor={this.getSensor.bind(this)} controlling={this.getControlling.bind(this)} />
				<div className="left-content-panel">
					<LastSavedCameraImage />
				</div>
				<div className="right-content-panel">
					<ControlPanel light={this.state.light} sensor={this.state.sensor} controlling={this.state.controlling} />
				</div>
				<InfoTable site={this.props.site} />
			</div>
		);
	}
}