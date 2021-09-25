import React from 'react';
import AppRouter from "./routing/AppRouter";
import { RigiUserProvider } from './components/context/SessionSettingsContext';
import { ForegroundProvider } from "./components/context/ForegroundContext";

// css
import './index.scss';

export default class App extends React.Component {
	constructor() {
		super();
		this.state = {
			modalTitle: null,
			componentToOpenInModel: null,
			isModalOpen: false,
			componentToOpenInPopup: null,
			isPopupOpen: false,
			rigiUser: {},
		};

		/*
		this.updateRigiUser = this.updateRigiUser.bind(this);
		this.openModal = this.openModal.bind(this);
		this.openPopup = this.openPopup.bind(this);
		this.closeModal = this.closeModal.bind(this);
		this.closePopup = this.closePopup.bind(this);
		this.removeModalFromDom = this.removeModalFromDom.bind(this);
		this.removePopupFromDom = this.removePopupFromDom.bind(this);*/
	}

	openModal(modalTitle, componentToOpenInModel) {
		this.setState({
			modalTitle: modalTitle,
			componentToOpenInModel: componentToOpenInModel,
			isModalOpen: true
		});
	}

	openPopup(componentToOpenInPopup) {		
		this.setState({
			componentToOpenInPopup: componentToOpenInPopup,
			isPopupOpen: true
		});
	}

	closeModal() {
		this.setState({
			isModalOpen: false
		});
	}

	closePopup() {
		this.setState({
			isPopupOpen: false
		});
	}

	removeModalFromDom() {
		this.setState({
			modalTitle: null,
			componentToOpenInModel: null,
		});
	}

	removePopupFromDom() {
		this.setState({
			componentToOpenInPopup: null
		});
	}

	render() {
		/*
		let curPage;
		if (this.state.rigiUser.uid) {
			curPage = 
				<Home 
					updateRigiUser={this.updateRigiUser}
					openModal={this.openModal}
					closeModal={this.closeModal}
					openPopup={this.openPopup}
					closePopup={this.closePopup}
				/>;
		} else {
			curPage = 
				<Login
					updateRigiUser={this.updateRigiUser}
				/>;
		}

		if (this.state.componentToOpenInModel || this.state.componentToOpenInPopup) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = 'auto';
		}*/

		return (
			<ForegroundProvider>
				<AppRouter />
			</ForegroundProvider>
		);
	}
}