import React, { Component } from 'react'


export default class LightControlling extends Component {
	render() {
		return (
			<div>
				{this.props.light ?
		    		<div>
			    		<h2>Controlling: Light {this.props.light.id}</h2>
			    		<div className="controlling">
			    			<div className="left-column">
			    				<h2>Light status</h2>
				    			<ul>
				    				<li>
				    					<span className="title">LED:</span><span className="value">{this.props.light.light_intensity}%</span>
				    				</li>
				    				<li>
				    					<span className="title">Ambient light:</span><span className="value">{this.props.light.ambient_light}</span>
				    				</li>
				    				<li>
				    					<span className="title">Tampering:</span><span className="value">{this.props.light.digital_inputs}</span>
				    				</li>
				    				<li>
				    					<span className="title">Temperature:</span><span className="value">{this.props.light.temperature}</span>
				    				</li>
				    				<li>
				    					<span className="title">Digital input:</span><span className="value">{this.props.light.digital_inputs}</span>
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