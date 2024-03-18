import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: "user",
  initialState:{    
    name: ""   
  },
  reducers:{
    updateUser: (state, action) => {
      state.name = action.payload.name;
    }
  }
})

export const { updateUser } = userSlice.actions;
export default userSlice.reducer;