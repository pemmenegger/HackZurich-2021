import React, { useContext } from 'react'
import { withFormValidation }  from './withFormValidation';
import { ButtonSubmit, ButtonSecondary } from "../buttons"
import { InputField } from "../inputs"
import { resetPassword } from "../../../services/rigiUserService"
import { openErrorAlert, openSuccessAlert } from "../../../rigiUtils"
import { ForegroundContext } from '../../context/ForegroundContext';

const ResetPasswordFormSkeleton = (props) => {
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
        openSuccessAlert(foregroundContext, 'Passwort erfolgreich zurückgesetzt. Du erhältst nun eine E-Mail.');
	    this.props.showLoginForm();
    } catch (e) {
      openErrorAlert(foregroundContext, e.message);
    }
  }

  const handleOnGoToLogin = () => {
    props.openLoginForm()
  }

  return (
    <div>
        <InputField
            type="email"
            placeholder="E-Mail"
            error={fieldErrors.email}
            onChange={onFormValueChange} 
            value={values.email}
            name="email"
        />
        <ButtonSubmit
            isSubmitting={isSubmitting}
            value="Zurücksetzen" 
            onClick={handleOnFormSubmit}
        />
        <ButtonSecondary 
            value="Zurück zum Login" 
            onClick={handleOnGoToLogin}
        />
    </div>
  )
}

const initialValues = {
  email: ''
};

const rules = {
  email: [
    [value => value != '', 'Bitte gib deine E-Mail ein'],
  ]
};

const handlers = {
  onFormSubmit: async (values) => {
    try {
      let response = await resetPassword(values.email)
      return response
    } catch (error) {
      return error
    }
  }
}

export default withFormValidation(initialValues, rules, handlers, ResetPasswordFormSkeleton);