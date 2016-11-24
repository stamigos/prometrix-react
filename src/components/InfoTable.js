import React, { Component } from 'react'


export default class InfoTable extends Component {
	constructor(props) {
		super(props);
		this.state = {
			alarm_logs: []
		}
		this.get_alarm_logs = this.get_alarm_logs.bind(this);
	}
	componentWillReceiveProps(nextProps) {
		console.log("nextProps:", nextProps)
		this.get_alarm_logs(nextProps.site.id);
	}
	get_alarm_logs(site_id) {
		var self = this;
		var headers = new Headers();
		headers.append("Authorization", "Token " + localStorage.token);
		var request = new Request(
			'http://54.194.155.176/api/v1/sites/'+ site_id + '/alarm_logs/', 
			{
				method: "GET", 
			 	headers: headers
		    });

		fetch(request)
			  .then(function(response) {
			  	console.log('alarm_logs:', response)
			    return response.json();
			   })
			  .then(function(objects) {
			  		console.log('alarm_logs:', objects)
			  		if (objects.hasOwnProperty("detail")) {
				  		self.setState({
				  			alarm_logs: []
				  		})
			  		} else {
				  		self.setState({
				  			alarm_logs: objects
				  		})
			  		}
			  	});
	}
	render() {
		console.log("alarm_logs:", this.state.alarm_logs)
		var alarm_logs = null;

		if (this.state.alarm_logs) {
	        alarm_logs = this.state.alarm_logs.map(function(alarm_log, i) {
	            return <div key={i} className="row">
			                <div className="cell">{alarm_log.description}</div>
			                <div className="cell">{alarm_log.alarm_text}</div>
			                <div className="cell">{alarm_log.last_alarm}</div>
			                <div className="cell">196.128.0.1 - Cam - 01</div>
			            </div>
        	})
		}
		return (
	        <div className="table">
	            <div className="row header">
	                <div className="cell header">Event</div>
	                <div className="cell header">Description</div>
	                <div className="cell header">Event time</div>
	                <div className="cell header">Source</div>
	            </div>
	            {alarm_logs}
	        </div>
		);
	}
}