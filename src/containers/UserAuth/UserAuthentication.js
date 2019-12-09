import React, { Component } from 'react';

import UserInput from '../../components/UI/UserInput/UserInputCom';
import Button from '../../components/UI/Button/Button';
import classes from './UserAuthentication.css';

class UserAuthentication extends Component {
    state = {
        formControls: {
            email: {
                formInputType: 'input',
                formInputConfig: {
                    type: 'email',
                    placeholder: 'Enter  email address'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                formInputType: 'input',
                formInputConfig: {
                    type: 'password',
                    placeholder: 'Enter Your password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6,
                },
                valid: false,
                touched: false
            },
        }
    }
    inputChangeHandler = ( event, controlName ) => {
        event.preventDefault();
        const userFormInputData = {
                ...this.state.formControls,
                [controlName]: {
                    ...this.state.formControls[controlName],
                    value: event.target.value,
                    valid: this.checkIfItsValid(event.target.value,
                    this.state.formControls[controlName]. validation),
                    touched: true
                }
        };
        this.setState({formControls: userFormInputData});
        
    }
    checkIfItsValid(value, rules)  {
        let isValid = true;
        if (!rules) {
            return true;
        }
        
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }
        return isValid;
    }
    //event handler method that handle user input changes
    userInputChangeHandler = (event, inputId) => {
        //console.log(event.target.value);
        const updateUserInputForm = {
            ...this.state.formControls
        };
        const updateUserInputFormElement = {
            ...updateUserInputForm[inputId]
        };
        updateUserInputFormElement.value = event.target.value;
        updateUserInputFormElement.valid = this.checkIfItsValid(updateUserInputFormElement.value, updateUserInputFormElement.validation);
        updateUserInputFormElement.touched = true;
        updateUserInputForm[inputId] = updateUserInputFormElement;
       // console.log(updateUserInputFormElement);

        //check if user enter valid values 
        let isFormInputValid = true;
        for (let inputId in updateUserInputForm) {
            isFormInputValid = updateUserInputForm[inputId].valid && isFormInputValid;
        }
        this.setState({formControls: updateUserInputForm, isUserInputValid: isFormInputValid});
    }
    render () {
             //loop through the useInputForm properities and its value
             const userInputFormElementArray = [];
             for (let key in this.state.formControls) {
                 userInputFormElementArray.push({
                     id: key,
                     config: this.state.formControls[key]
                 });
             }
             let form = (
                 <form onSubmit={this.inputChangeHandler}>
                    { userInputFormElementArray.map(formControls => (
                        <UserInput 
                        key={formControls.id}
                        formInputType={formControls.config.formInputType}
                        formInputConfig={formControls.config.formInputConfig}
                        value={formControls.config.value}
                        invalid={!formControls.config.valid}
                        shouldValidate={formControls.config.validation}
                        touched={formControls.config.touched}
                        changeInput={(event) => this.userInputChangeHandler (event, formControls.id) } />
     
                    ))}
                     <Button btnType="Success" disabled={!this.state.isUserInputValid}>Submit</Button>
                 </form>
             );
        return (
            <div className={classes.UserAuthentication}>
                 <h4>Login or SignUp</h4>
                {form}
            </div>
        );
    }
}

export default UserAuthentication;