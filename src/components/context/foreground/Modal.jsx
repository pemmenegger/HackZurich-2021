import React from 'react';
import { ButtonCancel } from '../../forms/buttons';

export class Modal extends React.Component {
	constructor() {
		super();
	}

	render() {
		let component = this.props.component;
		let isModalOpened = false;
		var classes = "modal ";

		if (component) {
			isModalOpened = true;
			classes += "modal-is-open";
		}

		return (
			<div className={classes}>  
				{isModalOpened ? 
					<div className="modal-inner">
						<div className="content">
							<h1>{this.props.title}</h1>  
							{component}
							<ButtonCancel onClick={this.props.close} />
						</div> 
					</div> : 
					null
				}		
			</div>
		);
	}
}
