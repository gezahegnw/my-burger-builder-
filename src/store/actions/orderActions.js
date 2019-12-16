import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

//syncrounse data
export const orderSuccessful = (id, orderData) => {
    return {
        type: actionTypes.ORDER_SUCCESSFUL,
        orderId: id,
        myOrderData: orderData
    };
};
//syncrounse data
export const orderFail = (error) => {
    return {
        type: actionTypes.ORDER_FAIL,
        error: error
    };
};
//redux action creater 
export const startOrdering = () => {
    return {
        type: actionTypes.START_ORDERING
    };
};

export const orderSummaryPage = () => {
    return {
        type: actionTypes.ORDER_SUMMARY_PAGE
    };
};
//asyncrounse data that we get it from firebase database from our burger builder app
export const startTheOrder = (orderData, token) => {
    return dispatch => {
        dispatch(startOrdering());
        axios.post( '/orders.json?auth=' + token, orderData )
            .then( response => {
                dispatch(orderSuccessful(response.data.name, orderData));
            } )
            .catch( error => {
               dispatch(orderFail(error));
            } );
    };
};
//for fetching data from firebase
export const initialOrderFitchSuccessful = (getOrders) => {
    return {
        type: actionTypes.INITIAL_ORDER_FITCH_SUCCESSFUL,
        newOrders: getOrders
    };
};
export const initialOrderFitchFail = (error) => {
    return {
        type: actionTypes.INITIAL_ORDER_FITCH_FAIL,
        error: error
    };
};

export const initialOrderFitchStart = () => {
    return {
        type: actionTypes.INITIAL_ORDER_FITCH_START
    };
};
//fitching data to firebase
export const fetchTheOrders = (token, userId) => {
    return dispatch => {
        const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';

        axios.get('/orders.json' + queryParams)
        .then(res => {
            const fetchedOrders = [];
            for (let key in res.data) {
                fetchedOrders.push({
                    ...res.data[key],
                    id: key
                });
            }
            dispatch(initialOrderFitchSuccessful(fetchedOrders));
           // this.setState({loading: false, orders: fetchedOrders});
        })
        .catch(error => {
            dispatch(initialOrderFitchFail(error));
            //this.setState({loading: false});
        });
    };
}
;








