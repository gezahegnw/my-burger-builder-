import React, { Component } from 'react';
import { connect } from 'react-redux';

import Auxiliary from '../../hoc/AuxiliaryFolder/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';
import * as actions from '../../store/actions/actionIndex';

// const INGREDIENT_PRICES = {
//     salad: 0.5,
//     cheese: 0.4,
//     meat: 1.3,
//     bacon: 0.7
// };

export class BurgerBuilder extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {...}
    // }
    state = {
       // ingredients: null,
       // totalPrice: 4,
       // purchasable: false,
        purchasing: false,
        // loading: false,
        // error: false
    }

    //use the fellowing code only if you are not using REDUX since we are using redux, we do not need to use this code here
    //instead we set up this code in burgerAction.js file by using redux-thunk
    componentDidMount () {
        //console.log(this.props);
        this.props.onInitialIngredients();
        // axios.get( 'https://my-react-burger-app-56803.firebaseio.com/ingredients.json' )
        
        //     .then( response => {
        //         this.setState( { ingredients: response.data } );
        //     } )
        //     .catch( error => {
        //         this.setState( { error: true } );
        //     } );
    }

    updatePurchaseState ( ingredients ) {
        const sum = Object.keys( ingredients )
            .map( igKey => {
                return ingredients[igKey];
            } )
            .reduce( ( sum, el ) => {
                return sum + el;
            }, 0 );
        return sum > 0 ;
    }

   

    purchaseHandler = () => {
        //id the user already logged in, then you can add any ingredients you want 
        //if you are not logged in then you can not add ingredients it will redirect to log in page for user authentcation prupose
        if (this.props.isAuthenticated) {
            this.setState( { purchasing: true } );
        }
        else {
            this.props.onSetAuthenticatedUserRedirectPath('/checkOut');
            this.props.history.push("/user-authentication");
        }
    }

    purchaseCancelHandler = () => {
        this.setState( { purchasing: false } );
    }

    purchaseContinueHandler = () => {
        // alert('You continue!');  
        this.props.onInitialOrder();    
        this.props.history.push('/checkout');
    }
    render () {
        const disabledInfo = {
            ...this.props.mapIng
        };
        for ( let key in disabledInfo ) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        let orderSummary = null;
        let burger = this.props.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;

        if ( this.props.mapIng ) {
            burger = (
                <Auxiliary>
                    <Burger ingredients={this.props.mapIng} />
                    <BuildControls
                        ingredientAdded={this.props.addTheIngredients}
                        ingredientRemoved={this.props.removeTheIngredients}
                        disabled={disabledInfo}
                        purchasable={this.updatePurchaseState(this.props.mapIng)}
                        ordered={this.purchaseHandler}
                        isUserAuthenticated={this.props.isAuthenticated}
                        price={this.props.addPrice} />
                </Auxiliary>
            );
            orderSummary = <OrderSummary
                ingredients={this.props.mapIng}
                price={this.props.addPrice}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler} />;
        }
        // if ( this.state.loading ) {
        //     orderSummary = <Spinner />;
        // }
        // {salad: true, meat: false, ...}
        return (
            <Auxiliary>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Auxiliary>
        );
    }
}

const mapStateToProps = state => {
    return {
        mapIng: state.burgerBuilder.ingredients,
        addPrice: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.authReducer.token !== null
    }
}
const mapDispatchToProps = dispatch => {
    return {
        addTheIngredients: (nameOfIngredient) => dispatch(actions.addIngredients (nameOfIngredient)),
        removeTheIngredients: (nameOfIngredient) => dispatch(actions.removeIngredients(nameOfIngredient)),
        onInitialIngredients: () => dispatch(actions.initialIngredients()),
        onInitialOrder: () => dispatch(actions.orderSummaryPage()),
        onSetAuthenticatedUserRedirectPath: (path) => dispatch(actions.setAuthenticatedUserRedirectPath(path))
    }
}
export default connect(mapStateToProps, mapDispatchToProps) (withErrorHandler( BurgerBuilder, axios ));