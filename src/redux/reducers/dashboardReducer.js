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
} from '../actions/types';

const initialState = {
  isMobileDevice: false,
  sentMessages: {},
  errors: '',
  messages: [],
  currentView: 'INBOX',
  isLoading: false,
  viewMessageList: true,
  singleMessage: {},
  messageError: '',
  composeModalOpen: false,
};

/**
 * @description Dashboard reducer
 * @param {object} state
 * @param {object} action
 * @returns {oject} the payload
 */
const dashboardReducer = (state = initialState, { type, payload }) => {
  switch (type) {
  case MOBILE_DEVICE:
    return {
      ...state,
      isMobileDevice: true,
    };
  case DESKTOP_DEVICE:
    return {
      ...state,
      isMobileDevice: false,
    };
  case SEND_MESSAGE:
    return {
      ...state,
      sentMessages: payload,
      isLoading: false,
      viewMessageList: true,
    };
  case SEND_MESSAGE_ERROR:
    return {
      ...state,
      errors: payload,
    };
  case FETCH_INBOX:
    return {
      ...state,
      messages: payload,
      currentView: 'INBOX',
      isLoading: false,
      viewMessageList: true,
      messageError: '',
    };
  case FETCH_SENT:
    return {
      ...state,
      messages: payload,
      currentView: 'SENT',
      isLoading: false,
      viewMessageList: true,
      messageError: '',
    };
  case FETCH_UNREAD:
    return {
      ...state,
      messages: payload,
      currentView: 'UNREAD',
      isLoading: false,
      viewMessageList: true,
      messageError: '',
    };
  case PROCESSING_REQUEST:
    return {
      ...state,
      isLoading: true,
    };
  case SET_SINGLE_MESSAGE:
    return {
      ...state,
      singleMessage: payload,
      viewMessageList: false,
    };
  case DELETE_MESSAGE:
    return {
      ...state,
      messages: payload,
      messageError: '',
    };
  case MESSAGE_ERROR:
    return {
      ...state,
      messageError: payload,
    };
  case COMPOSE_MODAL_OPEN:
    return {
      ...state,
      composeModalOpen: payload,
    };
  default:
    return state;
  }
};

export default dashboardReducer;
