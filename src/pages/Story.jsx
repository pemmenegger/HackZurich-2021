import React from 'react';
import Header from '../components/sections/Header.jsx';
import { Dropbox } from '../components/sections/Dropbox.jsx';
import Notes from '../components/sections/Notes.jsx';
import Heating from '../components/sections/Heating.jsx';
import { NewEntry } from '../components/sections/NewEntry.jsx';
import Footer from '../components/sections/Footer.jsx';
import { DarkGreySection, LightGreySection, WhiteSection } from '../components/sections/sections';
import { withRouter } from 'react-router-dom';

class Story extends React.Component {
	
	constructor() {
		super();
	}
	
	render() {
		return (
			<div>
				<Header />
				<DarkGreySection title="Dropbox">
					<Dropbox /> 
				</DarkGreySection>
				<DarkGreySection title="Notizen">
					<Notes />
				</DarkGreySection>
				<WhiteSection title="Heizungs-Status">
					<Heating />
				</WhiteSection>
				
				<DarkGreySection title="Neuer Eintrag">
					<NewEntry />
				</DarkGreySection>
				<Footer />
			</div>
		);
	}
}

export default withRouter(Story);