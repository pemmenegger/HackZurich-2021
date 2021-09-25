import React from 'react';
import { withForegroundContext } from '../ForegroundContext';

class ConfirmAlert extends React.Component {
	constructor() {
		super();
        this.cancelOnClick = this.cancelOnClick.bind(this);
        this.confirmOnClick = this.confirmOnClick.bind(this);
    }

    cancelOnClick() {
        this.props.closePopup()
        if(this.props.resolve) {
            this.props.resolve()
        }
    }

    confirmOnClick() {
        this.props.closePopup()
        this.props.confirmOnClick()
    }

	render() {
		return (
            <div className="confirmAlert content">
                <h1>{this.props.title}</h1>
                <div className="inner">
                    <p>{this.props.message}</p>
                    <div className="buttonGroup">
                        <button className="btn-delete" onClick={this.confirmOnClick}>{this.props.confirmLabel}</button>
                        <button className="btn-cancel" onClick={this.cancelOnClick}>{this.props.cancelLabel ? this.props.cancelLabel : "Abbrechen"}</button>
                    </div>
                </div>
            </div>
		);
	}
}

export default withForegroundContext(ConfirmAlert)
