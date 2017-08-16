import {CHANGE_LOADING} from '../constants/ActionTypes'

const initialState = {
  loading: true
};

const main = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_LOADING:
      return {loading: action.loading};
    default:
      return state
  }
}

export default main;
