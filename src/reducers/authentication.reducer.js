/**
 * An authentication reducer
 * 
 * @author: steve park <seongwuk.park@gmail.com>
 */
import { ActionTypes } from '../contants';

 /**
 * The initial state
 */
const initialStateAuth = {
  retryCount: 0,
  token: null,
  userDetails: null
};

/**
 * A reducer function that returns the next state tree,
 * given the current state tree and the action to handle.
 * 
 * @param {any} state the current state
 * @param {Object} action A plain object representing “what changed”.
 * @return {any} the next state
 */
const authentication = (state = initialStateAuth, action) => {
  const { payload } = action;
  const { retryCount } = state;

  switch (action.type) {
    case ActionTypes.GET_TOKEN_SUCCESS:
    case ActionTypes.LOGIN_SUCCESS:
    case ActionTypes.REFRESH_TOKEN_SUCCESS:
      return {
        ...state,
        retryCount: 0,
        token: payload.data
      };

    case ActionTypes.REFRESH_TOKEN_FAIL:
      return {
        ...state,
        retryCount: retryCount + 1
      };

    case ActionTypes.GET_USERME_SUCCESS:
      return {
        ...state,
        userDetails: payload.data
      };

    case ActionTypes.LOGOUT:
      return initialStateAuth;

    default:
      return state;
  }
}

export default authentication;
