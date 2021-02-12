import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { alert } from './alert.reducer';
import { searchSettings, searchResults } from './search.reducer';

const rootReducer = combineReducers({
  authentication,
  registration,
  alert,
  searchSettings,
  searchResults
});

export default rootReducer;