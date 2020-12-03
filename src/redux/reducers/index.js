import { combineReducers } from 'redux';
import { usersReducer } from './usersReducer';
import { clocksReducer } from './clocksReducer';
import { brandsReducer } from './brandsReducer';
import { modalReducer } from './modalReducer';

const mainReducer = combineReducers({
  usersReducer,
  clocksReducer,
  brandsReducer,
  modalReducer,
});

export default mainReducer;