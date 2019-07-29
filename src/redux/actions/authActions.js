import BASE_URL from '../../config';
import {
  LOGIN_USER,
  LOGIN_ERROR,
  REGISTER_USER,
  REGISTER_ERROR,
  PROCESSING_REQUEST,
} from './types';

import { setCookie } from '<helpers>/auth';

/**
 * @method loginAction
 * @param {object} user
 * @returns {object} action object
 */
const loginAction = async (user) => {
  try {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (data.status === 200) {
      setCookie('token', data.data[0].token, 1);
      return {
        type: LOGIN_USER,
      };
    }
    if (data.status === 400) {
      return {
        type: LOGIN_ERROR,
        payload: data,
      };
    }
  } catch (error) {
    const errorMessage = {
      error: 'An error occured',
    };
    return {
      type: LOGIN_ERROR,
      payload: errorMessage,
    };
  }
};

/**
 * @method registerAction
 * @param {string} password
 * @param {string} confirmPassword
 * @param {object} user
 * @returns {object} action object
 */
const registerAction = async (password, confirmPassword, user) => {
  if (password !== confirmPassword) {
    const errorMessage = {
      error: 'Password must equal Confirm Pasword',
    };
    return {
      type: REGISTER_ERROR,
      payload: errorMessage,
    };
  }
  try {
    const response = await fetch(`${BASE_URL}/auth/signup`, {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    if (data.status === 201) {
      setCookie('token', data.data[0].token, 1);
      return {
        type: REGISTER_USER,
      };
    }
    if (data.status === 400) {
      let errors = '';
      data.errors.forEach((ele) => {
        errors += `${ele.error} \n`;
      });
      const errorMessage = {
        error: errors,
      };

      return {
        type: REGISTER_ERROR,
        payload: errorMessage,
      };
    }
    if (data.status === 409) {
      return {
        type: REGISTER_ERROR,
        payload: data,
      };
    }
  } catch (error) {
    const errorMessage = {
      error: 'An error occured',
    };
    return {
      type: REGISTER_ERROR,
      payload: errorMessage,
    };
  }
};

/**
 * @method processingRequest
 * @returns {object} action object
 */
const processingRequest = () => {
  return { type: PROCESSING_REQUEST };
};

export { loginAction, processingRequest, registerAction };
