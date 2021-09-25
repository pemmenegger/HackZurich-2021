import React from "react";
import EntryCard from "./EntryCard.jsx";

export class CalendarFilterResults extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            filteredCalendarEntries: this.props.filteredCalendarEntries,
        };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.filteredCalendarEntries !== prevState.filteredCalendarEntries) {
            return {
                filteredCalendarEntries: nextProps.filteredCalendarEntries
            };
        }
        return null;
    }

    generateFilteredEntryCards() {
        let filteredCalendarEntries = this.state.filteredCalendarEntries;
		let entryCards = [];

		if (filteredCalendarEntries.length == 0) {
			entryCards.push( 
				<p key={1} className="emptyCard emptyEntry">
					Es hat momentan niemand geplant, auf die Windegg zu gehen, schade!
				</p>
			);
		} else {
			for (let i = 0; i < filteredCalendarEntries.length; i++) {
				let entry = filteredCalendarEntries[i];

                const entryCardProps = { 
                    ...this.props,
                    key: i,
					entry: entry
                }
				entryCards.push(<EntryCard {...entryCardProps} />);
			}
		}

		return entryCards;
    }

    render() {
        let filteredEntryCards = this.generateFilteredEntryCards();
        return (
            <div>
                {filteredEntryCards}
            </div>
        )
    }
}

