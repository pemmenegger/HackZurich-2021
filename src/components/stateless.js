import React from 'react';

export const Question = (props) => {
    return (
        <div className="question">
            {props.children}
        </div>
    )
}

export const QuestionTitle = (props) => {
    return (
        <div className="title">
            {props.children}
        </div>
    )
}

export const Logo = (props) => {
    return (
        <div className="logo">
            {props.children}
        </div>
    )
}

export const OrSeparator = (props) => {
    return (
        <div className="or-separator">
            <p>or</p>
        </div>
    )
}

/**
 * ICONS
 */

const Icon = (props) => {
    const {
        onClick,
        icon,
    } = props;
    return (
        <div onClick={() => onClick()} className={"icon " + icon}></div>
    )
}

export const CloseIcon = (props) => {
    return (
        <Icon {...props} icon="close-icon"/>
    )
}

export const SettingsIcon = (props) => {
    return (
        <Icon {...props} icon="settings-icon"/>
    )
}

/**
 * BUTTONS
 */

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

export const ButtonPrimary = (props) => {
    return (
        <Button {...props} theme="btn-primary"/>
    )
}

export const ButtonSecondary = (props) => {
    return (
        <Button {...props} theme="btn-secondary" />
    )
}