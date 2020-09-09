import React, {Component} from 'react';
// import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import {Redirect} from 'react-router';
import $ from 'jquery';
import {base , app } from '../rebase';
import firebase from 'firebase';

import '../CSS/FirstTime.css';

class FirstTime extends Component {

	constructor(props){
		super(props);
		console.log(props)
		this.state = {
			user:{},
			fname:"",
			lname:"",
			dob:"",
			bcity:"",
			ccity:"",
			bStateVal:"",
			cStateVal:"",
			gender:"",
			school:"",
			job:"",
			card1:0,
			card2:0,
			card3:0,
			redirect: false
		}
	}

	// static getDerivedStateFromProps(props, state){
	// 	console.log(props.user.uid);
	// 	if (props.user !== state.user) {
	// 	  console.log(state);
	//       return {
	//         user: props.user,
	//       };
	//     }
	//     console.log(state)
	// }

	componentDidMount(props){
		const that = this;
		let user = that.state.user;

		$('.complete-info-card').hide();
		// firstCard
		$('.button-one-ft').on('click',function(e){
			let fname = $('.input-fname-ft').val();
			let lname = $('.input-lname-ft').val();
			let dob = $('.input-dob-ft').val();
			let user = that.state.user
			if (fname !== "" && lname !== "" && dob !== "") {
					that.setState({user: {...user, fname:fname, lname:lname, dob:dob, card1:1}});
			} 
			console.log(that.state)
			that.nextFt();
		})

				console.log(that.state)

		// second card
		$('.button-two-ft').on('click',function(e){
			let bcity = $('.input-bcity-ft').val();
			let ccity = $('.input-ccity-ft').val();
			let bStateVal = $('.state-one').val();
			let cStateVal = $('.state-two').val();
			if(bcity !== "" && ccity !== "" && bStateVal !== "" && cStateVal !== ""){
				that.setState({user: {...user, bcity:bcity,ccity:ccity,bStateVal:bStateVal,cStateVal:cStateVal,card2:2}});
			}
			that.nextFt();
		})
		//third Card
		$('.button-three-ft').on('click',function(){
			let gender = $('.select-gender').val();
			let school = $('.school-ft').val();
			let job = $('.job-ft').val();
			if (gender !== "" && school !== "" && job !== "") {
				that.setState({ user : {...user, gender:gender, school:school, job:job, card3:3}});
			}
			that.nextFt();
		});


		// $('.next-ft').hide();   
		$('.next-ft').on('click',function(){
			let user = that.state.user;
			let ft = false;
			let userFt = {...user,ft}
			that.setState({ redirect : true});
			that.props.setFtUser(userFt);
			console.log(that.state.redirect, user)
		})
	}

	nextFt(){
			let card1 = this.state.card1
			let card2 = this.state.card2
			let card3 = this.state.card3
			// console.log(this.props)

			if (card1 !== 0 && card2 !== 0 && card3 !== 0){
				$('.next-ft').show();
			}
		}

