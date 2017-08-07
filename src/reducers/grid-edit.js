import {CHANGE_SELECTION, CHANGE_GRIDDATA, CHANGE_COLOR} from '../constants/ActionTypes';

const initialState = {
  gridData: [],
  selectionBound: {x: -1, y: -1, width: -1, height: -1}
}

export default function gridEdit(state = initialState, action) {
  switch (action.type) {
    case CHANGE_SELECTION:
      const bound = {
          left: action.left,
          right: action.right,
          top: action.top,
          bottom: action.bottom
      }
      return {
        ...state,
        selectionBound: bound
      }
    case CHANGE_GRIDDATA:
      return {
        ...state,
        gridData: action.gridData
      }
    default:
      return state;
  }
}
