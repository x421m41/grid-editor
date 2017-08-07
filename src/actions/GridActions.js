import * as types from '../constants/ActionTypes';

export function changeSelection(bounds) {
  return {
    type: types.CHANGE_SELECTION,
    ...bounds
  };
};

export function changeGridData(gridData) {
  return {
    type: types.CHANGE_GRIDDATA,
    gridData
  }
}
