import { CHANGE_GRIDDATA, CHANGE_SELECTION, CHANGE_STATE } from '../constants/ActionTypes';

const initialState = {
  selectionBound: {
    left: -1,
    right: -1,
    top: -1,
    bottom: -1
  },
  gridData: {
    info: {},
    map: []
  }
}

export default function grid(state = initialState, action) {
  switch (action.type) {
    case CHANGE_SELECTION:
      {
        const bound = {
            left: action.left,
            right: action.right,
            top: action.top,
            bottom: action.bottom
        };
        return {
          ...state,
          selectionBound: bound
        };
      }
    case CHANGE_GRIDDATA:
      return {
        ...state,
        gridData: action.gridData
      };
    case CHANGE_STATE:
      {
        console.log(state);
        const bound = {
          left: state.selectionBound.left,
          right: state.selectionBound.right,
          top: state.selectionBound.top,
          bottom: state.selectionBound.bottom
        };
        const newMap = state.gridData.map.map((row, y) => {
          if (y >= bound.top && y <= bound.bottom) {
            return row.map((cell, x) => {
              if (x >= bound.left && x <= bound.right) {
                return {state: action.state};
              }
              return cell;
            });
          }
          return row;
        });
        return {
          ...state,
          gridData: {
            ...state.gridData,
            map: newMap
          }
        }
      }
    default:
      return state;
  }
}
