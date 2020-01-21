import React, { Component } from "react";
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './Auth.css';
import * as actions from '../../store/actions/index';

class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: "input",
                elementConfig: {
                    type: "email",
                    placeholder: "Email"
                },
                value: "",
                validations: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: "input",
                elementConfig: {
                    type: "password",
                    placeholder: "Password"
                },
                value: "",
                validations: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            },
        },
        isSignUpForm: false
    };

    componentDidMount() {
        if(!this.props.buildingBurger && this.props.authRedirectPath !== '/') {
            this.props.onSetAuthRedirectPath();
        }
    }

    checkValidations(value, rules) {
        let isValid = true;
        if (!rules) {
            return true;
        }
    
        if (rules.required) {
            isValid = value.trim() !== "" && isValid;
        }
        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }
        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }
        if (rules.isEmail) {
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            isValid = re.test(String(value).toLowerCase()) && isValid;
        }
    
        return isValid;
    }

    inputChangeHandler = (event, controlName) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkValidations(event.target.value, this.state.controls[controlName].validations),
                touched: true
            }
        };
        this.setState({controls: updatedControls});
    };

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignUpForm);
    }

    switchAuthHandler = () => {
        this.setState(prevState => {
            return {isSignUpForm: !prevState.isSignUpForm};
        });
    }

    render() {
        let formElementsArray = [];
        for (let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            });
        }

        let formData = formElementsArray.map(elem => (
            <Input
                key={elem.id}
                elementName={elem.id}
                elementType={elem.config.elementType}
                elementConfig={elem.config.elementConfig}
                value={elem.config.value}
                inValid={!elem.config.valid}
                shouldValidate={elem.config.validations}
                touched={elem.config.touched}
                changed={event => this.inputChangeHandler(event, elem.id)} />
        ));

        if (this.props.loading) {
            formData = <Spinner />
        }

        let errorMessage = null;
        if (this.props.error) {
            errorMessage = (
                <p>{this.props.error.message}</p>
            );
        }

        let authRedirect = null;
        if (this.props.isAuthenticated) {
            authRedirect = <Redirect to={this.props.authRedirectPath} />
        }

        return (
            <div className={classes.Auth}>
                {authRedirect}
                {errorMessage}
                <form onSubmit={this.submitHandler}>
                    {formData}
                    <Button btnType="Success">SUBMIT</Button>
                </form>
                <Button
                    clicked={this.switchAuthHandler} 
                    btnType="Danger">Switch to {this.state.isSignUpForm ? 'Sign IN' : 'Sign UP'}</Button>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        buildingBurger: state.burgerBuilder.burgerBuilding,
        authRedirectPath: state.auth.authRedirectPath
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignUpForm) => dispatch(actions.auth(email, password, isSignUpForm)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);