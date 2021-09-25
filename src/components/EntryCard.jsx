import React from 'react';

import CalendarEntryEditForm from './forms/validated/CalendarEntryEditForm.jsx';
import { withSessionSettingsContext } from "./context/SessionSettingsContext"
import { withForegroundContext } from "./context/ForegroundContext"

class EntryCard extends React.Component {
	constructor() {
		super();
    }

    edit() {
        this.props.foregroundContext.openModal("Eintrag bearbeiten", <CalendarEntryEditForm calendarEntryId={this.props.entry.id}/>);
    }

	render() {
        let entry = this.props.entry;
        let dateFrom = moment(entry.dateFrom, "YYYY-MM-DD").format("DD.MM");
        let dateTo = moment(entry.dateTo, "YYYY-MM-DD").format("DD.MM.YYYY");
        let isEditAndDeleteVisible = (entry.userKey == this.props.SessionSettingsContext.rigiUser.uid) || this.props.SessionSettingsContext.rigiUser.isAdmin;
        let person = entry.person;
        let quantity = entry.quantity;

		return (
			<div className="card entryCard">
                <div className="date">{dateFrom} - {dateTo}</div>
                {isEditAndDeleteVisible ? 
                    <div>
                        <div className="editEntry" onClick={() => this.edit()}></div> 
                    </div>
                    : null 
                }
                <div className="person">{person} ({quantity})</div>
            </div>
		);
	}
}

export default withSessionSettingsContext(withForegroundContext(EntryCard));