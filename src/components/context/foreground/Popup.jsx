import React from 'react'

export class Popup extends React.Component {
    constructor() {
        super();
        this.popupContent = React.createRef();
        this.componentToOpenInPopup = React.createRef();
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    componentDidMount() {
        document.addEventListener('click', this.handleClickOutside, true);
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handleClickOutside, true);
    }

    handleClickOutside(event) {
        if (this.popupContent.current && !this.popupContent.current.contains(event.target)) {
            // ConfirmAlert cancelOnClick()
            if(this.componentToOpenInPopup.current.cancelOnClick) {
                this.componentToOpenInPopup.current.cancelOnClick()
            }
            else {
                this.props.close();
            }
        }
    }

    render() {
        let componentToOpenInPopup = this.props.component;
		let isPopupOpened = false;

		if (componentToOpenInPopup) {
            componentToOpenInPopup = React.cloneElement(componentToOpenInPopup, {ref: this.componentToOpenInPopup})
			isPopupOpened = true;
		}

        return (
            isPopupOpened ? 
                <div className='popup'>
                    <div className='popup_inner content' ref={this.popupContent}>
                        {componentToOpenInPopup}
                    </div>
                </div> : 
                <div></div>
        );
    }
}