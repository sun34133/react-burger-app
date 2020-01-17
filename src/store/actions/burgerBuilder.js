import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const addIngredient = (ingName) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: ingName
    }
};

export const removeIngredient = (ingName) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: ingName
    }
};

export const setIngredients = (ingreds) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingreds
    }
};

export const fetchIngredientsFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    }
}

export const initIngredients = () => {
    return dispacth => {
        axios.get("/ingredients.json")
            .then(response => {
                dispacth(setIngredients(response.data));
            })
            .catch(error => {
                dispacth(fetchIngredientsFailed());
            });
    };
};