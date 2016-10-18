import React, { Component } from 'react'
import FilterPanel from './FilterPanel'
import LastSavedCameraImage from './LastSavedCameraImage'
import ControlPanel from './ControlPanel'
import InfoTable from './InfoTable'


export default class Content extends Component {
	render() {
		return (
			<div className="content">
				<FilterPanel site={this.props.site} />
				<div className="left-content-panel">
					<LastSavedCameraImage />
				</div>
				<div className="right-content-panel">
					<ControlPanel />
				</div>
				<InfoTable />
			</div>
		);
	}
}