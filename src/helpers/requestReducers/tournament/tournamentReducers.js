import { FETCH_SUCCESS, FETCH_ERROR } from "../actions";

export const getTournamentsReducer = (state, action) => {
  switch (action.type) {
    case FETCH_SUCCESS:
      return { ...state, tournaments: action.payload };
    case FETCH_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export const getTournamentBracketReducer = (state, action) => {
  switch (action.type){
    case FETCH_SUCCESS:
      return {
        ...state,
        tournament: action.payload
      };
    case FETCH_ERROR:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
}

export const getTournamentDetailsReducer = (state, action) => {
  switch (action.type){
    case FETCH_SUCCESS:
      return {
        ...state,
        tournament: action.payload
      };
    case FETCH_ERROR:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
}