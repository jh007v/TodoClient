import { combineReducers } from 'redux';
import authentication from './authentication.reducer';
import todo from './todo.reducer';

const rootReducers = combineReducers({
  auth: authentication,
  todo: todo
});

export default rootReducers;
