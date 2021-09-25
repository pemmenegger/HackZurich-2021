import React from 'react';

import ConfirmAlert from './context/foreground/ConfirmAlert.jsx';
import { openSuccessAlert } from '../rigiUtils.js';
import { withForegroundContext } from "./context/ForegroundContext"
import { finishNote } from "../services/notesService"

class StoryCard extends React.Component {
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
		return (
			<div className="story-card">
                    <div className="wrapper" style={{  
                    backgroundImage: "url(" + this.props.imgUrl + ")",
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                }}>
                    <div className="overlay"></div>
                    <div className="headlines">
                        <p className="subheadline">{this.props.subheadline}</p>
                        <p className="headline">{this.props.headline}</p>
                    </div>
                </div>
            </div>
		);
	}
}

export default withForegroundContext(StoryCard);
