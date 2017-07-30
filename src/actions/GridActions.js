import * as types from '../constants/ActionTypes';

export function changeSelection(bounds) {
  const {x, y, width, height} = bounds;
  return {
    type: types.CHANGE_SELECTION,
    x,
    y,
    width,
    height
  };
};
