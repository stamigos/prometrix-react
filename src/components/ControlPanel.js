import React, { Component } from 'react'


export default class ControlPanel extends Component {
	render() {
		return (
	    	<div className="last-saved">
	    		<h2>Controlling: Light 1</h2>
	    		<div className="controlling">
	    			<div className="left-column">
	    				<h2>Light status</h2>
		    			<ul>
		    				<li>
		    					<span className="title">LED:</span><span className="value">%</span>
		    				</li>
		    				<li>
		    					<span className="title">Ambient light:</span><span className="value">on</span>
		    				</li>
		    				<li>
		    					<span className="title">Tampering:</span><span className="value">on</span>
		    				</li>
		    				<li>
		    					<span className="title">Temperature:</span><span className="value">on</span>
		    				</li>
		    				<li>
		    					<span className="title">Digital input:</span><span className="value">on</span>
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
	    	</div>
		);
	}
}