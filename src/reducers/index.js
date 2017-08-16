import { combineReducers } from 'redux';
import grid from './GridEditor';
import main from './MainAction'

const rootReducer = combineReducers({
  main,
  grid
});

export default rootReducer;