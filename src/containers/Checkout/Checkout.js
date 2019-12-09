import React, { Component } from 'react';
import { Route,  Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace( '/checkout/contact-data' );
    }

    render () {
        //this will redirect the checkout order page summary back to main/home burger page
         let orderSummary = <Redirect to="/" />
         if(this.props.mapIngredient) {
             //this will redirect from order summary page to home page after you submit your order
             const orderPageRedirect = this.props.orderPlaced ? <Redirect to="/" /> : null;
             orderSummary  = (
                <div>
                    {orderPageRedirect}
                    <CheckoutSummary
                        ingredients={this.props.mapIngredient}
                        checkoutCancelled={this.checkoutCancelledHandler}
                        checkoutContinued={this.checkoutContinuedHandler} />
                    <Route 
                        path={this.props.match.path + '/contact-data'} 
                        component={ContactData} />
                         
                </div>
            
            );
         }
        return orderSummary
        
    }
    
    }


const mapStateToProps = state => {
    return {
        mapIngredient: state.burgerBuilder.ingredients,
        //yourOrder data come from contactData.js
        orderPlaced: state.yourOrder.orderPlaced
    }
};

export default connect(mapStateToProps) (Checkout);