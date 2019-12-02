import React from 'react';

import classes from './UserInput.css'

const userInput = (props) => {
    let userInputElement = null;
    const formInputClasses = [classes.UserInputElement];
    let validationError = null;
    let errorMessage = <p className={classes.ValidationError}>Please enter a valid value!</p>;
    if(props.invalid && props.shouldValidate && props.touched) {
        formInputClasses.push(classes.Invalid);
        validationError = errorMessage;
    }

    switch (props.formInputType) {
        case ('input'):
            userInputElement = <input
                className={formInputClasses.join(' ')}
                {...props.formInputConfig}
                value={props.value} 
                onChange={props.changeInput} />;
            break;
        case ('textarea'):
            userInputElement = <textarea 
                className={formInputClasses}
                {...props.formInputConfig}
                value={props.value} 
                onChange={props.changeInput}/>;
            break;
            case ('select'):
                userInputElement = (
                <select 
                // this will create and display the dropdown element
                    className={classes.UserInputElement}
                    value={props.value}
                        onChange={props.changeInput} >
                    {props.formInputConfig.options.map(myOption => (
                        <option
                            key={myOption.value}
                            value={myOption.value}>
                            {myOption.displayValue}
                        </option>
                    ))}
                </select>
                );
                break;
        default:
            userInputElement = <input
                className={formInputClasses}
                {...props.formInputConfig} 
                value={props.value} 
                onChange={props.changeInput} />;
            break;
    }
    return (
        <div className={classes.UserInput}>
            <label className={classes.Label}>{props.label}</label>
            {userInputElement}
            {validationError}
        </div>
    );
};

export default userInput;