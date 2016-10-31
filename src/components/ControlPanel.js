import React, { Component } from 'react'

import LightControlling from './controlling/LightControlling'
import SensorControlling from './controlling/SensorControlling'


export default class ControlPanel extends Component {
	constructor(props) {
		super(props);
		this.state = {
			light: null,
			sensor: null,
			controlling: null
		}
	}
	componentWillReceiveProps(nextProps) {
		console.log("nextProps:", nextProps)
		this.setState({
			light: nextProps.light,
			sensor: nextProps.sensor,
			controlling: nextProps.controlling
		})
	}
	render() {
		var light = this.state.light;
		var sensor = this.state.sensor;
		var controlling = this.state.controlling;
		var panel = null;
		if (controlling && controlling == "light") {
			panel = <LightControlling light={this.state.light}/>
		}
		if (controlling && controlling == "sensor") {
			panel = <SensorControlling sensor={this.state.sensor}/>
		}
		return (
	    	<div className="last-saved">
	    		{panel}
	    	</div>
		);
	}
}