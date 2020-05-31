import React, { Component, Fragment } from 'react';
import { Jumbotron, Button } from 'reactstrap';
import { Link } from 'react-router-dom';

export class Home extends Component {
	button = () => {
		if (!window.localStorage.getItem('token')) {
			return (
				<Fragment>
					<Link to="/login">
						<Button size="lg" color="default">
							<code>&lt; Get_Started &gt;</code>
						</Button>
					</Link>
				</Fragment>
			);
		}
	};
	render() {
		return (
			<div style={{ marginTop: '150px' }}>
				<Jumbotron className="container">
					<h1 className="display-4">FaceTime</h1>
					<p className="lead">
						Facial recognition software is already quite accurate in measuring unchanging and unique ratios
						between facial features that identify you as you!
					</p>
					<hr className="my-2" />
					{this.button()}
				</Jumbotron>
			</div>
		);
	}
}

export default Home;
