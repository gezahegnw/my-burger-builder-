import React from 'react';

import classes from './UserInput.css'

const userInput = (props) => {
    let userInputElement = null;

    switch (props.inputtype) {
        case ('input'):
            userInputElement = <input className={classes.UserInputElement} {...props} />;
            break;
        case ('textarea'):
            userInputElement = <textarea className={classes.UserInputElement} {...props} />;
            break;
        default:
            userInputElement = <input className={classes.UserInputElement}  {...props} />;
            break;
    }
    return (
        <div className={classes.UserInput}>
            <label className={classes.Label}>{props.label}</label>
            {userInputElement}
        </div>
    );
};

export default userInput;