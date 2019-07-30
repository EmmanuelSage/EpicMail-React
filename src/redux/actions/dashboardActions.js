import 'regenerator-runtime';
import BASE_URL from '../../config';
import {
  MOBILE_DEVICE,
  DESKTOP_DEVICE,
  SEND_MESSAGE,
  SEND_MESSAGE_ERROR,
  FETCH_INBOX,
  FETCH_SENT,
  FETCH_UNREAD,
  PROCESSING_REQUEST,
  SET_SINGLE_MESSAGE,
  DELETE_MESSAGE,
  MESSAGE_ERROR,
  COMPOSE_MODAL_OPEN,
} from './types';
import { getCookie } from '<helpers>/auth';

const messageToken = getCookie('token');

/**
 * @method setIsMobile
 * @param {bool} isMobile
 * @returns {object} action object
 */
const setIsMobile = (isMobile) => {
  if (isMobile) {
    return { type: MOBILE_DEVICE };
  }
  return { type: DESKTOP_DEVICE };
};

/**
 * @method deleteMessage
 * @param {string} messageId
 * @param {array} messages
 * @returns {object} action object
 */
const deleteMessage = async (messageId, messages) => {
  try {
    const response = await fetch(`${BASE_URL}/messages/${messageId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': messageToken,
      },
    });
    await response.json();

    return {
      type: DELETE_MESSAGE,
      payload: messages,
    };
  } catch (error) {
    return { type: MESSAGE_ERROR, payload: 'Sorry an error occured' };
  }
};

/**
 * @method fetchUnread
 * @returns {object} action object
 */
const fetchUnread = async () => {
  try {
    const response = await fetch(`${BASE_URL}/messages/unread`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': messageToken,
      },
    });
    const serverData = await response.json();
    const { data } = serverData;
    const sortData = data.sort((a, b) => b.id - a.id);
    return {
      type: FETCH_UNREAD,
      payload: sortData,
    };
  } catch (error) {
    return { type: MESSAGE_ERROR, payload: 'Sorry an error occured' };
  }
};

/**
 * @method fetchSent
 * @returns {object} action object
 */
const fetchSent = async () => {
  try {
    const response = await fetch(`${BASE_URL}/messages/sent`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': messageToken,
      },
    });
    const serverData = await response.json();
    const { data } = serverData;
    const sortData = data.sort((a, b) => b.id - a.id);
    return {
      type: FETCH_SENT,
      payload: sortData,
    };
  } catch (error) {
    return { type: MESSAGE_ERROR, payload: 'Sorry an error occured' };
  }
};

/**
 * @method fetchInbox
 * @returns {object} action object
 */
const fetchInbox = async () => {
  try {
    const response = await fetch(`${BASE_URL}/messages`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': messageToken,
      },
    });
    const serverData = await response.json();
    const { data } = serverData;
    const sortData = data.sort((a, b) => b.id - a.id);
    return {
      type: FETCH_INBOX,
      payload: sortData,
    };
  } catch (error) {
    return { type: MESSAGE_ERROR, payload: 'Sorry an error occured' };
  }
};

/**
 * @method sendMessage
 * @param {object} messageDetails
 * @returns {object} action object
 */
const sendMessage = async (messageDetails) => {
  try {
    const response = await fetch(`${BASE_URL}/messages`, {
      method: 'POST',
      body: JSON.stringify(messageDetails),
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': messageToken,
      },
    });
    const data = await response.json();
    if (data.status === 201) {
      return {
        type: SEND_MESSAGE,
        payload: data,
      };
    }
    if (data.status === 400) {
      let errors = '';
      data.errors.forEach((ele) => {
        errors += `${ele.error} <br>`;
      });

      return {
        type: SEND_MESSAGE_ERROR,
        payload: errors,
      };
    }
  } catch (error) {
    const errorMessage = 'An error occured';
    return {
      type: SEND_MESSAGE_ERROR,
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

/**
 * @method setSingleMessage
 * @param {object} message
 * @returns {object} action object
 */
const setSingleMessage = (message) => {
  return { type: SET_SINGLE_MESSAGE, payload: message };
};

/**
 * @method openComposeModal
 * @param {bool} state
 * @returns {object} action object
 */
const openComposeModal = (state) => {
  return { type: COMPOSE_MODAL_OPEN, payload: state };
};

/**
 * @method displayMessageError
 * @param {string} errorMessage
 * @returns {object} action object
 */
const displayMessageError = (errorMessage) => {
  return { type: MESSAGE_ERROR, payload: errorMessage };
};

export {
  setIsMobile,
  sendMessage,
  fetchInbox,
  fetchSent,
  fetchUnread,
  processingRequest,
  setSingleMessage,
  deleteMessage,
  displayMessageError,
  openComposeModal,
};
