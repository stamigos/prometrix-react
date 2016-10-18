import React, { Component } from 'react'


export default class LastSavedCameraImage extends Component {
	render() {
		return (
			<div className="last-saved">
				<h2>Last saved camera image</h2>
				<img src={require("../img/last-saved.png")}/>
			</div>
		);
	}
}