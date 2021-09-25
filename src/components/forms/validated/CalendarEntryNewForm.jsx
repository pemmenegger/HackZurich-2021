import React, { useContext } from 'react'
import { withFormValidation }  from './withFormValidation';
import { ButtonSubmit } from "../buttons"
import { createCalendarEntry } from "../../../services/calendarService"
import { openSuccessAlert, openErrorAlert } from "../../../rigiUtils"
import { CalendarEntryFormSkeleton, initialValues, rules } from './skeletons/CalendarEntryFormSkeleton';

const CalendarEntryNewFormSkeleton = (props) => {
  const {
    onFormValueChange,
    onFormSubmit,
    values,
    fieldErrors,
    isSubmitting
  } = props;

  const handleOnFormSubmit = async () => {
    try {
      await onFormSubmit();
      openSuccessAlert(props.foregroundContext, "Eintrag wurde hinzugefügt");
    } catch (e) {
      openErrorAlert(props.foregroundContext, "Eintrag konnte nicht hinzugefügt werden");
    }
  }

  return (
    <CalendarEntryFormSkeleton {...props}>
      <ButtonSubmit
          isSubmitting={isSubmitting}
          value="Eintragen" 
          onClick={handleOnFormSubmit}
      />
    </CalendarEntryFormSkeleton>
  )
}

const handlers = {
  onFormSubmit: async (values, rigiUser) => {
    try {
      let response = await createCalendarEntry(values.startDateMoment, values.endDateMoment, values.who, values.howMuch, values.comment, rigiUser)
      return response
    } catch (error) {
      return error
    }
  }
}

export default withFormValidation(initialValues, rules, handlers, CalendarEntryNewFormSkeleton);