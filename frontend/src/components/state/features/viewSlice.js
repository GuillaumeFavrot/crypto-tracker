import { createSlice } from '@reduxjs/toolkit'

const viewSlice = createSlice({
  name: 'view',
  initialState : 
    {
      page: 'home'
    }
  ,
  reducers: {
    modifyPage(state, action) {
      state.page = action.payload
    }
  }
})
 
export const { modifyPage } = viewSlice.actions
export default viewSlice.reducer