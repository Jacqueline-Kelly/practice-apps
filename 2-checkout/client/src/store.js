import { configureStore, createStore } from '@reduxjs/toolkit';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER, } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import regeneratorRuntime from "regenerator-runtime";
import { useSelector } from 'react-redux';
import thunk from 'redux-thunk';
import axios from 'axios';

export const submitForm = createAsyncThunk('form/submitForm',
  async(_, thunkAPI) => {
    try {
      const form = thunkAPI.getState().form;
      console.log('form in submit', form);
      const response = await axios.post('http://localhost:3000/api', form);
      console.log('response in submit is', response);
      return response.data
    } catch (err) {
      console.log('err in submitForm is', err);
      throw new Error (err);
    }
  }
)

const initialState = {
  cookie: '',
  address1: '',
  address2: '',
  city: '',
  email: '',
  name: '',
  password: '',
  phoneNumber: '',
  state: '',
  zipCode: '',
  creditCard: '',
  expiration: '',
  cvv: '',
  billingZip: ''
}

export const formSlice = createSlice({
  name: 'form',
  initialState: initialState,
  reducers: {
    reset: (state) => initialState,
    update: (state, action) => ({...state, ...action.payload}),
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitForm.fulfilled, (state, action) => {
        console.log('fulfilled');
        console.log(action.payload);
      })
      .addCase(submitForm.rejected, (state, action) => {
        console.log('rejected');
        console.log(action.payload);
      })
  }
})


export const store = configureStore({
  reducer: {
    form: formSlice.reducer}
})

export const {reset, update} = formSlice.actions;
