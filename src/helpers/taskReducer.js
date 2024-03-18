export const ADD_JOB_FORM_STATE = {
  priority : 1,
  description : "",
  place : "",
  object : "",
  additionalInfo : ""
};

export const ADD_SERVICE_FORM_STATE = {
  priority : 1,
  description : "",
  object : "",
  serial: "",
  additionalInfo : ""
};

export const ADD_ORDER_FORM_STATE = {
  priority : 1,
  description : "",
  place : "",
  object : "",
  additionalInfo : ""
};

export const taskReducer = (state, action) => {
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