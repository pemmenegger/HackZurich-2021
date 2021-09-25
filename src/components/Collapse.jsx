import React from "react";
import { CSSTransition } from 'react-transition-group';

export class Collapse extends React.Component{
    constructor() {
        super()
        this.contentInner = React.createRef();
        this.state = {
            isOpen: false,
            contentMaxHeight: 0
        };
        this.updateMaxHeight = this.updateMaxHeight.bind(this);
        this.removeMaxHeight = this.removeMaxHeight.bind(this);
    }

    componentDidMount() {
        window.addEventListener("resize", this.updateMaxHeight);
    }

    updateMaxHeight() {
        if(this.contentInner && this.contentInner.current) {
            this.setState({
                contentMaxHeight: this.contentInner.current.offsetHeight
            })
        }
    }

    removeMaxHeight() {
        if(this.contentInner && this.contentInner.current) {
            this.setState({
                contentMaxHeight: 0
            })
        }
    }
    
    render() {
        let classNamesLabel = "collapseLabel"
        if(this.state.isOpen) {
            classNamesLabel += " collapsed"
        }
    
        return (
            <div className="collapseWrapper">
                <div className={classNamesLabel} onClick={() => this.setState({isOpen: !this.state.isOpen})}>
                    <p>{this.props.label}</p>
                    <div className="arrow"></div>
                </div>
                <CSSTransition 
                    in={this.state.isOpen} 
                    timeout={500} // has to be the same amount as in collapse.scss (.collapseContent)
                    classNames="collapse"
                    onEnter={this.updateMaxHeight}
                    onExit={this.removeMaxHeight}
                    className="collapseContentWrapper"
                    style={{maxHeight: this.state.contentMaxHeight}}
                >   
                    <div>
                        <div className="collapseContentInner" style={{overflow: 'visible'}} ref={this.contentInner}>
                            {this.props.children}
                        </div>
                    </div>
                </CSSTransition>
            </div>
        )
    }
}