import React from 'react';
import FadeInOut from '../components/transitions/FadeInOut.jsx';
import { Question, QuestionTitle, ButtonPrimary, ButtonSecondary, Logo, OrSeparator, ButtonSelect } from "../components/stateless.js"
import StoryCard from '../components/StoryCard';
import  { CustomizedSlider } from '../components/CustomizedSlider';
import { withRouter } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { api, handleError } from '../components/api.js';

class Questions extends React.Component {
	
	constructor() {
		super();
        this.state = {
            step: 'time',
            time: 15,
            format: 'best-experience',
            stories: null
        };
	}

    changeStep(newStep) {
        this.setState({
            step: newStep
        })
    }

    changeTime(newTime) {
        this.setState({
            time: newTime
        })
    }

    changeFormat(newFormat) {
        this.setState({
            format: newFormat
        })
    }

    async requestStories() {
        try {
            const requestBody = JSON.stringify({
                time: this.state.time * 60,
                format: this.state.format,
                interests: [
                    "Europe",
                    "Technology"
                ]
            });
            const response = await api.post(`/stage/selectStories`, requestBody);
            let data = JSON.parse(response.data.body)
            this.setState({
                stories: data.storyIds
            })
            console.log(this.state.stories)
        } catch (error) {
            handleError(error)
            console.log(error)
        } finally {
            this.changeStep('story')
        }
    }

    openStory(storyId) {
        this.props.history.push({
            pathname: '/story',
            state: { storyId: storyId },
        })
    }   

    renderCurrentQuestion() {
        let step = this.state.step;
        switch(step) {
            case 'time':
                return (
                    <Question>
                        <QuestionTitle>
                            <h1>How much <span>time</span> do you have?</h1>
                        </QuestionTitle>
                        <CustomizedSlider value={this.state.time} onChange={(newValue) => this.changeTime(newValue)}/>
                        <div className="sticky-bottom">
                            <ButtonPrimary value="Next" onClick={() => this.changeStep('mood')}/>
                        </div>
                    </Question>
                )
            case 'mood':
                return (
                    <Question>
                        <QuestionTitle>
                            <h1>What do you <span>like</span> right now?</h1>
                        </QuestionTitle>

                        <ButtonSelect value="Best experience" isSelected={this.state.format === 'best-experience'} onClick={() => this.changeFormat('best-experience')}/>
                        <ButtonSelect value="Only Videos" isSelected={this.state.format === 'only-videos'} onClick={() => this.changeFormat('only-videos')}/>
                        <ButtonSelect value="Only Audios" isSelected={this.state.format === 'only-audios'} onClick={() => this.changeFormat('only-audios')}/>

                        <div className="sticky-bottom">
                            <ButtonPrimary value="Next" onClick={() => this.requestStories()}/>
                        </div>
                    </Question>
                )
            case 'story':
                return (
                    <Question>
                        <QuestionTitle>
                            <h1>Choose your <span>story</span></h1>
                        </QuestionTitle>
                        <StoryCard 
                            onClick={() => this.openStory(this.state.stories[0].id)}
                            headline={this.state.stories[0].title}
                            subheadline={this.state.stories[0].lead}
                            imgUrl={this.state.stories[0].thumbnail}
                        /> 
                        <StoryCard 
                            onClick={() => this.openStory(this.state.stories[1].id)}
                            headline={this.state.stories[1].title}
                            subheadline={this.state.stories[1].lead}
                            imgUrl={this.state.stories[1].thumbnail}
                        /> 
                        <OrSeparator/>
                        <ButtonSecondary 
                            value="Explore"
                            onClick={() => this.openStory(this.state.stories[2].id)}
                        />
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