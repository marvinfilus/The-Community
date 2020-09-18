import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import {Redirect} from 'react-router';
import $ from 'jquery';
import {base , app } from '../rebase';
import firebase from 'firebase';

import Logout from './Logout.js';


import "../CSS/UserProfile.css"

class UserProfile extends Component {
	constructor(props){
		super(props);
		this.state = {

		}
	}

	componentDidMount(props){
		const that = this;
		console.log(that.props.state);
		that.setUpState(that.props)
	}



	logOut(){
		this.props.logOut.bind(this);
	}

	setUpState(props){
		console.log(props.id);
			base.fetch(`users/${props.id}`, {
			context: this,
			asArray: false,
			then(data){
				console.log(data)
				this.setState({user: {...data}});
				// console.log(this.props.match.params)
			}
		})
	}

	render(){
		const name = 'Marvin';
		const birth = this.state.birth;
		const birthPlace = this.state.birthPlace;
		const location = this.state.location;
		return(
			<Router>
				<div className="user-container">
					

					<h1 className="my-4">Welcome
					    <small>{name}</small>
					  </h1>

					  <div className="row">

					    <div className="col-md-8">
					      <img className="img-fluid" src="http://placehold.it/750x500" alt=""/>
					    </div>

					    <div className="col-md-4">
					      <h3 className="my-3">Project Description</h3>
						<p> Project desciption </p>
					      <h3 className="my-3">Project Details</h3>
					      <ul>
					        <li className="li-one">{name}</li>
					        <li className="li-two">{}</li>
					        <li className="li-three">{birthPlace}</li>
					        <li className="li-four">{location} </li>
					      </ul>
					    </div>

					  </div>

					  <h3 className="my-4">Related Projects</h3>

					  <div className="row">

					    <div className="col-md-3 col-sm-6 mb-4">
					      <a href="#">
					            <img className="img-fluid" src="http://placehold.it/500x300" alt=""/>
					          </a>
					    </div>

					    <div className="col-md-3 col-sm-6 mb-4">
					      <a href="#">
					            <img className="img-fluid" src="http://placehold.it/500x300" alt=""/>
					          </a>
					    </div>

					    <div className="col-md-3 col-sm-6 mb-4">
					      <a href="#">
					            <img className="img-fluid" src="http://placehold.it/500x300" alt=""/>
					          </a>
					    </div>

					    <div className="col-md-3 col-sm-6 mb-4">
					      <a href="#">
					            <img className="img-fluid" src="http://placehold.it/500x300" alt=""/>
					          </a>
					    </div>

					  </div>
				</div>
			</Router>
		)
	}
}

export default UserProfile