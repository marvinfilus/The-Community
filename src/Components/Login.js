import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import {Redirect} from 'react-router';
import $ from 'jquery';
import '../CSS/Login.css';

class Login extends Component {

	constructor(){
		super()
		this.state = {
			user:"",
			pass:""
		}
	}

	componentDidMount(){

		$('.signup-card').hide();
		$('.mid-login-form').hide();
		$('.pass-match').hide();

		const that = this
		$(".sign-up-enterButton").on('click',function(e){
			e.preventDefault();
			let username = $('.user-name-signup').val();
			let password = $('.pass-word-signup').val();
			let passtwo = $('.pass-two-signup').val();
			console.log(username,password,passtwo)
			if(password === passtwo){
				that.setState({ user : username, pass : password });
				that.signup();
			} else{
				$('.pass-match').show();
				console.log('nope');
				console.log(password , passtwo);
			}
		})

		$('.login-enterButton').on('click',function(e){
			e.preventDefault();
			console.log('clicked');
			let user = $('.user-name-login').val();
			let pass = $('.pass-word-login').val();
			that.props.signin(user , pass);
		})

		$('.log-in-button').on('click',function(){
			$('.login-card').hide();
			$('.signup-card').show();
			// $('.signup-user-div').show();
			// $('.login-user-div').hide();
		});

		$('.sign-up-button').on('click',function(e){
			e.preventDefault();
			$('.signup-card').hide(); 
			$('.login-card').show();
		})
	}

	signin(){
		let username = this.state.user;
		let password = this.state.pass;
		this.props.signin(username,password)
	}

	signup(){
		let username = this.state.user;
		let password = this.state.pass;
		this.props.signup(username, password);
	}

	render(){
		return(
			<div className="container">
			    <div className="login-card row">
			      <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
			        <div className="card card-signin my-5">
			          <div className="card-body">
			            <h5 className="card-title text-center">Sign In</h5>
			            <form className="form-signin">
			              <div className="form-label-group">
			              <p> Email address </p>
			                <input type="email" id="inputEmail" className="user-name-login form-control" placeholder="Email address" autoFocus/>
			              </div>

			              <div className="form-label-group">
			              <p> Password </p>
			                <input type="password" id="inputPassword" className="pass-word-login form-control" placeholder="Password" />
			              </div>

			              <button className="login-enterButton btn btn-lg btn-primary btn-block text-uppercase" type="submit">Sign in</button>
			              <hr className="my-4"/>
			               <button className="btn btn-lg btn-google btn-block text-uppercase" type="submit"><i className="fab fa-google mr-2"></i> Sign in with Google</button>
			              <button className="btn btn-lg btn-facebook btn-block text-uppercase" type="submit"><i className="fab fa-facebook-f mr-2"></i> Sign in with Facebook</button>
			              <button className=" log-in-button btn btn-lg btn-google btn-block text-uppercase" type="button"><i className="fab fa-google mr-2"></i> Click here to log in for the first time</button>
			            </form>
			          </div>
			        </div>
			      </div>
			    </div>


			    <div className=" signup-card row">
			      <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
			        <div className="card card-signin my-5">
			          <div className="card-body">
			            <h5 className="card-title text-center">Sign Up</h5>
			            <form className="form-signin">
			              <div className="form-label-group">
			              <p> Email address</p>
			                <input type="email" id="inputEmail" className="user-name-signup form-control" placeholder="Email address"  />
			              </div>

			              <div className="form-label-group">
			              <p> Password </p>
			                <input type="password" id="inputPassword" className="pass-word-signup form-control" placeholder="Password" />
			                <label htmlFor="inputPassword">Password</label>
			              </div>

			              <div className="form-label-group">
			              <p> Please confirm your password </p>
			                <input type="password" id="inputPassword" className="pass-two-signup form-control" placeholder="Password" />
			                <label htmlFor="inputPassword">Password</label>
			              </div>
			              <button className="sign-up-enterButton btn btn-lg btn-primary btn-block text-uppercase" type="button">Sign Up</button>
			              <hr className="my-4"/>
			              <button className="btn btn-lg btn-google btn-block text-uppercase" type="button"><i className="fab fa-google mr-2"></i> Sign in with Google</button>
			              <button className="btn btn-lg btn-google btn-block text-uppercase" type="button"><i className="fab fa-google mr-2"></i> Sign in with Facebook</button>
			              <button className="sign-up-button btn btn-lg btn-facebook btn-block text-uppercase" type="button"><i className="fab fa-facebook-f mr-2"></i> Already have an account? Click here to log in.</button>

			            </form>
			          </div>
			        </div>
			      </div>
			    </div>	
			</div>

		)
	}
}

export default Login