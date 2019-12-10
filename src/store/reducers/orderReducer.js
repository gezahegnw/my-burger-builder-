import * as actionTypes from '../actions/actionTypes';

const initialState = {
    yourOrder: [],
    loading: false,
    orderPlaced: false
};

const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ORDER_SUMMARY_PAGE: 
        return {
            ...state,
            orderPlaced: false
        };
        case actionTypes.START_ORDERING: 
            return {
                ...state,
                loading: true
            };
        
        case actionTypes.ORDER_SUCCESSFUL:
            const addNewOrder = {
                ...action.myOrderData,
                id: action.orderId
            };
            return {
                ...state,
                loading: false,
                orderPlaced: true,
                yourOrder: state.yourOrder.concat(addNewOrder)
            };
    case actionTypes.ORDER_FAIL: 
            return {
                ...state,
                loading: false
            };
    case actionTypes.INITIAL_ORDER_FITCH_START: 
            return {
                ...state,
                loading: true
            };
    case actionTypes.INITIAL_ORDER_FITCH_SUCCESSFUL:
            return{
                ...state,
                yourOrder: action.newOrders,
                loading: false
            };
    case actionTypes.INITIAL_ORDER_FITCH_FAIL:
            return {
                ...state,
                loading: false
            };
    default:
        return state;
    }
};


//we export yourOrder and loading state to order.js file and use it there
export default orderReducer;