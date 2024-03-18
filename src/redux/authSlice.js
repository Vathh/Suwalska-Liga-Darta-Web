import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
  name: "auth",
  initialState:{
    pending: false,
    error: false,
    confirmed: false
  },
  reducers:{
    updateStart: (state) => {
      state.pending = true;
    },
    updateSuccess: (state) => {
      state.pending = false;
      state.error = false;
      state.confirmed = true;
    },
    updateError: (state) =>{
      state.pending = false;
      state.error = true;
    }
  }
})

export const { updateStart, updateSuccess, updateError } = authSlice.actions;
export default authSlice.reducer;