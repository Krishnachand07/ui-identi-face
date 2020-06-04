import {
	USER_LOADING,
	USER_LOADED,
	AUTH_ERROR,
	LOGIN_FAIL,
	LOGIN_SUCCESS,
	REGISTER_FAIL,
	REGISTER_SUCCESS
} from '../action/types';

const initState = {
	isAuthenticated: null,
	isRegistered: false,
	isLoading: false,
	user: null
};

export default function(state = initState, action) {
	switch (action.type) {
		case USER_LOADING:
			return {
				...state,
				isLoading: true
			};
		case USER_LOADED:
			return {
				...state,
				isAuthenticated: true,
				isLoading: false,
				user: action.payload
			};
		case LOGIN_SUCCESS:
			return {
				...state,
				isLoading: false,
				...action.payload,
				isAuthenticated: true
			};
		case REGISTER_SUCCESS:
			return {
				...state,
				...action.payload,
				isLoading: false,
				isRegistered: true
			};
		case AUTH_ERROR:
			return {
				...state,
				...action.payload,
				isAuthenticated: false
			};
		case LOGIN_FAIL:
			return {
				...state,
				isLoading: false,
				...action.payload,
				isAuthenticated: false
			};
		case REGISTER_FAIL:
			return {
				...state,
				...action.payload,
				isLoading: false,
				isRegistered: false
			};
		default:
			return state;
	}
}
