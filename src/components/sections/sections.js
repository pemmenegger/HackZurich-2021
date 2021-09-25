import React from 'react';

const Section = (props) => {
    const {
        theme,
        title,
        children,
    } = props;
    return (
        <div className={"section " + theme}>
            <div className="content">
                <h1>{title}</h1>
                {children}
            </div>
        </div>
    );
}

export const DarkGreySection = (props) => {
    return <Section {...props} theme="dark-grey-bg" />;
}

export const LightGreySection = (props) => {
    return <Section {...props} theme="light-grey-bg" />;
}

export const WhiteSection = (props) => {
    return <Section {...props} theme="white-bg" />;
}