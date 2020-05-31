import { combineReducers } from 'redux';
import authRed from './authRed';
import errorRed from './errorRed';
import profRed from './profRed';

export default combineReducers({
	auth: authRed,
	error: errorRed,
	prof: profRed
});
