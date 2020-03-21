import {
    ADD_PRODUCT_ERROR,
    ADD_PRODUCT_REQUEST,
    ADD_PRODUCT_SUCCESS, ORDER_PRODUCTS_ERROR, ORDER_PRODUCTS_REQUEST,
    ORDER_PRODUCTS_SUCCESS
} from "../Actions/actionTypes";

const initialState = {
    products: [],
    product: {},
    load: false,
    error: null
};

const reducerProducts = (state = initialState, action) => {
    switch (action.type) {
        case ADD_PRODUCT_SUCCESS:
            return {...state, error: null, load : false};
        case ADD_PRODUCT_REQUEST:
            return {...state, load: true};
        case ADD_PRODUCT_ERROR:
            return {...state, error: action.error, load: false};
        case ORDER_PRODUCTS_SUCCESS:
            return {...state, products: action.products, load: false, error: null };
        case ORDER_PRODUCTS_REQUEST:
            return {...state, load: true};
        case ORDER_PRODUCTS_ERROR:
            return {...state, error: action.error, load: false};
        default:
            return state
    }
};

export default reducerProducts;