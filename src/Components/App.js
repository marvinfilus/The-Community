import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import {Redirect} from 'react-router';
import $ from 'jquery';
import {base , app } from '../rebase';
import firebase from 'firebase';


import 'jquery/dist/jquery.js';
import 'popper.js/dist/umd/popper.js';

import FirstTime from './FirstTime.js';
import Login from './Login.js';
import Logout from'./Logout.js';
import UserProfile from'./UserProfile.js';

import '../CSS/App.css';

class App extends Component {

	constructor() {
		super();
		this.state = {
			firstTime:true,
			navbar: false,
			user:{marvin:'marvin'},
			uid:false,
			redirect:"",
			
		}
	}

	componentDidMount(){
		const that = this;
		let state = this.state;
		console.log($(this));

		//to hide the nav bar
		// $('.nav-bar-app').hide();

		firebase.auth().onAuthStateChanged(function(user) {
			if (user) {
				let users = user;
	    	// User is signed in.
				// $('.nav-bar-app').show();
				that.setState({ user:user, redirect:user.uid ,uid:user.uid});
		    	console.log(that.state.redirect, that.state.user);
			} else {
		    	// No user is signed in.
		    	that.setState({ uid : false, redirect : "/"});
		    	console.log(that.state.uid);
			}
		});
	}

	logOut(){
		firebase.auth().signOut().then(function() {
			  // Sign-out successful.
			  console.log('logged out')
			}).catch(function(error) {
			  // An error happened.
		});

	}

	setFtUser(data,ft){
		let user = this.state.user;
		this.setState({ user: {...user, ...data}, firstTime:false});
		console.log(user);
	}

	signin(user,pass){
		firebase.auth().signInWithEmailAndPassword(user, pass).catch(function(error) {
		  // Handle Errors here.
		  var errorCode = error.code;
		  var errorMessage = error.message;
		  console.log(errorCode, errorMessage);
		  // ...
		});
	}

	signup(username,password){
		console.log(username,password);
			firebase.auth().createUserWithEmailAndPassword(username, password).catch(function(error) {
		  // Handle Errors here.
		  var errorCode = error.code;
		  var errorMessage = error.message;
		  console.log(errorCode, error.message)
		});
	}



  render() {
  	let user = this.state.user;
  	let redirect = this.state.redirect;
  	let uid = user.uid;
  	let firstTime = this.state.firstTime;
  	console.log(this.state)
  	// if( redirect ){
  	// 	console.log(redirect)
  	// 	return (
  	// 		<Router> 
  	// 			<Redirect to={redirect} />
  	// 		</Router>
  	// 	)
  	// }
  	return (
  		<Router>
	    	<div className="App">
		    	<nav className="navbar nav-bar-app navbar-expand-lg navbar-dark static-top">
					  <div className="container">
					    <a className="navbar-brand" href="#">
					          <img src="http://placehold.it/150x50?text=Logo" alt=""/>
					        </a>
					    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
					          <span className="navbar-toggler-icon"></span>
					        </button>
					    <div className="collapse navbar-collapse" id="navbarResponsive">
					      <ul className="navbar-nav ml-auto">
					        <li className="nav-item active">
					          <a className="nav-link" href="#">Home
					            <span className="sr-only">(current)</span>
					          </a>
					        </li>
					        <li className="nav-item">
					          <a className="nav-link" href="#">About</a>
					        </li>
					        <li className="nav-item">
					          <a className="nav-link" href="#">Services</a>
					        </li>
					        <li className="nav-item">
					          <a className="nav-link" href="#">Contact</a>
					        </li>
					        <li className="nav-item">
					          <a className="nav-link" href="#"><Logout logOut={this.logOut.bind(this)}/></a>
					        </li>
					      </ul>
					    </div>
					  </div>
					</nav>
	    		<Route exact path='/' render={(pickles) =>( uid ? (<Redirect to={`/${uid}`} />) : (<Login signin={this.signin.bind(this)} signup={this.signup.bind(this)}/>)) } />
	    		<Route path='/:uid' render={(pickles) => ( firstTime ?  (<Redirect to="/:uid/firstTime"/>) : ( <UserProfile logOut={this.logOut.bind(this)} />) )} />
	    		<Route path='/:uid/firstTime' render={(pickles)=> <FirstTime user={user} setFtUser={this.setFtUser.bind(this)}/> }/>
	    	</div>
	    </Router>
  		);
  	}
}

export default App
