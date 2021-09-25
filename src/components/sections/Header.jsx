import React from 'react';
import { withSessionSettingsContext } from "../context/SessionSettingsContext"

class Header extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
        <div className="header">
            <h1>Grüezi, {this.props.SessionSettingsContext.rigiUser.firstname}</h1>
        </div>
    );
  }
}

export default withSessionSettingsContext(Header);