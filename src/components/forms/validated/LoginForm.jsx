import React, { useContext } from 'react'
import { withFormValidation }  from './withFormValidation';
import { ButtonSubmit, ButtonSecondary } from "../buttons"
import { InputField } from "../inputs"
import { login } from "../../../services/rigiUserService"
import { openErrorAlert } from "../../../rigiUtils"
import { SessionSettingsContext } from '../../context/SessionSettingsContext';
import { ForegroundContext } from '../../context/ForegroundContext';

const LoginFormSkeleton = (props) => {
  const {
    onFormValueChange,
    onFormSubmit,
    values,
    fieldErrors,
    isSubmitting
  } = props;

  const SessionSettingsContext = useContext(SessionSettingsContext);
  const foregroundContext = useContext(ForegroundContext);

  const handleOnFormSubmit = async () => {
    try {
      let firebaseUser = await onFormSubmit();
      SessionSettingsContext.updateRigiUser(firebaseUser)
    } catch (e) {
      openErrorAlert(foregroundContext, e.message);
    }
  }

  const handleOnResetPassword = () => {
    props.openResetPasswordForm()
  }

  return (
    <div>
        <InputField
            type="text"
            placeholder="E-Mail"
            error={fieldErrors.email}
            onChange={onFormValueChange} 
            value={values.email}
            name="email"
        />
        <InputField
            type="password"
            placeholder="Passwort"
            error={fieldErrors.password}
            onChange={onFormValueChange} 
            value={values.password}
            name="password"
        />
        <ButtonSubmit
            isSubmitting={isSubmitting}
            value="Anmelden" 
            onClick={handleOnFormSubmit}
        />
        <ButtonSecondary
            value="Passwort vergessen?" 
            onClick={handleOnResetPassword}
        />
    </div>
  )
}

const initialValues = {
  email: '',
  password: ''
};

const rules = {
  email: [
    [value => value != '', 'Bitte gib eine gültige E-Mail ein'],
  ],
  password: [
    [value => value != '', 'Bitte gib ein Passwort ein'],
  ]
};

const handlers = {
  onFormSubmit: async (values) => {
    try {
      let response = await login(values.email, values.password)
      return response
    } catch (error) {
      return error
    }
  }
}

export default withFormValidation(initialValues, rules, handlers, LoginFormSkeleton);