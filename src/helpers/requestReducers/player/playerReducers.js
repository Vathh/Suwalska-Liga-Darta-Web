import { FETCH_ERROR, FETCH_SUCCESS } from "../actions";
import { RESET_DATA, SET_NAME, initialPostPlayerState } from "./playerActions";

export const getPlayersReducer = (state, action) => {
  switch(action.type) {
    case FETCH_SUCCESS:
      return { ...state, players: action.payload};
    case FETCH_ERROR:
      return { ...state, error: action.payload};
    default:
      return state;
  }
}

export const postPlayerReducer = (state, action) => {
  switch(action.type) {
    case SET_NAME:
      return { ...state,
              name: action.payload
             };
    case RESET_DATA:
      return initialPostPlayerState;
    default:
      return state;
  }
};