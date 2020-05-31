import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login } from '../../action/authAction';
import { clearError } from '../../action/errorAction';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Alert } from 'reactstrap';

class Login extends Component {
	state = {
		msg: null
	};
	componentDidUpdate(prevProps) {
		const { error } = this.props;
		if (error !== prevProps.error) {
			if (error.id === 'LOGIN_FAIL') {
				this.setState({ msg: error.msg.msg });
			} else {
				this.setState({ msg: null });
			}
		}
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.isAuthenticated) {
			window.localStorage.setItem('token', nextProps.data.token);
			window.location.reload();
		}
	}
	render() {
		return (
			<div style={{ marginTop: '250px' }}>
				<Formik
					initialValues={{
						email: '',
						password: ''
					}}
					onSubmit={(value) => {
						this.props.login(value);
					}}
					validationSchema={Yup.object().shape({
						email: Yup.string().email().required('Email must'),
						password: Yup.string().required('Password must').min(8, 'Minimum 8 char ')
					})}
				>
					{({ values, handleSubmit, handleChange, handleBlur, touched, errors }) => (
						<div className="row col-md-12">
							<form onSubmit={handleSubmit} className="col-md-4 offset-md-4">
								{this.state.msg ? <Alert color="danger">{this.state.msg}</Alert> : null}
								<input
									type="email"
									name="email"
									onChange={handleChange}
									value={values.email}
									onBlur={handleBlur}
									placeholder="Enter a email"
									className={errors.email && touched.email && 'error'}
									className="form-control"
								/>
								{errors.email &&
								touched.email && <div className="input-feedback text-light mt-3">{errors.email}</div>}
								<br />
								<input
									type="password"
									name="password"
									onChange={handleChange}
									onBlur={handleBlur}
									value={values.password}
									placeholder="Enter a password"
									className={errors.password && touched.password && 'error'}
									className="form-control"
								/>
								{errors.password &&
								touched.password && (
									<div className="input-feedback text-light mt-3">{errors.password}</div>
								)}
								<br />
								<button className="btn btn-dark btn-md" type="submit">
									Login
								</button>
							</form>
						</div>
					)}
				</Formik>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		isAuthenticated: state.auth.isAuthenticated,
		data: state.auth,
		error: state.error
	};
};

export default connect(mapStateToProps, { login, clearError })(Login);
