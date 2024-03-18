import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import authReducer from './authSlice'
import addPannelReducer from './addPannelVisibilitySlice'

export default configureStore({
  reducer: {
    user: userReducer,
    auth: authReducer,
    addPannel: addPannelReducer
  }
});