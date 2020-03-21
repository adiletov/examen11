import {
    ADD_PRODUCT_ERROR,
    ADD_PRODUCT_REQUEST,
    ADD_PRODUCT_SUCCESS, ORDER_PRODUCTS_ERROR,
    ORDER_PRODUCTS_REQUEST,
    ORDER_PRODUCTS_SUCCESS
} from "./actionTypes";
import axiosApi from "../../axiosApi";
import {push} from "connected-react-router";

export const addProductSuccess = () => ({type: ADD_PRODUCT_SUCCESS});
export const addProductRequest = () => ({type: ADD_PRODUCT_REQUEST});
export const addProductError = (error) => ({type: ADD_PRODUCT_ERROR, error});

export const orderProductsSuccess = (products) => ({type: ORDER_PRODUCTS_SUCCESS, products});
export const orderProductsRequest = () => ({type: ORDER_PRODUCTS_REQUEST});
export const orderProductsError = (error) => ({type: ORDER_PRODUCTS_ERROR, error});

export const addProduct = (product) => {
    return async (dispatch, getState) => {
        const token = getState().users.user.user.token;

        const config = { headers: {'Authorization' :'Token ' + token}};
        try {
            dispatch(addProductRequest());
            await axiosApi.post('/products', product, config);

            dispatch(addProductSuccess());
            dispatch(push('/'))
        } catch (e) {
            dispatch(addProductRequest());
            dispatch(addProductError(e.response.data));
        }
    }
};

export const orderProducts = categoryId => {
    return async dispatch => {
        let url = '/products';

        if (categoryId) url += `?category=${categoryId}`;
        try {
            dispatch(orderProductsRequest());
            const response = await axiosApi.get(url);
            dispatch(orderProductsSuccess(response.data));
        } catch (error) {
            dispatch(orderProductsRequest());
            dispatch(orderProductsError(error));
        }
    }
};



