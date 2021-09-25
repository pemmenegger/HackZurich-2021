import React from 'react';
import { withFormValidation }  from './withFormValidation';
import { ButtonSubmit } from "../buttons"
import { TextareaInputField } from "../inputs"
import { openSuccessAlert, openErrorAlert } from "../../../rigiUtils"
import { createNote } from "../../../services/notesService"

const NewNoteFormSkeleton = (props) => {
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
      //openSuccessAlert('Auftrag wurde hinzugefügt');
    } catch (e) {
      // console.log(e);
      //openErrorAlert('Auftrag konnte nicht hinzugefügt werden');
    }
  }

  return (
    <div>
        <TextareaInputField
            rows="2"
            placeholder="Auftrag"
            error={fieldErrors.noteText}
            onChange={onFormValueChange} 
            value={values.noteText}
            name="noteText"
        />
        <ButtonSubmit 
            isSubmitting={isSubmitting}
            value="Hinzufügen" 
            onClick={handleOnFormSubmit}
        />
    </div>
  )
}

const initialValues = {
  noteText: ''
};

const rules = {
  noteText: [
    [value => value != '', 'Bitte das Feld ausfüllen!'],
  ]
};

const handlers = {
  onFormSubmit: async (values) => {
    try {
      await createNote(values.noteText)
      openSuccessAlert('Auftrag wurde hinzugefügt');
    } catch (error) {
      openErrorAlert('Auftrag konnte nicht hinzugefügt werden');
      console.log(error)
    }
  }
}

export default withFormValidation(initialValues, rules, handlers, NewNoteFormSkeleton);