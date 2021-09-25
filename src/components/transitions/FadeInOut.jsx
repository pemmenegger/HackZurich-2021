import React from "react";
import { CSSTransition } from 'react-transition-group';

class FadeInOut extends React.Component{
  
    render() {
        const extendedProps = { 
            ...this.props,
            timeout: 150, // has to be the same amount as in fadeInOut.scss
            classNames: "fadeInOut",
            unmountOnExit: true,
            mountOnEnter: true
        }
        return (
            <CSSTransition {...extendedProps}>
                {this.props.children}
            </CSSTransition>
        )
    }
}

export default FadeInOut;