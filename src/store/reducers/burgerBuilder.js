import * as actionTypes from '../actions/actionTypes';
import { updatedObject } from '../utility';

const initialState = {
    ingredients: null,
    totalPrice: 3.25,
    error: false
};

const INTEGREDIENT_PRICES = {
    salad: 0.45,
    cheese: 0.35,
    meat: 1.45,
    bacon: 0.65
};

const addIngredient = (state, action) => {
    const updatedIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] + 1 };
    const updatedIngredients = updatedObject(state.ingredients, updatedIngredient);
    const updatedState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + INTEGREDIENT_PRICES[action.ingredientName]
    }
    return updatedObject(state, updatedState);
    // return {
    //     ...state,
    //     ingredients: {
    //         ...state.ingredients,
    //         [action.ingredientName]: state.ingredients[action.ingredientName] + 1
    //     },
    //     totalPrice: state.totalPrice + INTEGREDIENT_PRICES[action.ingredientName]
    // };
};

const removeIngredient = (state, action) => {
    const updatedIngred = { [action.ingredientName]: state.ingredients[action.ingredientName] - 1 };
    const updatedIngreds = updatedObject(state.ingredients, updatedIngred);
    const updatedStateR = {
        ingredients: updatedIngreds,
        totalPrice: state.totalPrice - INTEGREDIENT_PRICES[action.ingredientName]
    }
    return updatedObject(state, updatedStateR);
};

const setIngredients = (state, action) => {
    return updatedObject(state, {
        ingredients: action.ingredients,
        error: false,
        totalPrice: 3.25
    });
};

const fetchIngredientsFailed = (state, action) => {
    return updatedObject(state, { error: true });
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.ADD_INGREDIENT: return addIngredient(state, action);
        case actionTypes.REMOVE_INGREDIENT: return removeIngredient(state, action);
        case actionTypes.SET_INGREDIENTS: return setIngredients(state, action);
        case actionTypes.FETCH_INGREDIENTS_FAILED: return fetchIngredientsFailed(state, action);
        default: return state;
    }
};

export default reducer;