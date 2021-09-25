import React from "react";
import { CalendarFilterResults } from "./CalendarFilterResults.jsx";
import { Collapse } from './Collapse.jsx';
import FilterEntriesForm from "./forms/invalidated/FilterEntriesForm.jsx";

export class CalendarFilter extends React.Component {

    constructor() {
        super();
        this.state = {
            filteredCalendarEntries: []
        };
        this.updateFilteredCalendarEntries = this.updateFilteredCalendarEntries.bind(this);
    }

    updateFilteredCalendarEntries(filteredCalendarEntries) {
        this.setState({
            filteredCalendarEntries: []
        }, () => {
            this.setState({
                filteredCalendarEntries: filteredCalendarEntries
            });
        });
    }

    render() {
        const filterEntriesFormProps = { 
            ...this.props,
            updateFilteredCalendarEntries: this.updateFilteredCalendarEntries
        }

        const calendarFilterResultsProps = { 
            ...this.props,
            filteredCalendarEntries: this.state.filteredCalendarEntries
        }

        return (
            <div>
                <Collapse label="Einträge suchen">
                    <FilterEntriesForm {...filterEntriesFormProps} />
                </Collapse>
                <CalendarFilterResults {...calendarFilterResultsProps} />
            </div>
        )
    }
}

