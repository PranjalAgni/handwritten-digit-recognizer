import { combineReducers } from 'redux';
import drawing from './drawing';
import mnist from './mnist';
export default combineReducers({
  drawing,
  mnist
});
