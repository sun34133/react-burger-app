import React, { Component } from "react";
import { connect } from 'react-redux';

import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";
import classes from "./ContactData.css";
import axios from "../../../axios-orders";
import Input from "../../../components/UI/Input/Input";
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as orderActions from "../../../store/actions/index";

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Name"
        },
        value: "",
        validations: {
          required: true
        },
        valid: false,
        touched: false
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Street"
        },
        value: "",
        validations: {
          required: true
        },
        valid: false,
        touched: false
      },
      zipCode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Zip Code"
        },
        value: "",
        validations: {
          required: true,
          minLength: 5,
          maxLength: 5
        },
        valid: false,
        touched: false
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Country"
        },
        value: "",
        validations: {
          required: true
        },
        valid: false,
        touched: false
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your Email"
        },
        value: "",
        validations: {
          required: true
        },
        valid: false,
        touched: false
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "fastest", displayValue: "Fastest" },
            { value: "cheapest", displayValue: "Cheapest" }
          ]
        },
        value: "fastest",
        validations: {},
        valid: true
      }
    },
    isFormValid: false,
    // loading: false
  };

  orderHandler = event => {
    event.preventDefault();
    // this.setState({ loading: true });
    const formData = {};
    for (let formElemKey in this.state.orderForm) {
      formData[formElemKey] = this.state.orderForm[formElemKey].value;
    }
    const order = {
      ingredients: this.props.ingreds,
      price: this.props.totPrice,
      orderData: formData
    };

    this.props.onOrderBurger(order, this.props.token);
    // axios
    //   .post("/orders.json", order)
    //   .then(response => {
    //     this.setState({ loading: false });
    //     this.props.history.push("/");
    //   })
    //   .catch(error => {
    //     this.setState({ loading: false });
    //   });
  };

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

    return isValid;
  }

  inputChangeHandler = (event, elemIdentifier) => {
    const updatedOrderForm = {
      ...this.state.orderForm
    };
    const updatedFormElement = {
      ...updatedOrderForm[elemIdentifier]
    };
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = this.checkValidations(
      updatedFormElement.value,
      updatedFormElement.validations
    );
    updatedFormElement.touched = true;
    updatedOrderForm[elemIdentifier] = updatedFormElement;

    let isFormValid = true;
    for (let inputIdent in updatedOrderForm) {
      isFormValid = updatedOrderForm[inputIdent].valid && isFormValid;
    }

    this.setState({ orderForm: updatedOrderForm, isFormValid: isFormValid });
  };

  render() {
    let formElements = [];
    for (let key in this.state.orderForm) {
      formElements.push({
        id: key,
        config: this.state.orderForm[key]
      });
    }

    let form = (
      <form onSubmit={this.orderHandler}>
        {formElements.map(elem => (
          <Input
            key={elem.id}
            elementName={elem.id}
            elementType={elem.config.elementType}
            elementConfig={elem.config.elementConfig}
            value={elem.config.value}
            inValid={!elem.config.valid}
            shouldValidate={elem.config.validations}
            touched={elem.config.touched}
            changed={event => this.inputChangeHandler(event, elem.id)}
          />
        ))}
        <Button btnType="Success" disabled={!this.state.isFormValid}>
          ORDER
        </Button>
      </form>
    );
    if (this.props.loading) {
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
        <h4>Please enter contact details</h4>
        {form}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ingreds: state.burgerBuilder.ingredients,
    totPrice: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onOrderBurger: (orderData, token) => dispatch(orderActions.purchaseBurger(orderData, token)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));
