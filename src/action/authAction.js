import { USER_LOADED, AUTH_ERROR, LOGIN_FAIL, LOGIN_SUCCESS, REGISTER_FAIL, REGISTER_SUCCESS } from './types';
import axios from 'axios';
import { returnErrors } from './errorAction';
import { API_URL } from '../config';

export const adminUser = () => (dispatch, getState) => {
	axios
		.get(API_URL + '/auth/user', tokenConfig(getState))
		.then((res) =>
			dispatch({
				type: USER_LOADED,
				payload: res.data
			})
		)
		.catch((err) => {
			dispatch(returnErrors(err.response.data, err.response.status));
			dispatch({
				type: AUTH_ERROR
			});
		});
};

export const register = ({ email, login, password }) => (dispatch) => {
	const config = {
		headers: {
			'Content-Type': 'application/json'
		}
	};
	const body = JSON.stringify({ email, login, password });

	axios
		.post(API_URL + '/user', body, config)
		.then((res) =>
			dispatch({
				type: REGISTER_SUCCESS,
				payload: res.data
			})
		)
		.catch((err) => {
			dispatch(returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL'));
			dispatch({
				type: REGISTER_FAIL
			});
		});
};

export const login = ({ email, password }) => (dispatch) => {
	const config = {
		headers: {
			'Content-Type': 'application/json'
		}
	};
	const body = JSON.stringify({ email, password });

	axios
		.post(API_URL + '/auth', body, config)
		.then((res) =>
			dispatch({
				type: LOGIN_SUCCESS,
				payload: res.data
			})
		)
		.catch((err) => {
			dispatch(returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL'));
			dispatch({
				type: LOGIN_FAIL
			});
		});
};

export const tokenConfig = (getState) => {
	const token = getState().auth.token;
	const config = {
		headers: {
			'Content-Type': 'application/json'
		}
	};
	if (token) {
		config.headers['x-auth-token'] = token;
	}
	return config;
};
