import React, {Component, useState} from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";
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
import Header from './Header.js';

import '../CSS/App.css';

class App extends Component {

	constructor() {
		super();
		this.state = {
			firstTime:false,
			navbar: false,
			user:{},
			uid:"",
			redirect:"",
			header:false
		}
	}

	componentDidMount(){
		const that = this;
		firebase.auth().onAuthStateChanged(this.setUpState.bind(this));
	}

	logOut(){
		firebase.auth().signOut().then(function() {
		  // Sign-out successful.
		  this.setState({user: {}})
		  console.log('signed out');
		}).catch(function(error) {
		  // An error happened.
		});
	}

	setUpState(user){
		this.setState({ user : user, uid:user.uid});
		let uid = this.state.user.uid;
		console.log(uid);

		base.update(`users/${uid}`,{
			data:{ uid: user.uid, email: user.email}
		});
		if (user) {
				base.fetch(`users/${uid}`,{
					context:this,
					asArray:false,
					then(data){
						console.log(data)
						console.log(data.ft);
						this.setState({ user:{
							uid:user.uid,
							email: user.email,
							...data
							},
							uid:user.uid,
							ft:user.ft	
						});
					}
				})
				console.log(this.state.user)
			} else {
		    	// No user is signed in.
		    	this.setState({ user: {}, redirect : "/"});

		    	console.log(this.state.user);
			}
	}

	setFtUser(info){
		let uid = this.state.user.uid;
		let user = this.state.user;
		console.log(uid);
		base.fetch(`users/${uid}`, {
			context: this,
			asArray:false,
			then(data){
				console.log(data);
				this.setState({ user:{...user, ...data}})
			}
		})
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
		  console.log(errorCode, errorMessage)
		});
	}

	uidSet(props){
		console.log('it is doing something');
	}



  render() {
  	let user = this.state.user;
  	let uid = this.state.uid === ""? (this.uidSet()) : this.state.uid;
  	let header = this.state.header;
  	var first = this.state.ft ? false : true;
  	console.log(uid)

  	// if (uid.length > 0){
  	// 	console.log(user)
  	// }

  	const Gist = ({match}) => (
  		<div> {match.params.uid} </div>
  	)
  	return (
  		<Router>
	    	<div className="App">
		    	<div className="header">{ header ? <Header /> : null} </div>
		    	<Logout logOut={this.logOut.bind(this)}/>
	    		<Route exact path='/' render={(pickles) =>( uid ? (<Redirect to={`/${uid}`} />) : (<Login signin={this.signin.bind(this)} signup={this.signup.bind(this)}/>)) } />
	    		<Route path='/:uid' render={({match}) => ( first ? (<Redirect to='/:uid/firsttime' />):(<UserProfile  state={this.state} id={match.params.uid}/>) )}/>
	    		<Route path ='/:uid' component = {Gist} />
	    		<Route path='/:uid/firstTime' render={({match})=> <FirstTime id={match.params.uid} user={user} setFtUser={this.setFtUser.bind(this)}/> }/>
	    	</div>
	    </Router>
  		);
  	}
}

export default App
