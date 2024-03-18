export const INITIAL_LOGIN_FORM_STATE = {
  login: "",
  password: ""
};

export const loginFormReducer = (state, action) => {
  switch(action.type){
    case "CHANGE_INPUT":
      return{
        ...state,
        [action.payload.name]:action.payload.value
      }
    default:
      return state;
  }
}