import * as types from '../constants/ActionTypes';

export function changeLoading(loading) {
  return {
    type: types.CHANGE_LOADING,
    loading,
  };
};
