import React from 'react';
import CalendarEntryNewForm from '../forms/validated/CalendarEntryNewForm.jsx';

export class NewEntry extends React.Component {
	constructor() {
		super();
	}

	render() {
		return (
			<CalendarEntryNewForm {...this.props} />
		);
	}
}
