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
        <div className="absolute bottom-6 w-11/12">
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
        <div onClick={() => onClick()} className={"w-full mb-4 pt-4 pb-4 rounded-lg text-m font-semibold " + className}>
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

/**
 * CARDS
 */

export const StoryCard = (props) => {
    const {
        headline,
        subheadline,
        imgUrl,
        onClick,
    } = props;
    return (
        <div className="relative h-52 rounded-lg overflow-hidden mb-4" onClick={onClick}>
            <img
                src={imgUrl}
                title="Story Preview Thumbnail"
                className="w-full h-full absolute top-0 left-0 object-cover object-center"
                alt="Story Preview Thumbnail"
            />
            <div className="absolute w-full h-full bg-black opacity-40 z-10"></div>
            <div className="absolute z-20 bottom-0 pl-3 pr-3 pb-5">
                <p className="text-white text-s pb-2">{subheadline}</p>
                <p className="text-white text-l font-semibold">{headline}</p>
            </div>
        </div>
    )
}