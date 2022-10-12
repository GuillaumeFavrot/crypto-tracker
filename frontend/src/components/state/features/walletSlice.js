// This file houses all reducers and action creators functions.
// All action creators and reducers can now be written in the same file known as a slice. 
// Its is possible to write all redux logic in one single slice file however splitting this logic in multiple slices is also possible.
// There is multiple ways to write this file.
// In this template this file has been setup to use :
//  => createAsyncThunk : this function is the new recommended way to handle asynchronous call within redux 
//  => Axios : this packages handles http request. It has been chosen in this template because it has better error handling than regular fetch requests
//  => Async/await : to handle asynchronous db calls. 
// This template features the four main types of DB requests.

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';

//URL and axios setup

let url = ''
  // If no base URL (or an empty string) is given the main app address will be used. In production this is fine because the main Heroku app address serves the Django app.
  // Since React is also served by Django the correct URL is used.
  // However in development React runs on its own server so we have to specify the address (the Django server address) where requests have to be sent.
  // This section is generic and does not have to be modified. 
if(process.env.NODE_ENV === 'development') {
  url = 'http://127.0.0.1:8000'
}

const api = axios.create({
  baseURL: url,
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// Action creators
// All action creators are rigged to handle basic CRUD operations and throw query errors.
// Just modify the function and variable names to suit your needs.

export const getWallet = createAsyncThunk(
  'wallet/getWallet',
  async () => {
    try {
      const response = await api.get(`/api/wallet`)
      return JSON.stringify(response)
    }
    catch (e) {
      console.log(e)
      throw(e)
    }
  }
)

export const modifyWallet = createAsyncThunk(
  'wallet/modifyWallet',
  async (data) => {
    try {
      const response = await api.put(`/api/wallet`, data)
      return JSON.stringify(response)
    }
    catch (e) {
      throw(e)
    }
  }
)

// Initial state and reducers
// Each CRUD action have is own set of functions in order to modify the state whether the action is pending, fulfilled or rejected.
// All request errors are handled. 
// However the "pending" spinner has not been implemented because the nature of wallet requests does not require it (they are almost instanteneous).
// All reducers are standard and do not need many modifications except the name of the action creators.

const initialState = {
  wallet: [
    {
        abbreviation : 'BTC',
        name : 'Bitcoin',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/1200px-Bitcoin.svg.png',
        qty: 0,
        buying_value: 0
    },
    {
        abbreviation : 'ETC',
        name : 'Ethereum',
        image: 'https://www.svgrepo.com/show/353715/ethereum.svg',
        qty: 0,
        buying_value: 0
    },
    {
        abbreviation : 'XRP',
        name : 'Ripple',
        image: 'https://cryptologos.cc/logos/xrp-xrp-logo.png',
        qty: 0,
        buying_value: 0
    }
  ],
  loading: false,
  statusText: '',
}

export const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {},
  extraReducers: {

    //GET reducers  
    [getWallet.pending]: (state) => {
      state.loading = true
    },
    [getWallet.fulfilled]: (state, { payload } ) => {
      let res = JSON.parse(payload)
      state.loading = false
      state.statusText = `GET Request ${res.statusText} with status code ${res.status}`
      state.wallet = res.data
    },
    [getWallet.rejected]: (state, { error } ) => {
      state.loading = false
      state.statusText = error.message === 'Network Error' ? 'GET request failed with status code 404' : `GET ${error.message}`
    },

    //PUT reducers
    [modifyWallet.pending]: (state) => {
      state.loading = true
    },
    [modifyWallet.fulfilled]: (state, { payload } ) => {
      let res = JSON.parse(payload)
      state.loading = false
      state.statusText = `PUT Request ${res.statusText} with status code ${res.status}`
      state.wallet = res.data
    },
    [modifyWallet.rejected]: (state, { error }) => {
      state.loading = false
      state.statusText = `PUT ${error.message}`
    },
  },
})

export const walletReducer = walletSlice.reducer


