import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Alert } from 'reactstrap';
import { Spinner } from 'react-bootstrap';
import { register } from '../../action/authAction';
import { clearError } from '../../action/errorAction';
import { Link } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';

class Register extends Component {
	state = {
		msg: null,
		alert: false
	};

	componentDidUpdate(prevProps) {
		const { error } = this.props;
		if (error !== prevProps.error) {
			if (error.id === 'REGISTER_FAIL') {
				this.setState({ msg: error.msg.msg });
			} else {
				this.setState({ msg: null });
			}
		}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.isRegistered) {
			this.setState({ alert: true });
		}
	}
	render() {
		return (
			<div className="col-md-12 row" style={{ marginTop: '250px' }}>
				<Formik
					initialValues={{ email: '', login: '', password: '' }}
					onSubmit={(value) => {
						this.props.register(value);
					}}
					validationSchema={Yup.object().shape({
						email: Yup.string().required('Email must').email(),
						password: Yup.string().required('Password must').min(8, 'Minimum 8 chars'),
						login: Yup.string().required('Username must')
					})}
				>
					{({ values, handleSubmit, handleChange, handleBlur, errors, touched }) => (
						<form className="col-md-4 offset-md-4" onSubmit={handleSubmit}>
							{this.state.msg ? <Alert color="danger">{this.state.msg}</Alert> : null}
							<Alert color="success" isOpen={this.state.alert}>
								Register Success click here to <Link to="/login">Login</Link>
							</Alert>
							<input
								type="email"
								name="email"
								value={values.email}
								onChange={handleChange}
								onBlur={handleBlur}
								placeholder="Enter an Email"
								className={errors.email && touched.email && 'error'}
								className="form-control"
							/>
							{errors.email &&
							touched.email && <div className="input-feedback text-light mt-3">{errors.email}</div>}
							<br />
							<input
								type="text"
								name="login"
								value={values.login}
								onChange={handleChange}
								onBlur={handleBlur}
								placeholder="Enter a Username"
								className={errors.login && touched.login && 'error'}
								className="form-control"
							/>
							{errors.login &&
							touched.login && <div className="input-feedback text-light mt-3">{errors.login}</div>}
							<br />
							<input
								type="password"
								name="password"
								value={values.password}
								onChange={handleChange}
								onBlur={handleBlur}
								placeholder="Enter a Password"
								className={errors.password && touched.password && 'error'}
								className="form-control"
							/>
							{errors.password &&
							touched.password && <div className="input-feedback text-light mt-3">{errors.password}</div>}
							<br />
							<button className="btn btn-dark btn-md" type="submit">
								Register{'  '}
								{this.props.loading ? <Spinner size="sm" animation="grow" variant="light" /> : ''}
							</button>
						</form>
					)}
				</Formik>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	console.log(state);
	return {
		loading: state.auth.isLoading,
		isRegistered: state.auth.isRegistered,
		error: state.error
	};
};

export default connect(mapStateToProps, { register, clearError })(Register);
