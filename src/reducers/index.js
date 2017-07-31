import { combineReducers } from 'redux';
import gridEditor from './grid-edit';
import mainAction from './main-action'

const rootReducer = combineReducers({
  mainAction,
  gridEditor
});

export default rootReducer;