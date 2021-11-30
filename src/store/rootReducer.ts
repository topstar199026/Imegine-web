import { combineReducers } from '@reduxjs/toolkit';
import { reducer as basicReducer } from 'src/slices/basic';
import { reducer as keyReducer } from 'src/slices/key';

const rootReducer = combineReducers({
  basic: basicReducer,
  key: keyReducer,
});

export default rootReducer;
