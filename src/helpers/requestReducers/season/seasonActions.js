export const SET_NAME = 'SET_NAME';
export const SET_START_DATE = 'SET_START_DATE';
export const SET_END_DATE = 'SET_END_DATE';
export const SET_RANK_COUNT = 'SET_RANK_COUNT'
export const RESET_DATA = 'RESET_DATA';

export const setName = (value) => ({ 
  type: SET_NAME, 
  payload: value 
});

export const setStartDate = (value) => ({ 
  type: SET_START_DATE, 
  payload: value 
});

export const setEndDate = (value) => ({ 
  type: SET_END_DATE, 
  payload: value 
});

export const setRankCount = (value) => ({ 
  type: SET_RANK_COUNT, 
  payload: value 
});

export const resetInputs = () => ({ 
  type: RESET_DATA 
});

export const initialGetSeasonsState = {
  seasons: [],
  error: null
};

export const initialPostSeasonState = {
  name: '',
  startDate: '',
  endDate: '',
  rankCount: ''
};

export const initialSeasonDetailsState = {
  season: null,
  error: null
};