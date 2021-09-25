import React, { useContext } from 'react'
import { withFormValidation }  from './withFormValidation';
import { ButtonSubmit, ButtonDelete } from "../buttons"
import { fetchAndMapCalendarEntry, deleteCalendarEntry } from "../../../services/calendarService"
import { openSuccessAlert, openErrorAlert } from "../../../rigiUtils"
import { CalendarEntryFormSkeleton, initialValues, rules } from './skeletons/CalendarEntryFormSkeleton';
import ConfirmAlert from '../../context/foreground/ConfirmAlert.jsx';

class CalendarEntryEditFormSkeleton extends React.Component {

    constructor() {
		super();
        this.handleOnDelete = this.handleOnDelete.bind(this);
	}

    async componentDidMount() {
        try {
            let calendarEntryId = this.props.calendarEntryId
            if(!calendarEntryId) {
                throw Error("No calendarEntryId provided")
            }
            let data = {}
            await fetchAndMapCalendarEntry(calendarEntryId, data)
            this.props.changeValues(data)
        } catch(e) {
            openErrorAlert(this.props.foregroundContext, "Fehler beim Öffnen des Kalender-Eintrags")
        }
	}

    async handleOnFormSubmit () {
        try {
            await this.props.onFormSubmit();
            openSuccessAlert(this.props.foregroundContext, "Eintrag wurde geändert");
        } catch (e) {
            openErrorAlert(this.props.foregroundContext, "Eintrag konnte nicht geändert werden");
        }
    }

    handleOnDelete() {
        let confirmOnClick = async () => {
            try {
                await deleteCalendarEntry(this.props.calendarEntryId);
                openSuccessAlert(this.props.foregroundContext, "Eintrag wurde gelöscht");
                this.props.foregroundContext.closeModal();
            } catch (e) {
                openErrorAlert(this.props.foregroundContext, "Eintrag konnte nicht gelöscht werden");
            }
        }

        this.props.foregroundContext.openPopup(
            <ConfirmAlert 
                closePopup={this.props.foregroundContext.closePopup}
                title="Eintrag löschen?"
                message="Der Eintrag wird generell gelöscht und bei allen verschwinden."
                confirmLabel="Löschen"
                confirmOnClick={confirmOnClick}
            />
        );
    }

    render() {
        const {
            isSubmitting,
        } = this.props;
        return (
            <CalendarEntryFormSkeleton {...this.props}>
                <ButtonDelete 
                    onClick={this.handleOnDelete}
                />
                <ButtonSubmit
                    isSubmitting={isSubmitting}
                    value="Ändern" 
                    onClick={this.handleOnFormSubmit}
                />
            </CalendarEntryFormSkeleton>
        );
	}
}

const handlers = {
  onFormSubmit: async (values, rigiUser) => {
    try {
      let response = await updateNewCalendarEntry(ID, values.startDateMoment, values.endDateMoment, values.who, values.howMuch, values.comment, rigiUser)
      return response
    } catch (error) {
      return error
    }
  }
}

export default withFormValidation(initialValues, rules, handlers, CalendarEntryEditFormSkeleton);