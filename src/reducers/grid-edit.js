import {CHANGE_SELECTION, CHANGE_STATE} from '../constants/ActionTypes';

const initialState = {x: -1, y: -1, width: -1, height: -1}

export default function gridEdit(state = initialState, action) {
  switch (action.type) {
    case CHANGE_SELECTION:
      const {x, y, width, height} = action;
      return {x, y, width, height};
    default:
      return state;
  }
}
