import React, {Component} from 'react';
import { BrowserRouter as  Link } from 'react-router-dom';
import {Redirect} from 'react-router';
import $ from 'jquery';
import firebase from 'firebase';

import Logout from './Logout.js';

class Header extends Component {
	constructor(){
		super();
		this.state = {
			user:{}
		}
	}

	componentDidMount(){
		let that = this;

	}

		logOut(){
		firebase.auth().signOut().then(function() {
			  // Sign-out successful.
			  console.log('logged out')
			}).catch(function(error) {
			  // An error happened.
		}); 
	}

	render (){
		return(
			<div>
				<nav className="navbar nav-bar-app navbar-expand-lg navbar-dark static-top">
					  <div className="container">
					    <a className="navbar-brand" href="/">
					          <img src="http://placehold.it/150x50?text=Logo" alt=""/>
					        </a>
					    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
					          <span className="navbar-toggler-icon"></span>
					        </button>
					    <div className="collapse navbar-collapse" id="navbarResponsive">
					      <ul className="navbar-nav ml-auto">
					        <li className="nav-item active">
					          <Link className="nav-link" href="/">Home
					            <span className="sr-only">(current)</span>
					          </Link>
					        </li>
					        <li className="nav-item">
					          <a className="nav-link" href="/">About</a>
					        </li>
					        <li className="nav-item">
					          <a className="nav-link" href="/">Services</a>
					        </li>
					        <li className="nav-item">
					          <a className="nav-link" href="/">Contact</a>
					        </li>
					        <li className="nav-item">
					          <a className="nav-link" href="/"><Logout logOut={this.logOut.bind(this)}/></a>
					        </li>
					      </ul>
					    </div>
					  </div>
					</nav>
			</div>
		)
	}
}

export default Header