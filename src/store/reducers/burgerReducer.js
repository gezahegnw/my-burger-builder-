import * as actionTypes from '../actions/actionTypes';

const initialState = {
        ingredients: null,
        totalPrice: 1,
        error: false,
        makingBurger: false
};
const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 0.5,
    bacon: 0.3,
    sauce: 0.20,
    chicken: 0.7
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                },
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
                makingBurger: true

            };
        case actionTypes.REMOVE_INGREDIENT:
                return {
                    ...state,
                    ingredients: {
                        ...state.ingredients,
                        [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                    },
                    totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
                    makingBurger: true

                };
        case actionTypes.SET_INGREDIENT: 
                return {
                    ...state,
                    ingredients: action.myIngredients,
                    //this totalPrice 2 will reset the total price after you submitted your order
                    totalPrice: 1,
                    error: false,
                    makingBurger: false
                };
        case actionTypes.IF_THERE_NO_INGREDIENTS: 
                return {
                    ...state,
                    error: true
                };
        default:
            return state;
        }
};

export default reducer;