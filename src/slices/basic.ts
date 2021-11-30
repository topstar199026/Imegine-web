import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { AppThunk } from 'src/store';
import type { Basic } from 'src/types/basic';

interface BasicState {
  basic: Basic[];
  response: any;
};

const initialState: BasicState = {
  basic: [],
  response: null
};

const slice = createSlice({
  name: 'basic',
  initialState,
  reducers: {
    getBasic(state: BasicState, action: PayloadAction<{ basic: Basic[]; }>) {
      const { basic } = action.payload;

      state.basic = basic;
    },
    addBasic(state: BasicState, action: PayloadAction<{ data: any; }>) {
      const { data } = action.payload;

      state.response = data;
    },
    updateBasic(state: BasicState, action: PayloadAction<{ data: any; }>) {
      const { data } = action.payload;

      state.response = data;
    },
    deleteBasic(state: BasicState, action: PayloadAction<{ data: any }>) {
      const { data } = action.payload;

      state.response = data;
    },
  }
});

export const reducer = slice.reducer;

export const getBasic = (): AppThunk => async (dispatch) => {
  // const response = await axios.get(prefixEndpoint + '/businesses/');

  // dispatch(slice.actions.getBasices({businesses: response.data}));
};

export const addBasic = (business: any): AppThunk => async (dispatch) => {
  // const response = await axios.post(prefixEndpoint + '/businesses/', business);

  // dispatch(slice.actions.addBasic({data: response.data}));
};

export const updateBasic = (business: any): AppThunk => async (dispatch) => {
  // const response = await axios.put(prefixEndpoint + '/businesses/'+business.businessId, business);

  // dispatch(slice.actions.updateBasic({data: response.data}));
};

export const deleteBasic = (businessId: number): AppThunk => async (dispatch) => {
  // const response = await axios.delete(prefixEndpoint + '/businesses/'+ businessId);

  // dispatch(slice.actions.deleteBasic({ data: response.data }));
};

export default slice;
