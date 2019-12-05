import React, { Component } from 'react';
import { connect } from 'react-redux';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import UserInput from '../../../components/UI/UserInput/UserInputCom';

class ContactData extends Component {
    state = {
       userInputForm: {
                name: {
                    formInputType: 'input',
                    formInputConfig: {
                        type: 'text',
                        placeholder: 'Enter Your Name'
                    },
                    value: '',
                    validation: {
                        required: true,
                        minLength: 2,
                        maxLength: 20
                    },
                    valid: false,
                    touched: false
                },
                street: {formInputType: 'input',
                        formInputConfig: {
                            type: 'text',
                            placeholder: 'Enter street '
                    },
                    value: '',
                    validation: {
                        required: true,
                        minLength: 2,
                        maxLength: 20
                    },
                    valid: false,
                    touched: false
                },
                state: {
                    formInputType: 'input',
                    formInputConfig: {
                        type: 'text',
                        placeholder: 'Enter state Name'
                    },
                    value: '',
                    validation: {
                        required: true,
                        minLength: 2,
                        maxLength: 20
                    },
                    valid: false,
                    touched: false
                },
                zipCode: {
                        formInputType: 'input',
                        formInputConfig: {
                            type: 'number',
                            placeholder: 'Enter ZIP code'
                    },
                    value: '',
                    validation: {
                        required: true,
                        minLength: 5,
                        maxLength: 9,
                        isNumeric: true
                    },
                    valid: false,
                    touched: false
                },
                email: {
                        formInputType: 'input',
                        formInputConfig: {
                            type: 'email',
                            placeholder: 'Enter Your E-mail'
                    },
                    value: '',
                    validation: {
                        required: true,
                        isEmail: true
                    },
                    valid: false,
                    touched: false
                },
                deliveryMethod: {
                        formInputType: 'select',
                        formInputConfig: {
                            options: [
                                {value: 'fastest', displayValue: 'Fastest'},
                                {value: 'cheapest', displayValue: 'Cheapest'}
                        ]
                    },
                    value: '',
                    valid: true,
                    validation: {
                        // required: true
                    }
                    
                }
        },
        isUserInputValid: false,
        loading: false
    }

    orderHandler = ( event ) => {
        event.preventDefault();
        this.setState( { loading: true } );
        const userFormInputData = {};
        //formElementId is the properties like name, street, zip code, state... past from userInputForm element
            for (let formElementId in this.state.userInputForm) {
                //.value is that we get it from user when the input it in form 
                userFormInputData[formElementId] = this.state.userInputForm[formElementId].value;

            }
        const yourOrder = {
            ingredients: this.props.ingrdnts,
            price: this.props.myPrice,
            orderData: userFormInputData
        }
        axios.post( '/orders.json', yourOrder )
            .then( response => {
                this.setState( { loading: false } );
                this.props.history.push('/');
            } )
            .catch( error => {
                this.setState( { loading: false } );
            } );
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
        console.log(event.target.value);
        const updateUserInputForm = {
            ...this.state.userInputForm
        };
        const updateUserInputFormElement = {
            ...updateUserInputForm[inputId]
        };
        updateUserInputFormElement.value = event.target.value;
        updateUserInputFormElement.valid = this.checkIfItsValid(updateUserInputFormElement.value, updateUserInputFormElement.validation);
        updateUserInputFormElement.touched = true;
        updateUserInputForm[inputId] = updateUserInputFormElement;
        console.log(updateUserInputFormElement);

        //check if user enter valid values 
        let isFormInputValid = true;
        for (let inputId in updateUserInputForm) {
            isFormInputValid = updateUserInputForm[inputId].valid && isFormInputValid;
        }
        this.setState({userInputForm: updateUserInputForm, isUserInputValid: isFormInputValid});
    }
    render () {
        //loop through the useInputForm properities and its value
        const userInputFormElementArray = [];
        for (let key in this.state.userInputForm) {
            userInputFormElementArray.push({
                id: key,
                config: this.state.userInputForm[key]
            });
        }
        let form = (
            <form onSubmit={this.orderHandler}>
               { userInputFormElementArray.map(userInputForm => (
                   <UserInput 
                   key={userInputForm.id}
                   formInputType={userInputForm.config.formInputType}
                   formInputConfig={userInputForm.config.formInputConfig}
                   value={userInputForm.config.value}
                   invalid={!userInputForm.config.valid}
                   shouldValidate={userInputForm.config.validation}
                   touched={userInputForm.config.touched}
                   changeInput={(event) => this.userInputChangeHandler (event, userInputForm.id) } />

               ))}
                <Button btnType="Success" disabled={!this.state.isUserInputValid}>ORDER</Button>
            </form>
        );
        if ( this.state.loading ) {
            form = <Spinner />;
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        );
    }
}
//creating redux state and then use in our app
const mapStateToProps = state => {
    return {
        ingrdnts: state.ingredients,
        myPrice: state.totalPrice
    }
}

export default connect(mapStateToProps) (ContactData);