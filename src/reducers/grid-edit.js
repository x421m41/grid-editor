import {CHANGE_SELECTION, CHANGE_STATE, CHANGE_LOADING, CHANGE_GRIDDATA} from '../constants/ActionTypes';

const initialState = {
  gridData: {},
  selectionBound: {}
}

export default function gridEdit(state = initialState, action) {
  switch (action.type) {
    case CHANGE_SELECTION:
      return {
        selectionBound: {
          ...action
        }
      };
    case CHANGE_GRIDDATA:
      console.log('CHANGE_GRIDDATA');
      console.log(action.gridData);
      console.log('CHANGE_GRIDDATA');
      return {
        gridData: action.gridData
      }
    default:
      return state;
  }
}
