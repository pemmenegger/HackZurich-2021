import React from 'react';

const Button = (props) => {
    const {
        isSubmitting,
        value,
        onClick,
        theme,
    } = props;
    return (
        <button onClick={() => onClick()} className={theme}>
            {isSubmitting ? <div className="loadingSubmit"></div> : value}
        </button>
    )
}

export const ButtonSubmit = (props) => {
    return (
        <Button {...props} theme="btn-primary"/>
    )
}

export const ButtonSecondary = (props) => {
    return (
        <Button {...props} theme="btn-secondary" />
    )
}

export const ButtonDelete = (props) => {
    let value = props.value ? props.value : "Löschen";
    return (
        <Button {...props} value={value} theme="btn-delete"/>
    )
}

export const ButtonCancel = (props) => {
    let value = props.value ? props.value : "Abbrechen";
    return (
        <Button {...props} value={value} theme="btn-cancel"/>
    )
}