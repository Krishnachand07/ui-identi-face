import React, { Component } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import { addProfile } from '../../action/profileAction';
import { Alert } from 'reactstrap';

class AddProfile extends Component {
	state = {
		msg: null,
		alert: false,
		image: null
	};

	componentDidUpdate(prevProps) {
		const { error } = this.props;
		if (error !== prevProps.error) {
			if (error.id === 'PROFILE_FAIL') {
				this.setState({ msg: error.msg.msg });
			} else {
				this.setState({ msg: null });
			}
		}
	}

	componentWillReceiveProps(nextProps) {
		console.log(nextProps.profSucc);
		if (nextProps.profSucc) {
			this.setState({ alert: true });
		}
	}
	render() {
		return (
			<div className="container" style={{ marginTop: '120px' }}>
				<Formik
					initialValues={{
						name: '',
						phone: '',
						dob: '',
						gender: '',
						email: '',
						address: '',
						file: ''
					}}
					onSubmit={(value) => {
						this.props.addProfile(value);
					}}
					validationSchema={Yup.object().shape({
						name: Yup.string().required('Name needed'),
						phone: Yup.string().max(10, 'Phone number has 10 digit value').required('Phone number must'),
						dob: Yup.string().required('Date of Birth needed'),
						email: Yup.string().email().required('Email must needed'),
						address: Yup.string().required('Address must'),
						gender: Yup.string().required('Gender Must')
					})}
				>
					{({ values, handleSubmit, handleChange, handleBlur, setFieldValue, errors, touched }) => {
						return (
							<div className="col-md-12 row">
								<form
									className="form-group col-md-4"
									onSubmit={handleSubmit}
									encType="mulyipart/form-data"
								>
									<h3 className="text-light mb-4">New Profile</h3>
									{this.state.msg ? <Alert color="danger">{this.state.msg}</Alert> : null}
									<Alert color="success" isOpen={this.state.alert}>
										Profile Added
									</Alert>
									<input
										type="text"
										name="name"
										onChange={handleChange}
										className={errors.name && touched.name && 'error'}
										className="form-control"
										value={values.name}
										placeholder="Enter a Name"
										onBlur={handleBlur}
									/>
									{errors.name && touched.name && <div className="mt-1">{errors.name}</div>}
									<br />
									<input
										type="number"
										name="phone"
										onChange={handleChange}
										className={errors.phone && touched.phone && 'error'}
										className="form-control"
										value={values.phone}
										placeholder="Enter phone number"
										onBlur={handleBlur}
									/>
									{errors.phone && touched.phone && <div className=" mt-1">{errors.phone}</div>}
									<br />
									<input
										type="date"
										name="dob"
										onChange={handleChange}
										className={errors.dob && touched.dob && 'error'}
										className="form-control"
										value={values.dob}
										placeholder="Enter Date of Birth"
										onBlur={handleBlur}
									/>
									{errors.dob && touched.dob && <div className=" mt-1">{errors.dob}</div>}
									<br />
									<div className="form-inline">
										<input
											type="radio"
											name="gender"
											onChange={handleChange}
											className={errors.gender && touched.gender && 'error'}
											className="form-check-input form-control"
											value="male"
										/>
										<label className="text-light form-inline mr-5">Male</label>
										<input
											type="radio"
											name="gender"
											onChange={handleChange}
											className={errors.gender && touched.gender && 'error'}
											className="form-check-input form-control"
											value="female"
										/>
										<label className="text-light form-inline">Female</label>
										{errors.gender &&
										touched.gender && <div className=" ml-2">{errors.gender}</div>}
									</div>
									<input
										type="email"
										name="email"
										onChange={handleChange}
										className={errors.email && touched.email && 'error'}
										className="form-control mt-4"
										value={values.email}
										placeholder="Enter an Email"
										onBlur={handleBlur}
									/>
									{errors.email && touched.email && <div className=" mt-1">{errors.email}</div>}
									<br />
									<textarea
										type="text"
										name="address"
										onChange={handleChange}
										className={errors.address && touched.address && 'error'}
										className="form-control"
										value={values.address}
										placeholder="Enter a Address"
										onBlur={handleBlur}
									/>
									{errors.address && touched.address && <div className=" mt-1">{errors.address}</div>}
									<br />
									<input
										type="file"
										name="file"
										required
										onChange={(e) => {
											if (e.target.files && e.target.files[0]) {
												let reader = new FileReader();
												reader.onload = (e) => {
													this.setState({ image: e.target.result });
												};
												reader.readAsDataURL(e.target.files[0]);
												setFieldValue('file', e.target.files[0]);
												console.log(e.target.files[0]);
											}
										}}
									/>
									<button className="btn btn-dark btn-md mt-3" type="submit">
										Submit
									</button>
								</form>
							</div>
						);
					}}
				</Formik>
			</div>
		);
	}
}

export const mapStateToProps = (state) => {
	console.log(state.prof);
	return {
		profSucc: state.prof.profSucc,
		error: state.error,
		data: state.prof
	};
};

export default connect(mapStateToProps, { addProfile })(AddProfile);
