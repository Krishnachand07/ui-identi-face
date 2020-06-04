import { GET_PROFILE, PROFILE_SUCCESS, PROFILE_ERROR, DETAILS, PROFILE_LOADING } from '../action/types';

const initialState = {
	profList: [],
	isLoading: false,
	profSucc: false,
	visitors: []
};

export default function(state = initialState, action) {
	switch (action.type) {
		case PROFILE_LOADING:
			return {
				...state,
				isLoading: true
			};
		case GET_PROFILE:
			return {
				...state,
				isLoading: false,
				profList: action.payload
			};
		case PROFILE_SUCCESS:
			return {
				...state,
				isLoading: false,
				profSucc: true
			};
		case PROFILE_ERROR:
			return {
				...state,
				isLoading: false,
				profSucc: false
			};
		case DETAILS:
			return {
				...state,
				isLoading: false,
				visitors: action.payload
			};
		default:
			return state;
	}
}
