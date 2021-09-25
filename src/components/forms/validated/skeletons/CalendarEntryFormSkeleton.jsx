import React from 'react'
import { InputField, TextareaInputField, DatepickerRangeInputFields } from "../../inputs"


export const CalendarEntryFormSkeleton = (props) => {
  const {
    onFormValueChange,
    values,
    fieldErrors,
    children,
    changeValues
  } = props;

  return (
    <div>
        <DatepickerRangeInputFields
            errorStartDate={fieldErrors.startDateMoment}
            momentStartDate={values.startDateMoment}
            nameStartDate="startDateMoment"
            errorEndDate={fieldErrors.endDateMoment}
            momentEndDate={values.endDateMoment}
            nameEndDate="endDateMoment"
            updateValues={(newValues) => changeValues(newValues)}
            minDateMoment={moment()}
        />
        <InputField
            label="Wer"
            type="text"
            placeholder="Name"
            error={fieldErrors.who}
            onChange={onFormValueChange} 
            value={values.who}
            name="who"
        />
        <InputField
            label="Anzahl Personen"
            type="number"
            placeholder="Wie viele Personen?"
            error={fieldErrors.howMuch}
            onChange={onFormValueChange} 
            value={values.howMuch}
            name="howMuch"
        />
        <TextareaInputField
            label="Kommentar (optional)"
            rows="1"
            placeholder="Kommentar"
            error={fieldErrors.comment}
            onChange={onFormValueChange} 
            value={values.comment}
            name="comment"
        />
        <div className="buttonGroup">
            {children}
        </div>
    </div>
  )
}

export const initialValues = {
  startDateMoment: '',
  endDateMoment: '',
  who: '',
  howMuch: '',
  comment: ''
};

export const rules = {
  startDateMoment: [
    [value => value != '', 'Bitte gib eine gültige E-Mail ein'],
  ],
  endDateMoment: [
    [value => value != '', 'Bitte gib eine gültige E-Mail ein'],
  ],
  who: [
    [value => value != '', 'Bitte gib eine gültige E-Mail ein'],
  ],
  howMuch: [
    [value => value != '', 'Bitte gib ein Passwort ein'],
  ],
  comment: [
    /* option, no rules */
  ]
};