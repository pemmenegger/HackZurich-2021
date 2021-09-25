import React from 'react';
import FadeInOut from '../components/transitions/FadeInOut.jsx';
import { Question, QuestionTitle, ButtonPrimary, ButtonSecondary, Logo, OrSeparator } from "../components/stateless.js"
import StoryCard from '../components/StoryCard';
import { withRouter } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

class Questions extends React.Component {
	
	constructor() {
		super();
        this.state = {
            step: 'time',
        };
	}

    changeView(newView) {
        this.setState({
            step: newView
        })
    }

    renderCurrentQuestion() {
        let step = this.state.step;
        switch(step) {
            case 'story':
                return (
                    <Question>
                        <QuestionTitle>
                            <h1>How much <span>time</span> do you have?</h1>
                        </QuestionTitle>
                        <p>slider</p>
                        <ButtonPrimary value="Next" onClick={() => this.changeView('mood')}/>
                    </Question>
                )
            case 'mood':
                return (
                    <Question>
                        <QuestionTitle>
                            <h1>What do you <span>like</span> right now?</h1>
                        </QuestionTitle>
                        <ButtonSecondary value="Reading"/>
                        <ButtonSecondary value="Listening"/>
                        <ButtonSecondary value="Watching"/>
                        <ButtonPrimary value="Next" onClick={() => this.changeView('story')}/>
                    </Question>
                )
            case 'time':
                return (
                    <Question>
                        <QuestionTitle>
                            <h1>Choose your <span>story</span></h1>
                        </QuestionTitle>
                        <StoryCard 
                            headline="Mit Satellitenaufnahmen die Probleme der Welt lösen"
                            subheadline="Google Earth Engine"
                            imgUrl="https://www.srf.ch/static/cms/images/1280ws/d7f593.webp"
                        /> 
                        <StoryCard 
                            headline="Corona-Tests sollen kosten – Bundesrat gewährt aber Schonfrist"
                            subheadline="Entscheid zum Covid-Zertifikat"
                            imgUrl="https://www.srf.ch/static/cms/images/1280ws/b8d245.webp"
                        /> 
                        <OrSeparator/>
                        <ButtonSecondary value="Explore"/>
                        <ButtonSecondary value="Daily News"/>
                    </Question>
                )
            default: 
                return <p>No step</p>
        }
    }
	
	render() {
		return (
			<div className="content">
				<Logo />
                <TransitionGroup>
                    <CSSTransition key={this.state.step} timeout={400} classNames="fade" exit={false} >
                        {this.renderCurrentQuestion()}
                    </CSSTransition>
                </TransitionGroup>
			</div>
		);
	}
}

export default withRouter(Questions);