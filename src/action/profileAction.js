import { PROFILE_SUCCESS, PROFILE_FAIL, GET_PROFILE, DETAILS, PROFILE_LOADING } from './types';
import axios from 'axios';
import { returnErrors } from './errorAction';
import { API_URL } from '../config';

export const getProfile = () => (dispatch) => {
	dispatch({
		type: PROFILE_LOADING
	});
	axios.get(API_URL + '/auth/profile').then((res) =>
		dispatch({
			type: GET_PROFILE,
			payload: res.data
		})
	);
};

export const profileDetails = () => (dispatch) => {
	dispatch({
		type: PROFILE_LOADING
	});
	axios.get(API_URL + '/auth/details').then((res) =>
		dispatch({
			type: DETAILS,
			payload: res.data
		})
	);
};

export const addProfile = ({ name, email, phone, gender, address, dob, file }) => (dispatch, getState) => {
	dispatch({
		type: PROFILE_LOADING
	});
	const config = {
		headers: {
			'Content-Type': 'multipart/form-data'
		}
	};
	let data = new FormData();
	data.append('name', name);
	data.append('email', email);
	data.append('phone', phone);
	data.append('gender', gender);
	data.append('address', address);
	data.append('dob', dob);
	data.append('file', file);

	axios
		.post(API_URL + '/auth/profile', data, config)
		.then((res) =>
			dispatch({
				type: PROFILE_SUCCESS,
				payload: res.data
			})
		)
		.catch((err) => {
			dispatch(returnErrors(err.response.data, err.response.status, 'PROFILE_FAIL'));
			dispatch({
				type: PROFILE_FAIL
			});
		});
};
