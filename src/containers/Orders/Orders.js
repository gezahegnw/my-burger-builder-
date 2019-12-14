import React, { Component } from 'react';
import { connect } from 'react-redux';

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/actionIndex';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {
    // state = {
    //     orders: [],
    //     loading: true
    // }

    componentDidMount() {
        //this data came from orderActions.js file
        this.props.onFetchingOrders(this.props.myToken);
        // axios.get('/orders.json')
        //     .then(res => {
        //         const fetchedOrders = [];
        //         for (let key in res.data) {
        //             fetchedOrders.push({
        //                 ...res.data[key],
        //                 id: key
        //             });
        //         }
        //         this.setState({loading: false, orders: fetchedOrders});
        //     })
        //     .catch(err => {
        //         this.setState({loading: false});
        //     });
    }

    render () {
        //this will show spinner depends of the page state
        let showTheSpinner = <Spinner />
        if(!this.props.loading) {
            showTheSpinner = this.props.newOrder.map(order => (
                    <Order 
                        key={order.id}
                        ingredients={order.ingredients}
                        price={order.price} />
                ))
        }
      
        return (
            <div>
                {showTheSpinner}
            </div>
        );
    }
}
//this code for state chenege just like setState function methods in react 
//we use redux here instead of react setState method
const mapStateToProps =  state => {
    return {
        //here yourOrder came from orderReducer.js
        newOrder: state.yourOrder.yourOrder,
        loading: state.yourOrder.loading,
        myToken: state.authReducer.token
    };
};


const mapDispatchToProps = dispatch => {
    return {
        onFetchingOrders: (token) => dispatch(actions.fetchTheOrders(token))
    };
};

export default connect (mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));