import {
    ADD_PRODUCT_ERROR,
    ADD_PRODUCT_REQUEST,
    ADD_PRODUCT_SUCCESS, DELETE_PRODUCT_ERROR, DELETE_PRODUCT_REQUEST, DELETE_PRODUCT_SUCCESS,
    ORDER_PRODUCT_ERROR,
    ORDER_PRODUCT_REQUEST,
    ORDER_PRODUCT_SUCCESS,
    ORDER_PRODUCTS_ERROR,
    ORDER_PRODUCTS_REQUEST,
    ORDER_PRODUCTS_SUCCESS
} from "../Actions/actionTypes";

const initialState = {
    products: [],
    product: {},
    load: false,
    error: null,
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
        case ORDER_PRODUCT_SUCCESS:
            return {...state, product: action.product, error: null, load: false };
        case ORDER_PRODUCT_REQUEST:
            return {...state, load: true};
        case ORDER_PRODUCT_ERROR:
            return {...state, error: action.error, load: false};
        case DELETE_PRODUCT_ERROR:
            return {...state, error: action.error, load: false};
        case DELETE_PRODUCT_REQUEST:
            return {...state, load: true};
        case DELETE_PRODUCT_SUCCESS:
            return {...state, load: false, error: null};
        default:
            return state
    }
};

export default reducerProducts;