import React, { Component, Fragment } from 'react';
import { NavLink } from 'reactstrap';
import { BsBoxArrowInLeft, BsBoxArrowRight } from 'react-icons/bs';

export class Logout extends Component {
	render() {
		return (
			<Fragment>
				<NavLink
					className="text-light"
					title="Logout"
					onClick={() => {
						window.localStorage.removeItem('token');
						window.location.reload();
					}}
					href="#"
				>
					<BsBoxArrowRight size="25px" />
				</NavLink>
			</Fragment>
		);
	}
}

export default Logout;
