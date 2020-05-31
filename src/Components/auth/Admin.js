import React, { Component } from 'react';
import store from '../../store';
import { connect } from 'react-redux';
import { adminUser } from '../../action/authAction';
import { Modal, Button, ModalFooter, ModalBody, ModalHeader } from 'reactstrap';
import { getProfile, profileDetails } from '../../action/profileAction';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import * as ReactBootstrap from 'react-bootstrap';

class Admin extends Component {
	state = {
		modal: false
	};
	componentDidMount() {
		store.dispatch(adminUser);
		this.props.getProfile();
		this.props.profileDetails();
	}
	toggle = () => this.setState({ modal: !this.state.modal });
	rowEvents = {
		onClick: () => this.toggle()
	};
	col = [ { dataField: 'person', text: 'Visitor' }, { dataField: 'localtime', text: 'Timing and Date' } ];
	columns = [
		{
			dataField: 'file',
			formatter: (cell) => {
				const base64 = new Buffer(cell.data.data, 'base64').toString('base64');
				return (
					<img
						src={`data:image;base64, ${base64}`}
						style={{ borderRadius: '50%', width: '60px', height: '60px', verticalAlign: 'middle' }}
					/>
				);
			},
			text: 'Profile'
		},
		{
			dataField: 'name',
			text: 'Name',
			style: { color: 'white', verticalAlign: 'middle' }
		},
		{
			dataField: 'gender',
			text: 'Gender',
			style: { color: 'white', verticalAlign: 'middle' }
		},
		{
			dataField: 'email',
			text: 'Email',
			style: { color: 'white', verticalAlign: 'middle' }
		},
		{
			dataField: 'phone',
			text: 'Phone Number',
			style: { color: 'white', verticalAlign: 'middle' }
		}
	];
	render() {
		return (
			<div className="container mt-5">
				<Modal isOpen={this.state.modal}>
					<ModalHeader toggle={() => this.toggle()}>Known visitor</ModalHeader>
					<ModalBody>
						<BootstrapTable
							keyField="_id"
							columns={this.col}
							data={this.props.detail}
							pagination={paginationFactory({
								sizePerPage: 5
							})}
							hover
							striped
							bordered={false}
						/>
					</ModalBody>
					<ModalFooter>
						<Button color="secondary" onClick={() => this.toggle()}>
							Close
						</Button>
					</ModalFooter>
				</Modal>
				<h3 className="text-light" style={{ marginTop: '170px' }}>
					Profiles
				</h3>

				<div className="mt-4">
					<BootstrapTable
						bordered={false}
						striped
						hover
						rowEvents={this.rowEvents}
						pagination={paginationFactory({
							sizePerPage: 5
						})}
						columns={this.columns}
						keyField="_id"
						data={this.props.profList}
					/>
				</div>
			</div>
		);
	}
}

export const mapStateToProps = (state) => {
	console.log(state);
	return {
		loading: state.auth.isLoading,
		profList: state.prof.profList,
		detail: state.prof.visitors
	};
};

export default connect(mapStateToProps, { getProfile, profileDetails })(Admin);
