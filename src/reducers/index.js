import { combineReducers } from 'redux';
import drawing from './drawing';
import mnist from './mnist';
import predicted from './predicted';

export default combineReducers({
  drawing,
  mnist,
  predicted,
});
