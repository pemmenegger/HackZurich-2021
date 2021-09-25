import React from 'react';

class Alert extends React.Component {

    render() {
        return (
            <div className="alert-wrapper">
                {this.props.component ? this.props.component : null}
            </div>
        );
    }
}

export default Alert;