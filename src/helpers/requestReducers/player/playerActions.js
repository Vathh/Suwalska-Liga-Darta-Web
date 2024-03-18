export const SET_NAME = 'SET_NAME';
export const RESET_DATA = 'RESET_DATA';

export const setName = (value) => ({
  type: SET_NAME,
  payload: value
});

export const resetInputs = () => ({
  type: RESET_DATA
})

export const initialGetPlayersState = {
  players: [],
  error: null
};

export const initialPostPlayerState = {
  name: ''
}