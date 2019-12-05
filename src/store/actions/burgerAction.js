import * as actionTypes from './actionTypes';

export const addIngredients = (theNameOfTheIngredients) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: theNameOfTheIngredients
    };
};

export const removeIngredients = (theNameOfTheIngredients) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: theNameOfTheIngredients
    };
};