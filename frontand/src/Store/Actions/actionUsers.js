import {
    LOGIN_USER_ERROR,
    LOGIN_USER_REQUEST,
    LOGIN_USER_SUCCESS, LOGOUT_USER_ERROR, LOGOUT_USER_REQUEST,
    LOGOUT_USER_SUCCESS,
    REGISTER_USER_ERROR,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS
} from "./actionTypes";
import {push} from "connected-react-router";
import axiosApi from "../../axiosApi";

export const registerUserSuccess = () => ({type: REGISTER_USER_SUCCESS});
export const registerUserRequest = () => ({type: REGISTER_USER_REQUEST});
export const registerUserError = (error) => ({type: REGISTER_USER_ERROR, error});

export const loginUserSuccess = (user) => ({type: LOGIN_USER_SUCCESS, user});
export const loginUserRequest = () => ({type: LOGIN_USER_REQUEST});
export const loginUserError = (error) => ({type: LOGIN_USER_ERROR, error});

export const logoutUserSuccess = () => ({type: LOGOUT_USER_SUCCESS});
export const logoutUserRequest = () => ({type: LOGOUT_USER_REQUEST});
export const logoutUserError = error => ({type: LOGOUT_USER_ERROR, error});

export const registerUser = (user) => {
    return async (dispatch) => {
        try {
            dispatch(registerUserRequest());
            const response = await axiosApi.post('/users', user);
            dispatch(registerUserSuccess(response.data));
            dispatch(push('/'));
        } catch (error) {
            dispatch(registerUserRequest());
            if (error.response && error.response.data) {
                dispatch(registerUserError(error.response.data));
            } else {
                dispatch(registerUserError({global: 'No connection'}));
            }
        }
    }
};

export const loginUser = (user) => {
    return async (dispatch) => {
        try {
            dispatch(loginUserRequest());
            const response = await axiosApi.post('/users/sessions', user);
            dispatch(loginUserSuccess(response.data));
            dispatch(push('/'));
        } catch (error) {
            dispatch(loginUserRequest());
            if (error.response && error.response.data) {
                dispatch(loginUserError(error.response.data));
            } else {
                dispatch(loginUserError({global: 'No connection'}));
            }
        }
    }
};

export const logoutUser = () => {
    return async (dispatch, getState) => {
        const token = getState().users.user.token;
        const config = {headers: {'Authorization': token}};
        try {
            dispatch(logoutUserRequest());
            await axiosApi.delete('/users/sessions', config);
            dispatch(logoutUserSuccess());
            dispatch(push('/'));
        } catch (error){
            dispatch(logoutUserRequest());
            if (error.response && error.response.data) {
                dispatch(loginUserError(error.response.data));
            } else {
                dispatch(loginUserError({global: 'No connection'}));
            }
        }
    }
};

