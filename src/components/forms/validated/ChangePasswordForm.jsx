import React, { useContext } from 'react'
import { withFormValidation }  from './withFormValidation';
import { ButtonSubmit } from "../buttons"
import { InputField } from "../inputs"
import { changePassword } from "../../../services/rigiUserService"
import { openErrorAlert, openSuccessAlert } from "../../../rigiUtils"
import { ForegroundContext } from '../../context/ForegroundContext';

const ChangePasswordFormSkeleton = (props) => {
  const {
    onFormValueChange,
    onFormSubmit,
    values,
    fieldErrors,
    isSubmitting
  } = props;

  const foregroundContext = useContext(ForegroundContext);

  const handleOnFormSubmit = async () => {
    try {
      await onFormSubmit();
      openSuccessAlert(foregroundContext, 'Passwort erfolgreich geändert');
			foregroundContext.closeModal();
    } catch (e) {
      openErrorAlert(foregroundContext, e.message);
    }
  }

  return (
    <div>
        <InputField
            type="password"
            placeholder="Altes Passwort"
            error={fieldErrors.oldPassword}
            onChange={onFormValueChange} 
            value={values.oldPassword}
            name="oldPassword"
        />
        <InputField
            type="password"
            placeholder="Neues Passwort"
            error={fieldErrors.newPasswordOne}
            onChange={onFormValueChange} 
            value={values.newPasswordOne}
            name="newPasswordOne"
        />
        <InputField
            type="password"
            placeholder="Neues Passwort wiederholen"
            error={fieldErrors.newPasswordTwo}
            onChange={onFormValueChange} 
            value={values.newPasswordTwo}
            name="newPasswordTwo"
        />
        <ButtonSubmit
            isSubmitting={isSubmitting}
            value="Ändern" 
            onClick={handleOnFormSubmit}
        />
    </div>
  )
}

const initialValues = {
  oldPassword: '',
  newPasswordOne: '',
  newPasswordTwo: ''
};

const rules = {
  oldPassword: [
    [value => value != '', 'Bitte gib dein Passwort ein'],
  ],
  newPasswordOne: [
    [value => value != '', 'Bitte gib ein neues Passwort ein'],
  ],
  newPasswordTwo: [
    [value => value != '', 'Bitte gib erneut dein neues Passwort ein'],
  ]
};

const handlers = {
  onFormSubmit: async (values) => {
    try {
      if(values.newPasswordOne !== values.newPasswordTwo) {
        throw Error("Bitte zweimal das gleiche neue Passwort eingeben")
      }
      let response = await changePassword(values.oldPassword, values.newPasswordOne)
      return response
    } catch (error) {
      return error
    }
  }
}

export default withFormValidation(initialValues, rules, handlers, ChangePasswordFormSkeleton);