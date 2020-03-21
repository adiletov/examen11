import {ORDER_CATEGORIES_ERROR, ORDER_CATEGORIES_REQUEST, ORDER_CATEGORIES_SUCCESS} from "../Actions/actionTypes";

const initialState = {
    categories: [],
    load: false,
    error: null
};

const reducerCategories = (state = initialState, action) => {
  switch (action.type) {
      case ORDER_CATEGORIES_SUCCESS:
          return {...state, categories: action.category, error: null, load: false};
      case ORDER_CATEGORIES_REQUEST:
          return {...state, load: true};
      case ORDER_CATEGORIES_ERROR:
          return {...state, error: action.error, load: false};
      default:
          return state
  }
};

export default reducerCategories;