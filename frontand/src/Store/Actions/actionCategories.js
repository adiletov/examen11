import {ORDER_CATEGORIES_ERROR, ORDER_CATEGORIES_REQUEST, ORDER_CATEGORIES_SUCCESS} from "./actionTypes";
import axiosApi from "../../axiosApi";

export const orderCategoriesSuccess = (category) => ({type: ORDER_CATEGORIES_SUCCESS, category});
export const orderCategoriesRequest = () => ({type: ORDER_CATEGORIES_REQUEST});
export const orderCategoriesError = (error) => ({type: ORDER_CATEGORIES_ERROR, error});

export const orderCategory = () => {
    return async (dispatch) => {
        try {
            dispatch(orderCategoriesRequest());
            const response = await axiosApi.get('/categories');
            dispatch(orderCategoriesSuccess(response.data))
        } catch (error) {
            dispatch(orderCategoriesError(error));
        }
    }
};