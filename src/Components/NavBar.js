import React, { Component, Fragment } from 'react';
import { Navbar, Container, NavItem, Nav, Collapse, NavbarToggler } from 'reactstrap';
import { Logout } from './auth/Logout';
import { Link } from 'react-router-dom';
import { BsBoxArrowInLeft, BsPersonPlusFill, BsPersonPlus } from 'react-icons/bs';

class NavBar extends Component {
	state = {
		isOpen: false
	};
	nav = () => {
		if (window.localStorage.getItem('token')) {
			return (
				<Nav navbar>
					<NavItem>
						<Link to="/profile" title="Add Profile" className="nav-link text-light">
							<BsPersonPlus size="25px" />
						</Link>
					</NavItem>
					<NavItem>
						<Logout />
					</NavItem>
				</Nav>
			);
		} else {
			return (
				<Nav navbar>
					<NavItem>
						<Link to="/register" title="Register" className="nav-link text-light">
							<BsPersonPlusFill size="25px" />
						</Link>
					</NavItem>
					<NavItem>
						<Link to="/login" title="Login" className="nav-link text-light">
							<BsBoxArrowInLeft size="25px" />
						</Link>
					</NavItem>
				</Nav>
			);
		}
	};

	toggle = () => {
		this.setState({ isOpen: !this.state.isOpen });
	};
	navBrand = () => {
		if (window.localStorage.getItem('token')) {
			return (
				<Fragment>
					<Link to="/admin" className="nav-brand text-light nav-link">
						<h1>Admin</h1>
					</Link>
				</Fragment>
			);
		} else {
			return (
				<Fragment>
					<Link to="/" className="nav-brand text-light nav-link">
						<h1>iDentiFace</h1>
					</Link>
				</Fragment>
			);
		}
	};

	render() {
		return (
			<div>
				<Navbar color="dark" dark fixed="top" expand="md">
					<Container>
						{this.navBrand()}
						<NavbarToggler onClick={() => this.toggle()} />
						<Collapse navbar isOpen={this.state.isOpen}>
							{this.nav()}
						</Collapse>
					</Container>
				</Navbar>
			</div>
		);
	}
}

export default NavBar;
