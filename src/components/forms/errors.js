import React from 'react';

export const ValidationError = (props) => {
    const {
        msg
    } = props;
    return (
        <div>
            {msg && <p className="validation-error">{msg}</p>}
        </div>
    );
}