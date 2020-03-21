import {
    LOGIN_USER_ERROR,
    LOGIN_USER_REQUEST,
    LOGIN_USER_SUCCESS, LOGOUT_USER_ERROR, LOGOUT_USER_REQUEST, LOGOUT_USER_SUCCESS,
    REGISTER_USER_ERROR,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS
} from "../Actions/actionTypes";

const initialState = {
    user: null,
    registerError: null,
    registerLoad: false,
    loginError: null,
    loginLoad: false,
    logoutLoad: false,
    logoutError: null
};

const reducerUsers = (state = initialState, action) => {
    switch (action.type) {
        case REGISTER_USER_SUCCESS:
            return {...state, user: action.user, registerError: null, registerLoad: false};
        case REGISTER_USER_REQUEST:
            return {...state, registerLoad: true};
        case REGISTER_USER_ERROR:
            return {...state, registerError: action.error, registerLoad: false};
        case LOGIN_USER_SUCCESS:
            return {...state, user: action.user, loginError: null, loginLoad: false};
        case LOGIN_USER_REQUEST:
            return {...state, loginLoad: true};
        case LOGIN_USER_ERROR:
            return {...state, loginError: action.error, loginLoad: false};
        case LOGOUT_USER_SUCCESS:
            return {...state, user: null,  logoutError: null, loginLoad: false};
        case LOGOUT_USER_REQUEST:
            return {...state, logoutLoad: true};
        case LOGOUT_USER_ERROR:
            return {...state, logoutError: action.error, logoutLoad: false};

        default:
            return state
    }
};


export default reducerUsers;