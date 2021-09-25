import React, {Component} from "react";
import FadeInOut from "../transitions/FadeInOut";
import { Modal } from "./foreground/Modal"
import { Popup } from "./foreground/Popup"
import Alert from "./foreground/Alert"

export const ForegroundContext = React.createContext();

export const withForegroundContext = WrappedComponent => {
  return React.forwardRef((props, forwardRef) => (
    <ForegroundContext.Consumer>
        {value => <WrappedComponent {...props} foregroundContext={value} ref={forwardRef}/>}
    </ForegroundContext.Consumer>
  ));
};

export class ForegroundProvider extends Component {

  constructor() {
    super();
    this.state = {
      // alert
      isAlertShown: false,
      componentAsAlert: null,
      showAlert: (componentAsAlert, removeAfterMillis) => {
        this.showAlert(componentAsAlert, removeAfterMillis)
      },
      // modal
      modalTitle: null,
      isModalOpen: false,
      componentAsModal: null,
      openModal: (modalTitle, componentAsModal) => {
        this.openModal(modalTitle, componentAsModal)
      },
      closeModal: () => {
        this.closeModal()
      },
      // popup
      isPopupOpen: false,
      componentAsPopup: null,
      openPopup: (componentAsPopup) => {
        this.openPopup(componentAsPopup)
      },
      closePopup: () => {
        this.closePopup()
      }
    };

    this.closeAlert = this.closeAlert.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.closePopup = this.closePopup.bind(this)
  }

  // alert
  showAlert(componentAsAlert, removeAfterMillis) {
    this.openAlert(componentAsAlert)

    setTimeout(() => { 
      this.closeAlert()
    }, removeAfterMillis);
  }

  openAlert(componentAsAlert) {
    this.setState({
      componentAsAlert: componentAsAlert
    }, this.setState({
      isAlertShown: true,
    }))
  }

  closeAlert() {
    this.setState({
      isAlertShown: false 
    })
  }

  // modal
  openModal(modalTitle, componentAsModal) {
    this.setState({
      componentAsModal: componentAsModal,
      modalTitle: modalTitle
    }, this.setState({
      isModalOpen: true,
    }))
  }

  closeModal() {
    this.setState({
      isModalOpen: false 
    })
  }

  // popup
  openPopup(componentAsPopup) {
    this.setState({
      componentAsPopup: componentAsPopup
    }, this.setState({
      isPopupOpen: true,
    }))
  }

  closePopup() {
    this.setState({
      isPopupOpen: false 
    })
  }

  render() {
    let {isAlertShown, componentAsAlert} = this.state
    let {isModalOpen, modalTitle, componentAsModal, closeModal} = this.state
    let {isPopupOpen, componentAsPopup, closePopup} = this.state
    return (
        <ForegroundContext.Provider value={this.state}>
            <div className="foreground" id="foreground">
                <FadeInOut in={isAlertShown}>
                  <Alert component={componentAsAlert} />
                </FadeInOut>
                <FadeInOut in={isModalOpen}>
                  <Modal title={modalTitle} component={componentAsModal} close={closeModal} />
                </FadeInOut>
                <FadeInOut in={isPopupOpen}>
                  <Popup component={componentAsPopup} close={closePopup} />
                </FadeInOut>
                {this.props.children}
            </div>
        </ForegroundContext.Provider>
    );
  }
}