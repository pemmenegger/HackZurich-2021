import React from 'react';

import { getFirstnameFromUserKey } from '../../rigiUtils.js';
import { withSessionSettingsContext } from "../context/SessionSettingsContext"
import { fetchAndMapHeating } from "../../services/heatingService"

class Heating extends React.Component {
	constructor() {
		super();
		this.state = {
			reactWrites: {},
			myStromWrites: {},
		};

		this.calculateMinutes = this.calculateMinutes.bind(this);
		this.getUserNameByKey = this.getUserNameByKey.bind(this);
	}

	async componentDidMount() {
		let reactWrites = {};
		let myStromWrites = {};
		await fetchAndMapHeating(reactWrites, myStromWrites)
		this.setState({
			reactWrites: reactWrites,
			myStromWrites: myStromWrites
		});
	}

	calculateMinutes() {
		var lastChanged = moment(this.state.myStromWrites.lastChanged, 'YYYY-MM-DDHH:mmZ');
		var now = moment();
		let difference = now.diff(lastChanged, 'minutes');
		return difference;
	}

	getUserNameByKey(userKey) {
		let userName;
		for (var user of this.props.allUserNames) {
			if (userKey == user.value) {
				userName = user.label;
			}
		}
		return userName;
	}

	render() {
		let userFirstname = getFirstnameFromUserKey(this.props.SessionSettingsContext.allRigiUsers, this.state.reactWrites.changedByUserKey);
		return (
			<div className="heating">
				<div className="box">
					<div className="reactWrites">
						<div className="block">
							<div className="info celsius">{this.state.reactWrites.minTempDay}</div>
							<p className="description">Min. Temperatur Tag</p>
						</div>
						<div className="block">
							<div className="info celsius">{this.state.reactWrites.minTempNight}</div>
							<p className="description">Min. Temperatur Nacht</p>
						</div>
					</div>
					<p className="time">
						zuletzt geändert am {moment(this.state.reactWrites.changedTimestamp).format('DD. MMM YYYY, HH:mm')} Uhr
						von {userFirstname}
					</p>
				</div>
				<div className="box">
					<div className="myStromWrites">
						<div className="block">
							<div className="info celsius">{this.state.myStromWrites.currentTemp}</div>
							<p className="description">Aktuelle Temperatur</p>
						</div>
						<div className="block">
							<div className={'info ' + (this.state.myStromWrites.isHeatingOn ? 'on' : 'off')}>
								{this.state.myStromWrites.isHeatingOn ? 'heizt' : 'heizt nicht'}
							</div>
							<p className="description">Status Heizung</p>
						</div>
					</div>
					<p className="time">zuletzt aktualisiert vor {this.calculateMinutes()} Minuten</p>
				</div>
				<button type="submit" onClick={() => this.props.openMinTempForm(true)}>
					Min. Temperatur ändern
				</button>
			</div>
		);
	}
}

export default withSessionSettingsContext(Heating);