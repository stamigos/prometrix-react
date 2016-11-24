import React, { Component } from 'react'


export default class AlarmZoneControlling extends Component {
	render() {
		return (
			<div>
				{this.props.alarm_zone ?
					<div>			
						<h2>Controlling: Alarm Zone {this.props.alarm_zone.id}</h2>
						<div className="controlling">
			    			<div className="left-column">
			    				<h2>Alarm Zone status</h2>
				    			<ul>
				    				<li>
				    					<span className="title">Description:</span><span className="value">{this.props.alarm_zone.description}</span>
				    				</li>
				    				<li>
				    					<span className="title">Last Alarm:</span><span className="value">{this.props.alarm_zone.last_alarm}</span>
				    				</li>
				    			</ul>
			    			</div>
			    			<div className="right-column">
			    				<h2>Manual control</h2>
			    				<ul>
			    					<li>
			    						<span className="title">Enable</span>
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