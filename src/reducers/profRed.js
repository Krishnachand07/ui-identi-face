import {
	GET_PROFILE,
	PROFILE_SUCCESS,
	PROFILE_ERROR,
	DETAILS,
	PROFILE_LOADING,
	DETAILS_LOADING
} from '../action/types';

const initialState = {
	profList: [],
	isDetailLoading: false,
	profSucc: false,
	visitors: []
};

export default function(state = initialState, action) {
	switch (action.type) {
		case DETAILS_LOADING:
			return {
				...state,
				isDetailLoading: true
			};
		case PROFILE_LOADING:
			return {
				...state,
				isDetailLoading: false,
				isLoading: true
			};
		case GET_PROFILE:
			return {
				...state,
				isLoading: false,
				isDetailLoading: false,
				profList: action.payload
			};
		case PROFILE_SUCCESS:
			return {
				...state,
				isLoading: false,
				isDetailLoading: false,
				profSucc: true
			};
		case PROFILE_ERROR:
			return {
				...state,
				isLoading: false,
				isDetailLoading: false,
				profSucc: false
			};
		case DETAILS:
			return {
				...state,
				isLoading: false,
				isDetailLoading: false,
				visitors: action.payload
			};
		default:
			return state;
	}
}
