import { combineReducers } from 'redux';
import settings from './settings/reducer';
import menu from './menu/reducer';
import chatApp from './chat/reducer';

const reducers = combineReducers({
  menu,
  settings,
  chatApp
});

export default reducers;