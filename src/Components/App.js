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
import Header from './Header.js';

import '../CSS/App.css';

class App extends Component {

	constructor() {
		super();
		this.state = {
			firstTime:false,
			navbar: false,
			user:{},
			uid:false,
			redirect:"",
			header:false
		}
	}

	componentDidMount(){
		const that = this;
		firebase.auth().onAuthStateChanged(function(user) {
			if (user) {
				base.fetch(`users/${user.uid}`,{
					context:this,
					asArray:false,
					then(data){
						console.log(data)
						if(data.ft === true){
							console.log(data.ft);
							that.setState({ user:{
								uid:user.uid,
								email: user.email,
								...data
								}	
							});
						} else {
							that.setState({ user:{
								uid:user.uid,
								email: user.email,
								ft:false,
								...data
								}	
							});
						}
						console.log(that.state.user)
					}
				});
			} else {
		    	// No user is signed in.
		    	that.setState({ user: {}, redirect : "/"});

		    	console.log(that.state.user);
			}
		});

		if(!that.state.user.ft){
			that.setState({user: {...that.state.user, ft: false}});
			console.log(that.state.user);
		}
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



  render() {
  	let user = this.state.user;
  	let uid = user.uid;
  	let header = this.state.header;
  	console.log(user.ft)

  	const Gist = ({match}) => (
  		<div> {match.params.uid} </div>
  	)
  	return (
  		<Router>
	    	<div className="App">
		    	<div className="header">{ header ? <Header /> : null} </div>
		    	<Logout logOut={this.logOut.bind(this)}/>
	    		<Route exact path='/' render={(pickles) =>( uid ? (<Redirect to={`/${uid}`} />) : (<Login signin={this.signin.bind(this)} signup={this.signup.bind(this)}/>)) } />
	    		<Route path='/:uid' component={UserProfile}/>
	    		<Route path ='/:uid' component = {Gist} />
	    		<Route path='/:uid/firstTime' render={(pickles)=> <FirstTime user={user} setFtUser={this.setFtUser.bind(this)}/> }/>
	    	</div>
	    </Router>
  		);
  	}
}

export default App
