import { createSlice } from "@reduxjs/toolkit";

export const addPannelVisibilitySlice = createSlice({
  name: "addPannelVisibility",
  initialState:{
    addPannelVisible: false,
  },
  reducers:{
    changeAddPannelVisibility: (state) => {
      state.addPannelVisible = !state.addPannelVisible;
    },
    setAddPannelVisibility: (state, action) => {
      state.addPannelVisible = action.payload.addPannelVisibility;
    }  
  }
})

export const { changeAddPannelVisibility, setAddPannelVisibility } = addPannelVisibilitySlice.actions;
export default addPannelVisibilitySlice.reducer;