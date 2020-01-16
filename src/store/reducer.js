import * as actionTypes from './actions';

const initialState = {
    ingredients: {
        salad: 0,
        cheese: 0,
        meat: 0,
        bacon: 0
    },
    totalPrice: 3
};

const INTEGREDIENT_PRICES = {
    salad: 0.45,
    cheese: 0.35,
    meat: 1.45,
    bacon: 0.65
  };

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                },
                totalPrice: state.totalPrice + INTEGREDIENT_PRICES[action.ingredientName]
            };
        case actionTypes.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                },
                totalPrice: state.totalPrice - INTEGREDIENT_PRICES[action.ingredientName]
            };
        default:
            return state;
    }
};

export default reducer;