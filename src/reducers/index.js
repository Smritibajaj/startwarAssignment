import { combineReducers } from 'redux';
import auth from './auth';
import planets from './planets';
export default combineReducers({auth,planets});
