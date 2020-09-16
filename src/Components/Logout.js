import React, {Component} from 'react';
import { BrowserRouter as Router} from 'react-router-dom';
// import {Redirect} from 'react-router';
 import $ from 'jquery';
// import {base , app } from '../rebase';
import firebase from 'firebase';

class Logout extends Component {

	constructor(){
		super();
		this.state = {

		}
	}

	componentDidMount(){
		const that = this;

		$('.logout-button').on('click', function(){
			that.logOut();
		});
	}

	logOut(){
		this.props.logOut();
	}
	
	render(){
		return(
			<Router>
				<div>
					<button className="logout-button"> Log Out </button>
				</div>
			</Router>
		)
	}
}

export default Logout