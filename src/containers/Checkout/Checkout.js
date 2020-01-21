import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";

class Checkout extends Component {
  // state = {
  //   ingredients: null,
  //   totalPrice: 0
  // };

  // componentWillMount() {
    // this.props.onInitPurchase();
  //   const query = new URLSearchParams(this.props.location.search);
  //   const ingredientsArr = {};
  //   let price = 0;
  //   for (let param of query.entries()) {
  //     // ['key', 'value']
  //     if (param[0] === "price") {
  //       price = param[1];
  //     } else {
  //       ingredientsArr[param[0]] = +param[1];
  //     }
  //   }

  //   this.setState({ ingredients: ingredientsArr, totalPrice: price });
  // }

  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  };

  checkoutContinuedHandler = () => {
    this.props.history.replace("/checkout/contact-data");
  };

  render() {
    let summary = <Redirect to="/" />;
    if (this.props.ingrds) {

      const purchasedRedirect = this.props.purchased ? <Redirect to="/" /> : null;

      summary = (
        <div>
          {purchasedRedirect}
          <CheckoutSummary
            ingredients={this.props.ingrds}
            checkoutCancelled={this.checkoutCancelledHandler}
            checkoutContinued={this.checkoutContinuedHandler}
          />
          <Route
            path={this.props.match.path + "/contact-data"}
            component={ContactData}
          />
        </div>
      );
    }

    return summary;
  }
}

const mapStateToProps = state => {
  return {
    ingrds: state.burgerBuilder.ingredients,
    purchased: state.order.purchased
  };
};


export default connect(mapStateToProps)(Checkout);
