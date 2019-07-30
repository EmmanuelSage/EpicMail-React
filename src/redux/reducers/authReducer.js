import {
  LOGIN_USER,
  LOGIN_ERROR,
  REGISTER_USER,
  REGISTER_ERROR,
  PROCESSING_REQUEST,
  LOG_OUT,
} from '../actions/types';

const initialState = {
  isLoggedIn: false,
  isLoading: false,
  errors: '',
};

/**
 * @description Authentication reducer
 * @param {object} state
 * @param {object} action
 * @returns {oject} the payload
 */
const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
  case LOGIN_USER:
    return {
      ...state,
      isLoggedIn: true,
    };
  case REGISTER_USER:
    return {
      ...state,
      isLoggedIn: true,
    };
  case PROCESSING_REQUEST:
    return {
      ...state,
      isLoading: true,
    };
  case LOGIN_ERROR:
    return {
      ...state,
      isLoading: false,
      errors: payload,
    };
  case REGISTER_ERROR:
    return {
      ...state,
      isLoading: false,
      errors: payload,
    };
  case LOG_OUT:
    return {
      ...state,
      isLoggedIn: false,
      isLoading: false,
    };
  default:
    return state;
  }
};

export default authReducer;
