/**
 * An to-do reducer
 * 
 * @author: steve park <seongwuk.park@gmail.com>
 */
import { ActionTypes } from '../contants';

 /**
 * The initial state
 */
const initialStateTodo = {
  items: [],
  page: 1,
  size: 10,
  totalCount: 0,
};
  
/**
 * A reducer function that returns the next state tree,
 * given the current state tree and the action to handle.
 * 
 * @param {any} state the current state
 * @param {Object} action A plain object representing “what changed”.
 * @return {any} the next state
 */
const todo = (state = initialStateTodo, action) => {
  const { items, totalCount } = state;
  const { payload } = action;

  switch (action.type) {
    case ActionTypes.ADD_TODO_SUCCESS:
      if (payload !== undefined && payload !== null) {
        return {
          ...state,
          items: [
            ...items,
            payload.data
          ],
          totalCount: totalCount + 1
        };
      }
      return state;

    case ActionTypes.CLEAR_TODO_SUCCESS:
      return initialStateTodo;

    case ActionTypes.FETCH_TODO_SUCCESS:
      if (payload !== undefined && payload !== null) {
        const { data } = payload;
        if (data !== undefined && data !== null) {
          return {
            ...state,
            items: (data.items === undefined ? [] : data.items),
            page: data.page,
            size: data.size,
            totalCount: (data.totalCount === undefined ? 0 : data.totalCount),
          };
        }
      }
      return state;

    case ActionTypes.REMOVE_TODO_SUCCESS:
      if (payload !== undefined && payload !== null) {
        const { data } = payload;
        return {
          ...state,
          items: items.filter(item => item.id !== data.id),
          totalCount: totalCount - 1
        };
      }
      return state;

    case ActionTypes.TOGGLE_TODO_SUCCESS:
      if (payload !== undefined && payload !== null) {
        const { data } = payload;
        return {
          ...state,
          items: items.map((item) => (item.id === data.id ? data : item))
        };
      }
      return state;

    case ActionTypes.LOGOUT:
      return initialStateTodo;

    default:
      return state;
  }
}

export default todo;
