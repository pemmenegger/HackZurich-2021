import React from 'react';

export const Question = (props) => {
    return (
        <div className="font-body">
            {props.children}
        </div>
    )
}

export const StickyBottom = (props) => {
    return (
        <div className="absolute bottom-3 w-11/12">
            {props.children}
        </div>
    )
}

export const Logo = (props) => {
    return (
        <img
          src={process.env.PUBLIC_URL +'/logo.png'}
          title="Story Hub"
          className="mt-12 mb-9 mr-auto ml-auto w-16 h-auto"
          alt="Story Hub Logo"
        />
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


export const SelectedIcon = (props) => {
    return (
        <img
          src={process.env.PUBLIC_URL +'/selected.png'}
          title="Selected"
          className={props.className}
          alt="Selected"
        />
    )
}


/**
 * BUTTONS
 */

const Button = (props) => {
    const {
        value,
        onClick,
        className,
    } = props;

    return (
        <div onClick={() => onClick()} className={"w-full mb-4 pt-4 pb-4 rounded-lg text-m	" + className}>
            {value}
        </div>
    )
}

export const ButtonPrimary = (props) => {
    return (
        <Button {...props} className="bg-violett text-white text-center"/>
    )
}

export const ButtonSecondary = (props) => {
    return (
        <Button {...props} className="bg-white text-black border border-black text-center" />
    )
}

export const ButtonSelect = (props) => {
    const {
        isSelected
    } = props;
    return (
        <div className="relative h-70">
            <Button {...props} className="bg-lightGrey text-black text-left pl-4" />
            {isSelected ? <SelectedIcon className="h-5 w-auto absolute right-0 top-1/2 transform -translate-y-1/2 mr-4" /> : null}            
        </div>
    )
}