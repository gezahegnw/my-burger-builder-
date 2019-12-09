import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

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
//the parameter is the payload
export const setTheIngredients = (ingredients) => {
        return {
            type: actionTypes.SET_INGREDIENT,
            myIngredients: ingredients
        };
};
export const ifThereNoIngredients = () => {
    return {
        type: actionTypes.IF_THERE_NO_INGREDIENTS
    };
};

//this is redux-thunk function that used for asyncrounse action 
export const initialIngredients = () => {
    return dispatch => {
        //my app firebase database link
            axios.get( 'https://my-react-burger-app-56803.firebaseio.com/ingredients.json' )
            .then( response => {
                dispatch(setTheIngredients(response.data));
            } )
            .catch( error => {
                dispatch(ifThereNoIngredients());
            } );
    };
};