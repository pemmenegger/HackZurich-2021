import React from 'react';

import ConfirmAlert from './context/foreground/ConfirmAlert.jsx';
import { openSuccessAlert } from '../rigiUtils.js';
import { withForegroundContext } from "./context/ForegroundContext"
import { finishNote } from "../services/notesService"

class NoteCard extends React.Component {
	constructor() {
		super();
    }

    handleFinishNote() {
        let confirmOnClick = async () => {
            try {
                await finishNote(this.props.SessionSettingsContext.rigiUser);
                openSuccessAlert(this.props.foregroundContext, "Auftrag wurde erledigt");
            } catch (e) {
                openErrorAlert(this.props.foregroundContext, "Auftrag konnte nicht erledigt werden");
            }
        }

        this.props.foregroundContext.openPopup(
            <ConfirmAlert 
                closePopup={this.props.foregroundContext.closePopup}
                title="Auftrag erledigt?"
                message="Bei Erledigung des Auftrags wird er ins Archiv gelegt."
                confirmLabel="Erledigt"
                confirmOnClick={confirmOnClick}
            />
        );
    }

	render() {
        let createdDate = moment(this.props.note.createdDate).format('DD. MMM YYYY');

		return (
			<div className="card noteCard">
                <a className="done" href="#" onClick={() => this.finishNote()} />
                <div className="wrapperTitle">
                    <p className="title">{this.props.note.title}</p>
                    <div className="createdBy">
                        {createdDate} von {this.props.createdUserFirstname}
                    </div>
                </div>
            </div>
		);
	}
}

export default withForegroundContext(NoteCard);
