import React from 'react';
import { getFirstnameFromUserKey } from '../../rigiUtils.js';
import NoteCard from '../NoteCard.jsx';
import NewNoteForm from '../forms/validated/NewNoteForm.jsx';
import { withSessionSettingsContext } from "../context/SessionSettingsContext"
import { withForegroundContext } from "../context/ForegroundContext"
import { fetchAndMapNotes, filterOnlyActiveNotes } from "../../services/notesService"

class Notes extends React.Component {
	constructor() {
		super();
		this.state = {
			activeNotes: [],
			notesTitleValid: true,
			submittingAddNotes: false
		};
		this.generateNoteCardsFromData = this.generateNoteCards.bind(this);
	}

	async componentDidMount() {
		let notes = await fetchAndMapNotes()
		let activeNotes = filterOnlyActiveNotes(notes)
		this.setState({
			activeNotes: activeNotes
		});
	}

	generateNoteCards() {
		let activeNotes = this.state.activeNotes;
		let noteCards = [];

		if (activeNotes.length == 0) {
			noteCards.push( 
				<p key={1} className="emptyCard emptyNote">
					Es gibt momentan nichts zu tun auf der Windegg, schön!
				</p>
			);
		} else {
			for (let i = 0; i < activeNotes.length; i++) {
				let note = activeNotes[i];
				let createdUserFirstname = getFirstnameFromUserKey(this.props.SessionSettingsContext.allRigiUsers, note.createdFromUid);

				noteCards.push(
					<NoteCard 
						key={i}
						note={note}
						createdUserFirstname={createdUserFirstname}
						openPopup={this.props.foregroundContext.openPopup}
						closePopup={this.props.foregroundContext.closePopup}
					/>
				);
			}
		}

		return noteCards;
	}

	render() {
		let noteCards = this.generateNoteCards()
		return (
			<div className="notes">
				<div className="allNotes">{noteCards}</div>
				<NewNoteForm />
			</div>
		);
	}
}

export default withSessionSettingsContext(withForegroundContext(Notes));