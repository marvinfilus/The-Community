import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import {Redirect} from 'react-router';
import $ from 'jquery';
import {base , app } from '../rebase';
import firebase from 'firebase';


import 'jquery/dist/jquery.js';
import 'popper.js/dist/umd/popper.js';


import Login from './Login.js';
import Logout from'./Logout.js';
import UserProfile from'./UserProfile.js';

import '../CSS/App.css';

class App extends Component {

	constructor() {
		super();
		this.state = {
			user:{},
			uid:false,
			redirect:""
		}
	}

	componentDidMount(){
		const that = this;
		const state = this.state;
		console.log($(this));
		$('.button').on('click', function(){
			console.log("it worked")
		})

		firebase.auth().onAuthStateChanged(function(user) {
		  if (user) {
		    // User is signed in.
		    console.log(user.uid);

		    that.setState({ user:user, redirect : '/'+user.uid});
		    console.log('/'+that.state.user.uid);
		  } else {
		    // No user is signed in.
		    that.setState({ uid : false})
		    console.log('no user', state.uid )
		  }
		});
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
  	const user = this.state.user;
  	const redirect = this.state.redirect;
  	const uid = user.uid;
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
	    		<Route exact path='/' render={(pickles) =>( uid ? (<Redirect to={`/${uid}`} />) : (<Login signin={this.signin.bind(this)} signup={this.signup.bind(this)}/>)) } />
	    		<Route path='/:uid' render={(pickles) => ( uid  ? ( <UserProfile />) : (<Redirect to="/"/>) )} />
	    	</div>
	    </Router>
  		);
  	}
}

export default App
