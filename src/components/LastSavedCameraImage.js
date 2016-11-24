import React, { Component } from 'react'


export default class LastSavedCameraImage extends Component {
	render() {
		console.log("image:", this.props.image)
		return (
			<div className="last-saved">
				<h2>{this.props.header}</h2>
				<div className="image-item">
					{this.props.image ?
						<img src={this.props.image}/> : <span className="no-image-text">No image</span>
					}
				</div>
			</div>
		);
	}
}