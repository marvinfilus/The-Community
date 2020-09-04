import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import {Redirect} from 'react-router';
 import $ from 'jquery';
import {base , app } from '../rebase';
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
			firebase.auth().signOut().then(function() {
			  // Sign-out successful.
			  console.log('logged out')
			}).catch(function(error) {
			  // An error happened.
			});
		});
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