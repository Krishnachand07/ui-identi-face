import { GET_PROFILE, PROFILE_SUCCESS, PROFILE_ERROR, DETAILS } from '../action/types';

const initialState = {
	profList: [],
	profSucc: false,
	visitors: []
};

export default function(state = initialState, action) {
	switch (action.type) {
		case GET_PROFILE:
			return {
				...state,
				profList: action.payload
			};
		case PROFILE_SUCCESS:
			return {
				...state,
				profSucc: true
			};
		case PROFILE_ERROR:
			return {
				...state,
				profSucc: false
			};
		case DETAILS:
			return {
				...state,
				visitors: action.payload
			};
		default:
			return state;
	}
}
