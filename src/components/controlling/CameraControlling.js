import React, { Component } from 'react'


class CameraImages extends Component {
	constructor(props) {
		super(props);
		this.state = {
			image: props.images ? props.images[0] : null
		}
	}
	chooseImage(image) {
		this.setState({
			image: image
		})
		this.props.getChosen(image)
	}
	render() {
		var self = this;
		var images = this.props.images.map(function(image, i) {
			var chosen = self.state.image.id == image.id ? "grid-item chosen" : "grid-item"
			return <div key={i} className={chosen} onClick={self.chooseImage.bind(self, image)}>
					   <img src={image.image_data_thumb} />
					   <div className="overlay"></div>
				   </div>
		})
		return (
			<div className="grid-wrapper">
				{images}
			</div>
		);
	}
}

export default class CameraControlling extends Component {
	constructor(props) {
		super(props);
		this.state = {
			camera: null,
			images: null
		}
		this.getCameraImages = this.getCameraImages.bind(this);
	}
	componentWillReceiveProps(nextProps) {
		this.getCameraImages(nextProps.camera.id)
		this.setState({
			camera: nextProps.camera
		})
	}
	getChosen(image) {
		this.props.getChosenImage(image)
	}
	getCameraImages(camera_id) {
		var self = this;
		var headers = new Headers();
		headers.append("Authorization", "Token " + localStorage.token);
		var request = new Request(
			'http://54.194.155.176/api/v1/sites/1/cameras/'+camera_id+'/images/', 
			{
				method: "GET", 
			 	headers: headers
		    });

		fetch(request)
			  .then(function(response) {
			    return response.json();
			   })
			  .then(function(objects) {
			  		self.setState({
			  			images: objects
			  		})
			  	})
	}
	render() {
		return (
			<div>
				{this.state.camera ?
					<div>
			    		<h2>Controlling: Camera {this.state.camera.id}</h2>
			    		<div className="controlling white-box">
			    				{this.state.images ? 
									<CameraImages images={this.state.images} getChosen={this.getChosen.bind(this)} /> : null}
			    		</div>
					</div> : null}
			</div>
		);
	}
}