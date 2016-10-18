import React, { Component } from 'react'

import Header from '../components/Header'
import SideMenu from '../components/SideMenu'
import Content from '../components/Content'

export default class Index extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedSite: null
		}
	}
	getSelectedSite(site) {
		this.setState({
			selectedSite: site
		})
	}
	render() {
		return (
			<div className="container">
				<Header />
				<SideMenu getSelectedSite={this.getSelectedSite.bind(this)} />
				<Content site={this.state.selectedSite} />
			</div>
		);
	}
}