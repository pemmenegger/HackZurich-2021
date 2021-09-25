import React from 'react';

class AlertSuccess extends React.Component {

    render() {
        return (
            <div className="alert alert-success">
                {this.props.text}
            </div>
        );
    }
}

export default AlertSuccess