import React, { Component } from 'react'


export default class SensorControlling extends Component {
	render() {
		return (
			<div>
				{this.props.sensor ?
		    		<div>
			    		<h2>Controlling: Sensor {this.props.sensor.id}</h2>
			    		<div className="controlling">
			    			<div className="left-column">
			    				<h2>Sensor status</h2>
				    			<ul>
				    				<li>
				    					<span className="title">LED:</span><span className="value">{this.props.sensor.light_intensity}%</span>
				    				</li>
				    				<li>
				    					<span className="title">Ambient light:</span><span className="value">{this.props.sensor.ambient_light}</span>
				    				</li>
				    				<li>
				    					<span className="title">Tampering:</span><span className="value">{this.props.sensor.digital_inputs}</span>
				    				</li>
				    				<li>
				    					<span className="title">Temperature:</span><span className="value">{this.props.sensor.temperature}</span>
				    				</li>
				    				<li>
				    					<span className="title">Digital input:</span><span className="value">{this.props.sensor.digital_inputs}</span>
				    				</li>
				    			</ul>
			    			</div>
			    			<div className="right-column">
			    				<h2>Manual control</h2>
			    				<ul>
			    					<li>
			    						<span className="title">LED</span>
										<label className="switch">
											  <input type="checkbox" />
											  <div className="slider round"></div>
										</label>
			    					</li>
			    					<li>
			    						<span className="title">Energy save</span>
										<label className="switch">
											  <input type="checkbox" />
											  <div className="slider round"></div>
										</label>
			    					</li>
			    					<li>
			    						<span className="title">Boost</span>
										<label className="switch">
											  <input type="checkbox" />
											  <div className="slider round"></div>
										</label>
			    					</li>
			    					<li>
			    						<span className="title">Strobe</span>
										<label className="switch">
											  <input type="checkbox" />
											  <div className="slider round"></div>
										</label>
			    					</li>
			    					<li>
			    						<span className="title">Digital output</span>
										<label className="switch">
											  <input type="checkbox" />
											  <div className="slider round"></div>
										</label>
			    					</li>
			    				</ul>
			    			</div>
		    			</div> 
	    			</div> : null}
			</div>
		);
	}
}