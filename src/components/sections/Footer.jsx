import React from 'react';
import { openErrorAlert } from '../../rigiUtils.js';
import ChangePasswordForm from '../forms/validated/ChangePasswordForm.jsx';
import { logout } from '../../services/rigiUserService';
import { withSessionSettingsContext } from "../context/SessionSettingsContext"
import { withForegroundContext } from "../context/ForegroundContext"

class Footer extends React.Component {

	constructor() {
        super();
        this.logoutRigiUser = this.logoutRigiUser.bind(this);
	}

	logoutRigiUser() {
        try {
            let onSuccessCallback = () => {this.props.SessionSettingsContext.updateRigiUser(null)}
            logout(onSuccessCallback)
        } catch (e) {
            openErrorAlert(e.message);
        }
    }
    
	render() {
		return (
			<div className="footer">
                <div className="content">
                    <div className="user">
                        <p>
                            <span onClick={() => this.props.foregroundContext.openModal("Passwort ändern", <ChangePasswordForm/>)}>
                                Passwort ändern
                            </span>
                        </p>
                        <p>
                            <span onClick={this.logoutRigiUser}>Logout</span>
                        </p>
                    </div>
                    <div className="tinystudio">
                        © {moment().format('YYYY')} by <a href="http://www.tinystudio.ch">Tinystudio</a>. Bitte
                        nicht kopieren.
                    </div>
                </div>
            </div>
		);
	}
}

export default withSessionSettingsContext(withForegroundContext(Footer));