	render(){
		const user = this.state.user;

		if(this.state.redirect !== false){
			return <Redirect to='/' />
		}

		return(
			<div className="container-firsttime">
				<div className="card-container-ft">
				<button className="next-ft"> Next </button>
					<div className="card-box-ft"> 
						<section className="card-ft card-one-ft">
							<h2> Tell us about yourself</h2>
							<div className="div-info-ft div-card-one-info">
								<input className="card-input-ft input-fname-ft" type="text" />
								<p> First name </p>
							</div>
							<div className="div-info-ft div-card-one-info">
								<input  className="card-input-ft input-lname-ft" type="text"/>
								<p> Last name </p>
							</div>
							<div className="div-info-ft div-card-one-info">
								<input  className="card-input-ft input-dob-ft"type="date"  min="1940-01-01" max="2010-12-31" name="birthdate"/>
								<p> Date of birth </p>
							</div>
							<button className="complete-button-ft button-one-ft" type="button">Complete</button>

							<h3> <span className="incomplete-info-card">Incomplete</span> <span className="complete-info-card"> Completed </span> </h3>
						</section>

						<section className="card-ft card-two-ft">
							<h2> Where are you from?</h2>
							<div className="div-info-ft div-card-two-info">
								<input className="card-input-ft input-bcity-ft" type="text"/>
								<p> What city were you born in? </p>
								<select className="state-dropdown state-one">
									<option value="AL">Alabama</option>
									<option value="AK">Alaska</option>
									<option value="AZ">Arizona</option>
									<option value="AR">Arkansas</option>
									<option value="CA">California</option>
									<option value="CO">Colorado</option>
									<option value="CT">Connecticut</option>
									<option value="DE">Delaware</option>
									<option value="DC">District Of Columbia</option>
									<option value="FL">Florida</option>
									<option value="GA">Georgia</option>
									<option value="HI">Hawaii</option>
									<option value="ID">Idaho</option>
									<option value="IL">Illinois</option>
									<option value="IN">Indiana</option>
									<option value="IA">Iowa</option>
									<option value="KS">Kansas</option>
									<option value="KY">Kentucky</option>
									<option value="LA">Louisiana</option>
									<option value="ME">Maine</option>
									<option value="MD">Maryland</option>
									<option value="MA">Massachusetts</option>
									<option value="MI">Michigan</option>
									<option value="MN">Minnesota</option>
									<option value="MS">Mississippi</option>
									<option value="MO">Missouri</option>
									<option value="MT">Montana</option>
									<option value="NE">Nebraska</option>
									<option value="NV">Nevada</option>
									<option value="NH">New Hampshire</option>
									<option value="NJ">New Jersey</option>
									<option value="NM">New Mexico</option>
									<option value="NY">New York</option>
									<option value="NC">North Carolina</option>
									<option value="ND">North Dakota</option>
									<option value="OH">Ohio</option>
									<option value="OK">Oklahoma</option>
									<option value="OR">Oregon</option>
									<option value="PA">Pennsylvania</option>
									<option value="RI">Rhode Island</option>
									<option value="SC">South Carolina</option>
									<option value="SD">South Dakota</option>
									<option value="TN">Tennessee</option>
									<option value="TX">Texas</option>
									<option value="UT">Utah</option>
									<option value="VT">Vermont</option>
									<option value="VA">Virginia</option>
									<option value="WA">Washington</option>
									<option value="WV">West Virginia</option>
									<option value="WI">Wisconsin</option>
									<option value="WY">Wyoming</option>
								</select>
								<p> State </p>
							</div>
							<div className="div-info-ft div-card-two-info">
								<input  className="card-input-ft input-ccity-ft"type="text"/>
								<p> Where do you live now? </p>
								<select className="state-dropdown state-two">
									<option value="AL">Alabama</option>
									<option value="AK">Alaska</option>
									<option value="AZ">Arizona</option>
									<option value="AR">Arkansas</option>
									<option value="CA">California</option>
									<option value="CO">Colorado</option>
									<option value="CT">Connecticut</option>
									<option value="DE">Delaware</option>
									<option value="DC">District Of Columbia</option>
									<option value="FL">Florida</option>
									<option value="GA">Georgia</option>
									<option value="HI">Hawaii</option>
									<option value="ID">Idaho</option>
									<option value="IL">Illinois</option>
									<option value="IN">Indiana</option>
									<option value="IA">Iowa</option>
									<option value="KS">Kansas</option>
									<option value="KY">Kentucky</option>
									<option value="LA">Louisiana</option>
									<option value="ME">Maine</option>
									<option value="MD">Maryland</option>
									<option value="MA">Massachusetts</option>
									<option value="MI">Michigan</option>
									<option value="MN">Minnesota</option>
									<option value="MS">Mississippi</option>
									<option value="MO">Missouri</option>
									<option value="MT">Montana</option>
									<option value="NE">Nebraska</option>
									<option value="NV">Nevada</option>
									<option value="NH">New Hampshire</option>
									<option value="NJ">New Jersey</option>
									<option value="NM">New Mexico</option>
									<option value="NY">New York</option>
									<option value="NC">North Carolina</option>
									<option value="ND">North Dakota</option>
									<option value="OH">Ohio</option>
									<option value="OK">Oklahoma</option>
									<option value="OR">Oregon</option>
									<option value="PA">Pennsylvania</option>
									<option value="RI">Rhode Island</option>
									<option value="SC">South Carolina</option>
									<option value="SD">South Dakota</option>
									<option value="TN">Tennessee</option>
									<option value="TX">Texas</option>
									<option value="UT">Utah</option>
									<option value="VT">Vermont</option>
									<option value="VA">Virginia</option>
									<option value="WA">Washington</option>
									<option value="WV">West Virginia</option>
									<option value="WI">Wisconsin</option>
									<option value="WY">Wyoming</option>
								</select>
								<p> State </p>
							</div>
							<button className="complete-button-ft button-two-ft" type="button">Complete</button>
							
							<h3> <span className="incomplete-info-card">Incomplete</span> <span className="complete-info-card"> Completed </span> </h3>
						</section>
						<section className="card-ft card-three-ft">
							<h2> Tell us about yourself </h2>
							<div className="div-info-ft div-card-three-info">
								<select className="select-gender">
									<option value="male"> Male </option>
									<option value="female"> Female </option>
								</select>
								<p> Gender </p>
							</div>
							<div className="div-info-ft div-card-three-info">
								<input  className="card-input-ft school-ft"type="text"/>
								<p> What School did you attend? </p>
							</div>
							<div className="div-info-ft div-card-three-info">
								<input  className="card-input-ft job-ft"type="text"/>
								<p> Whats your current Job? </p>
							</div>
							<button className="complete-button-ft button-three-ft" type="button">Complete</button>
							<h3> <span className="incomplete-info-card">Incomplete</span> <span className="complete-info-card"> Completed </span> </h3>
						</section>
					</div>
				</div> 
			</div>

		)
	}
}

export default FirstTime