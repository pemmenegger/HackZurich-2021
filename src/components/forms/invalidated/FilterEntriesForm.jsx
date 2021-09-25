import React from 'react';

import { openSuccessAlert, openErrorAlert, switchDatesIfNeeded, generatePdfFromCalendarEntries } from '../../../rigiUtils.js';
import { DatepickerRangeInputFields, MultiSelectField, CheckboxField } from '../inputs';
import { ButtonSubmit, ButtonDelete } from "../buttons";
import ConfirmAlert from '../../context/foreground/ConfirmAlert.jsx';
import { withSessionSettingsContext } from "../../context/SessionSettingsContext"
import { withForegroundContext } from "../../context/ForegroundContext"

class FilterEntriesForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
            isPrintSubmitting: false,
            calendarEntries: this.props.calendarEntries,
            startDateMoment: moment(),
            endDateMoment: null,
            filteredUsers: [],
            isOnlyMine: false
		};
		this.handleSearch = this.handleSearch.bind(this);
		this.filter = this.filter.bind(this);
        this.updateFilteredUsers = this.updateFilteredUsers.bind(this);
        this.resetFilterWithConfirmation = this.resetFilterWithConfirmation.bind(this);
        this.toggleOnlyMine = this.toggleOnlyMine.bind(this);
	}

    componentDidUpdate(prevProps, prevState) {
        if (this.state.calendarEntries !== prevState.calendarEntries) {
            // after getDerivedStateFromProps() has changed the state
            this.filter();
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.calendarEntries !== prevState.calendarEntries) {
            return {
                calendarEntries: nextProps.calendarEntries
            };
        }
        return null;
    }

    handleSearch(resolve) {
        // TODO: collapse close
        this.filter(resolve);
    }
    
    filter(resolve) {
        let calendarEntries = this.state.calendarEntries;
        let startDateMoment = this.state.startDateMoment;
        let endDateMoment = this.state.endDateMoment;
        let filteredUsers = this.state.filteredUsers;

        let filteredCalendarEntries = calendarEntries.filter((entry) => {
            let isEntryFiltered = true;
            if(startDateMoment && startDateMoment.isValid()) {
                let entryDateToMoment = moment(entry.dateTo, "YYYY-MM-DD")
                isEntryFiltered = isEntryFiltered && startDateMoment.isSameOrBefore(entryDateToMoment)
            }
            if(isEntryFiltered && endDateMoment && endDateMoment.isValid()) {
                let entryDateFromMoment = moment(entry.dateFrom, "YYYY-MM-DD")
                isEntryFiltered = isEntryFiltered && entryDateFromMoment.isSameOrBefore(endDateMoment)
            }
            if(isEntryFiltered && filteredUsers.length > 0) {
                let filteredUserKeys = Object.keys(filteredUsers).map((key) => filteredUsers[key]["value"]);
                isEntryFiltered = isEntryFiltered && filteredUserKeys.includes(entry.userKey)
            }
            return isEntryFiltered;
        });
        this.props.updateFilteredCalendarEntries(filteredCalendarEntries);
        if(resolve) {
            resolve();
        }
        return filteredCalendarEntries; // used for printing
    }

    resetFilterWithConfirmation(resolve) {
        this.props.foregroundContext.openPopup(<ConfirmAlert 
            closePopup={this.props.foregroundContext.closePopup}
            resolve={resolve}
            title="Filter zurücksetzen?"
            message="Der Filter wird auf Anfang zurückgesetzt."
            confirmLabel="Zurücksetzen"
            confirmOnClick={() => {
                this.setState({
                    startDateMoment: moment(),
                    endDateMoment: null,
                    filteredUsers: [],
                    isOnlyMine: false
                }, () => {
                    this.filter(resolve);
                    openSuccessAlert('Filter wurde zurückesetzt');
                })
            }}
        />);
    }

    updateDatepicker(clickedStartDateMoment, clickedEndDateMoment) {
        const { startDateMoment, endDateMoment} = switchDatesIfNeeded(clickedStartDateMoment, clickedEndDateMoment);
        this.setState({
            startDateMoment: startDateMoment,
            endDateMoment: endDateMoment
        });
        this.props.foregroundContext.closePopup()
    }

    updateFilteredUsers(selectedOptions) {
        let isOnlyMine = false
        if(selectedOptions.length === 1 && selectedOptions[0].value === this.props.SessionSettingsContext.rigiUser.uid){
            isOnlyMine = true
        }

        this.setState({
            filteredUsers: selectedOptions,
            isOnlyMine: isOnlyMine
        });
    }

    toggleOnlyMine(){
        let selectedOptions = [];
        if(!this.state.isOnlyMine) {
            selectedOptions.push({
                value: this.props.SessionSettingsContext.rigiUser.uid,
                label: this.props.SessionSettingsContext.rigiUser.firstname
            })
        };

        this.setState({
            isOnlyMine: !this.state.isOnlyMine,
            filteredUsers: selectedOptions
        });
        
        this.updateFilteredUsers(selectedOptions);
    }

    async handlePrint() {
        this.setState({ isPrintSubmitting: true });

        let startDateMoment = this.state.startDateMoment
        let endDateMoment = this.state.endDateMoment
        let calendarEntries = this.filter()
        let allRigiUsers = this.props.SessionSettingsContext.allRigiUsers

        try {
            await generatePdfFromCalendarEntries(startDateMoment, endDateMoment, calendarEntries, allRigiUsers)
            openSuccessAlert(this.props.foregroundContext, "PDF wurde erstellt")
        } catch(e) {
            openErrorAlert(this.props.foregroundContext, "PDF konnte nicht erstellt werden")
        } finally {
            this.setState({ isPrintSubmitting: false });
        }
    }

	render() {
		return (
			<div>
                <DatepickerRangeInputFields
                    momentStartDate={this.state.startDateMoment}
                    momentEndDate={this.state.endDateMoment}
                    updateValues={(newValues) => this.setState(newValues)}
                />
                <MultiSelectField   
                    label="Personen"
                    placeholder="Personen wählen..."
                    value={this.state.filteredUsers}
                    options={this.props.SessionSettingsContext.allRigiUsers}
                    onChange={this.updateFilteredUsers}
                />
                <CheckboxField
                    label="Nur meine Einträge"
                    id="onlyMine"
                    checked={this.state.isOnlyMine}
                    onChange={this.toggleOnlyMine}
                />
                <div className="buttonGroup">
                    <ButtonSubmit 
                        value="Suchen" 
                        onClick={this.handleSearch}
                    />
                    <ButtonDelete 
                        value="Zurücksetzen"
                        onClick={this.resetFilterWithConfirmation} 
                    />
                    {this.props.SessionSettingsContext.rigiUser.isAdmin && 
                        <ButtonSubmit 
                            isSubmitting={this.state.isPrintSubmitting}
                            value="Drucken"
                            onClick={() => this.handlePrint()}
                        /> 
                    }
                </div>
			</div>
		);
	}
}

export default withSessionSettingsContext(withForegroundContext(FilterEntriesForm));