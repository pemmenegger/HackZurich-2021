import React, { useContext } from 'react'
import { ForegroundContext } from '../context/ForegroundContext';
import { switchDatesIfNeeded } from "../../rigiUtils"

const WithLabelAbove = (props) => {
    const {
        label,
        children,
    } = props;
    return (
        <React.Fragment>
            {label && <label>{label}</label>}
            {children}
        </React.Fragment>
    );
}

const InputWrapper = (props) => {
    const {
        error,
        children,
    } = props;
    return (
        <div className={"input-wrapper " + (error && 'invalid')}>
            {children}
            {error && <div className="error-message">{error}</div>}
        </div>
    );
}

const DatepickerInputWrapper = (props) => {
    const {
        children,
    } = props;
    return (
        <div className="dateInput">
            {children}
        </div>
    );
}

const Input = (props) => {
    const {
        ...otherProps
    } = props;
    return <input {...otherProps} />
}

const ClearableInput = (props) => {
    const {
        onClearValue,
        ...otherProps
    } = props;
    return (
        <WithLabelAbove {...otherProps}>
            <span className="clearable">
                <Input {...otherProps} />
                <i className="clearIcon" onClick={() => onClearValue()}>&times;</i>
            </span>
        </WithLabelAbove>
    )
}

const Textarea = (props) => {
    const {
        ...otherProps
    } = props;
    return <textarea {...otherProps} />
}

const DatepickerInput = (props) => {
    const extendedProps = { 
        ...props,
        type: 'text',
        placeholder: "TT.MM.JJJJ",
        value: props.datemoment ? props.datemoment.format("DD.MM.YYYY") : ''
    }
    return <ClearableInput {...extendedProps} />
}

/***************************
 * INPUT FIELDS TO EXPORT
 ***************************/

export const InputField = (props) => {
    return (
        <InputWrapper {...props}>
            <WithLabelAbove {...props}>
                <Input {...props} />
            </WithLabelAbove>
        </InputWrapper>
    );
}

export const ClearableInputField = (props) => {
    return (
        <InputWrapper {...props}>
            <ClearableInput {...props} />
        </InputWrapper>
    );
}

export const TextareaInputField = (props) => {
    return (
        <InputWrapper {...props}>
            <WithLabelAbove {...props}>
                <Textarea {...props} />
            </WithLabelAbove>
        </InputWrapper>
    );
}

export const CheckboxField = (props) => {
    return (
        <InputWrapper>
            <div className="checkboxWrapper">
                <input 
                    type="checkbox" 
                    id={props.id} 
                    checked={props.checked}
                    onChange={props.onChange} 
                />
                <label htmlFor={props.id}>{props.label}</label>
            </div>
        </InputWrapper>
    )
}

export const MultiSelectField = (props) => {
    return (
        <InputWrapper>
            <WithLabelAbove {...props}>
                <Select
                    placeholder={props.placeholder}
                    value={props.value}
                    options={props.options}
                    onChange={props.onChange}
                    isMulti={true}
                    classNamePrefix="rigi-select"
                    noOptionsMessage={() => "Keine Treffer!"}
                />
            </WithLabelAbove>
        </InputWrapper>
    )
}

export const DatepickerRangeInputFields = (props) => {

    const foregroundContext = useContext(ForegroundContext);

    const updateAndCloseDatepicker = (clickedStartDateMoment, clickedEndDateMoment) => {
        const { startDateMoment, endDateMoment} = switchDatesIfNeeded(clickedStartDateMoment, clickedEndDateMoment);

        // be careful! startDateMoment and endDateMoment has to be named the same way as the passed value states
        let newValues = {
            startDateMoment: startDateMoment,
            endDateMoment: endDateMoment
        }
        props.updateValues(newValues)
        foregroundContext.closePopup()
    }
  
    const openDatepicker = (datepickerProps) => {
        let startDateMoment = props.momentStartDate
        let endDateMoment = props.momentEndDate

        const extendedProps = { 
            ...props,
            id: datepickerProps.id,
            isStartDate: datepickerProps.isStartDate ? true : false,
            isEndDate: datepickerProps.isEndDate ? true : false,
            startDateMoment: startDateMoment, 
            endDateMoment: endDateMoment,
            minDateMoment: props.minDateMoment ? props.minDateMoment : '',
            onDayClicked: datepickerProps.onDayClicked
        }
        foregroundContext.openPopup(<DatepickerCalendarWidget {...extendedProps} />)
    }

    const openStartDatepicker = () => {
        const datepickerProps = { 
            id: "datepickerStartDate",
            isStartDate: true,
            onDayClicked: (clickedStartDateMoment) => updateAndCloseDatepicker(clickedStartDateMoment, props.momentEndDate),
        }
        openDatepicker(datepickerProps)
    }

    const openEndDatepicker = () => {
        const datepickerProps = { 
            id: "datepickerEndDate",
            isEndDate: true,
            onDayClicked: (clickedEndDateMoment) => updateAndCloseDatepicker(props.momentStartDate, clickedEndDateMoment),
        }
        openDatepicker(datepickerProps)
    }

    const startDateProps = { 
        label: 'Ab',
        error: props.errorStartDate,
        datemoment: props.momentStartDate,
        name: props.nameStartDate,
        onClick: () => openStartDatepicker(),
        onChange: () => {}, // do nothing,
        onClearValue: () => props.updateValues({startDateMoment: ''})
    }

    const endDateProps = { 
        label: 'Bis',
        error: props.errorEndDate,
        datemoment: props.momentEndDate,
        name: props.nameEndDate,
        onClick: () => openEndDatepicker(),
        onChange: () => {}, // do nothing,
        onClearValue: () => props.updateValues({endDateMoment: ''})
    }

    return (
        <DatepickerInputWrapper>
            <InputWrapper {...startDateProps}>
                <DatepickerInput {...startDateProps}/>
            </InputWrapper>
            <InputWrapper {...endDateProps}>
                <DatepickerInput {...endDateProps}/> 
            </InputWrapper>
        </DatepickerInputWrapper>
    );
}