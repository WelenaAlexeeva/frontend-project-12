import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isOpened: false,
  type: null,
  channel: null,
}

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.type = action.payload.type
      state.channel = action.payload.channel ?? null
      state.isOpened = true
    },
    closeModal: (state) => {
      state.isOpened = false
      state.channel = null
      state.type = null
    },
  } })

export const { openModal, closeModal, selectType } = modalSlice.actions
export const isOpenedSelector = state => state.modal.isOpened
export const typeSelector = state => state.modal.type
export const channelSelector = state => state.modal.channel
export default modalSlice.reducer
