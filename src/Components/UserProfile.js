import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import {Redirect} from 'react-router';
import $ from 'jquery';
import {base , app } from '../rebase';
import firebase from 'firebase';

import Logout from './Logout.js';


import "../CSS/UserProfile.css"

class UserProfile extends Component {
	constructor(){
		super();
		this.state = {

		}
	}

	componentDidMount(){
		const that = this;


	}

	render(){
		const name = this.state.name;
		const birth = this.state.birth;
		const birthPlace = this.state.birthPlace;
		const location = this.state.location;
		return(
			<div className="user-container">
				<nav class="navbar navbar-expand-lg navbar-dark bg-dark static-top">
				  <div class="container">
				    <a class="navbar-brand" href="#">
				          <img src="http://placehold.it/150x50?text=Logo" alt=""/>
				        </a>
				    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
				          <span class="navbar-toggler-icon"></span>
				        </button>
				    <div class="collapse navbar-collapse" id="navbarResponsive">
				      <ul class="navbar-nav ml-auto">
				        <li class="nav-item active">
				          <a class="nav-link" href="#">Home
				                <span class="sr-only">(current)</span>
				              </a>
				        </li>
				        <li class="nav-item">
				          <a class="nav-link" href="#">About</a>
				        </li>
				        <li class="nav-item">
				          <a class="nav-link" href="#">Services</a>
				        </li>
				        <li class="nav-item">
				          <a class="nav-link" href="#">Contact</a>
				        </li>
				        <li class="nav-item">
				          <a class="nav-link" href="#"><Logout/></a>
				        </li>
				      </ul>
				    </div>
				  </div>
				</nav>

				<h1 class="my-4">Welcome
				    <small>{name}</small>
				  </h1>

				  <div class="row">

				    <div class="col-md-8">
				      <img class="img-fluid" src="http://placehold.it/750x500" alt=""/>
				    </div>

				    <div class="col-md-4">
				      <h3 class="my-3">Project Description</h3>
					<p> Project desciption </p>
				      <h3 class="my-3">Project Details</h3>
				      <ul>
				        <li className="li-one">{name}</li>
				        <li className="li-two">{birth}</li>
				        <li className="li-three">{birthPlace}</li>
				        <li className="li-four">{location} </li>
				      </ul>
				    </div>

				  </div>

				  <h3 class="my-4">Related Projects</h3>

				  <div class="row">

				    <div class="col-md-3 col-sm-6 mb-4">
				      <a href="#">
				            <img class="img-fluid" src="http://placehold.it/500x300" alt=""/>
				          </a>
				    </div>

				    <div class="col-md-3 col-sm-6 mb-4">
				      <a href="#">
				            <img class="img-fluid" src="http://placehold.it/500x300" alt=""/>
				          </a>
				    </div>

				    <div class="col-md-3 col-sm-6 mb-4">
				      <a href="#">
				            <img class="img-fluid" src="http://placehold.it/500x300" alt=""/>
				          </a>
				    </div>

				    <div class="col-md-3 col-sm-6 mb-4">
				      <a href="#">
				            <img class="img-fluid" src="http://placehold.it/500x300" alt=""/>
				          </a>
				    </div>

				  </div>
			</div>
		)
	}
}

export default UserProfile