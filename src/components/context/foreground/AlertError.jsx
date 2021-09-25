import React from 'react';

class AlertError extends React.Component {

    render() {
        return (
            <div className="alert alert-error">
                {this.props.text}
            </div>
        );
    }
}

export default AlertError