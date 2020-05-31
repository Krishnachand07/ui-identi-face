import { USER_LOADED, AUTH_ERROR, LOGIN_FAIL, LOGIN_SUCCESS, REGISTER_FAIL, REGISTER_SUCCESS } from '../action/types';

const initState = {
	isAuthenticated: null,
	isRegistered: false,
	user: null
};

export default function(state = initState, action) {
	switch (action.type) {
		case USER_LOADED:
			return {
				...state,
				isAuthenticated: true,
				user: action.payload
			};
		case LOGIN_SUCCESS:
			return {
				...state,
				...action.payload,
				isAuthenticated: true
			};
		case REGISTER_SUCCESS:
			return {
				...state,
				...action.payload,
				isRegistered: true
			};
		case AUTH_ERROR:
		case LOGIN_FAIL:
			return {
				...state,
				...action.payload,
				isAuthenticated: false
			};
		case REGISTER_FAIL:
			return {
				...state,
				...action.payload,
				isRegistered: false
			};
		default:
			return state;
	}
}
