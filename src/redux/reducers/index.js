import { combineReducers } from 'redux';
import locationReducer from './location';
import isErrorReducer from './isError';
import temperatureUnitReducer from './temperatureUnit';

export default combineReducers({
  location: locationReducer,
  isError: isErrorReducer,
  unit: temperatureUnitReducer
});
