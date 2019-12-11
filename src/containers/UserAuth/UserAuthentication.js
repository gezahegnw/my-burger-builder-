import React, { Component } from 'react';
import { connect } from 'react-redux';

import UserInput from '../../components/UI/UserInput/UserInputCom';
import Spinner from '../../components/UI/Spinner/Spinner';
import Button from '../../components/UI/Button/Button';
import classes from './UserAuthentication.css';
import * as actions from '../../store/actions/actionIndex';

const signIn ={
    background: "red",
    borderRadius: 8,
    color: 'white',
    height: 40,
    width: 100
  };
  const signUp ={
    background: "green",
    borderRadius: 8,
    color: 'white',
    height: 40,
    width: 100
  };
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
            }
        },
        isSignup: true
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
    userInputChangeHandler= ( event, controlName ) => {
        const userFormInputData = {
                ...this.state.formControls,
                [controlName]: {
                    ...this.state.formControls[controlName],
                    value: event.target.value,
                    valid: this.checkIfItsValid(event.target.value,
                    this.state.formControls[controlName].validation),
                    touched: true
                }
        };
        this.setState({formControls: userFormInputData});
    }
    submitHandler = (e) => {
        e.preventDefault();
        this.props.onUserAuth(
            this.state.formControls.email.value,
            this.state.formControls.password.value,
            this.state.isSignup
        );
    }
    //to switch if user signIn or signup
    switchUserAuthHandler = () => {
        this.setState(prevState => {
            return {isSignup: !prevState.isSignup};
        });
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
             let form = userInputFormElementArray.map(formControls => (
                        <UserInput 
                        key={formControls.id}
                        formInputType={formControls.config.formInputType}
                        formInputConfig={formControls.config.formInputConfig}
                        value={formControls.config.value}
                        invalid={!formControls.config.valid}
                        shouldValidate={formControls.config.validation}
                        touched={formControls.config.touched}
                        changeInput={(event) => this.userInputChangeHandler (event, formControls.id) } />
     
                    ));
            //this for spinner 
            if (this.props.loading) {
                form = <Spinner />
            }
            //this will show error message from firebase API 
            let showLogInErrorMessage = null;
            if (this.props.error) {
                showLogInErrorMessage = (
                <p style={{color: 'red', fontSize: 20}}>{this.props.error.message}</p>
                );

            }

        return (
            <div className={classes.UserAuthentication}>
                {showLogInErrorMessage}
                <form onSubmit={this.submitHandler}>
                 <h4>Login or SignUp</h4>
                {form}
                <Button btnType="Success" >Submit</Button>
                 </form>
                 If you are already signup, please sign In by using your log In credentials! <br />
                 <Button 
                     clicked={this.switchUserAuthHandler}
                     btnType='Danger'>Switch to 
                     {this.state.isSignup ? <button style={signIn}> SIGN IN</button> : <button style={signUp}> SIGN UP</button>}
                 </Button>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.authReducer.loading,
        error: state.authReducer.error
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onUserAuth: (email, password, isSignup) => dispatch(actions.userAuthentication(email, password, isSignup))
    };
};

export default connect(mapStateToProps, mapDispatchToProps) (UserAuthentication);