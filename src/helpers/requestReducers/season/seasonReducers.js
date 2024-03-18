import { RESET_DATA, SET_END_DATE, SET_NAME, SET_RANK_COUNT, SET_START_DATE, initialPostSeasonState } from "./seasonActions";
import { FETCH_SUCCESS, FETCH_ERROR } from "../actions";

export const getSeasonsReducer = (state, action) => {
  switch (action.type) {
    case FETCH_SUCCESS:
      return { ...state, seasons: action.payload };
    case FETCH_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export const postSeasonReducer = (state, action) => {
  switch (action.type) {
    case SET_NAME:
      return { ...state, name: action.payload };
    case SET_START_DATE:
      return { ...state, startDate: action.payload };
    case SET_END_DATE:
      return { ...state, endDate: action.payload };
    case SET_RANK_COUNT:
      return { ...state, rankCount: action.payload }
    case RESET_DATA:
      return initialPostSeasonState;
    default:
      return state;
  }
};

export const seasonDetailsReducer = (state, action) => {
  switch (action.type) {
    case FETCH_SUCCESS:
      return {
        ...state,
        season: action.payload
      };
      case FETCH_ERROR: 
      return {
        ...state, 
        error:action.payload
      }
    default:
      return state;
  }
};