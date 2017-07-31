import {CHANGE_LOADING} from '../constants/ActionTypes'

const mainActionInitialState = {loading: true};
const mainAction = (state = mainActionInitialState, action) => {
  switch (action.type) {
    case CHANGE_LOADING:
      const newState = {loading: action.loading};
      console.log(newState);
      return newState;
    default:
      return state
  }
}

export default mainAction;
