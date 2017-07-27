import cx from 'classnames'
import React, { Component, PropTypes } from 'react'
import { Grid, Row, Col } from 'react-bootstrap'
import Helmet from 'react-helmet'
import { Typeahead } from 'react-typeahead'
import axios from 'axios';

import AuthActionCreator from '../../../actions/AuthActionCreator';
import AuthStore from '../../../stores/AuthStore';
import ActionTypes from '../../../constants/ActionTypes';

import Validation from './RegisterValidation';


export default class RegisterStepOne extends Component {

	constructor () {
		super();
		this.state = {
			form: {
				email: '',
				role: '',
				entrepreneur: '',
				investor: '',
				advisor: '',
				others: '',
				firstName: '',
				lastName: '',
				receiveNotification: true
				graduationYear: '',
				education: '',

				formErrors: {
					email: '',
					role: '',
					entrepreneur: '',
					investor: '',
					advisor: '',
					others: '',
					firstName: '',
					lastName: '',
					receiveNotification: ''
					graduationYear: '',
					education: '',
				},

				emailValid: false,
				roleValid: false,
				entrepreneurValid: false,
				investorValid: false,
				advisorValid: false,
				othersValid: false,
				firstNameValid: false,
				lastNameValid: false,
				receiveNotificationValid: false,
				graduationYearValid: false,
				educationValid: false,

				formValid: false,

				loading: false,
				errorMsg: false
			}
		}
	}


	handleUserInput = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		this.setState({[name]: value}, () => { this.validateField(name, value) });
	}

	validateField(fieldName, value) {
		let validation = Validation(this.state, fieldName, value);

		this.setState({ ...validation }, this.validateForm);
	}

	validateForm() {
		this.setState({formValid: this.state.emailValid && this.state.passwordValid});
	}

	errorClass(error) {
		return(error.length === 0 ? '' : 'has-error');
	}

	state = {
		locations: [],
		query: '',
		lastKey: 0
	}

	componentDidMount() {
		const { location, routes } = this.props;
	}

	handleKeyUp(event) {
		const value = event.target.value
		const now = new Date().getTime()
		const diff = now - this.state.lastKey
		if (value.length > 2 && diff > 500 && value !== this.state.query) {
			this.setState({
				query: value,
				lastKey: now
			}, () => {
				axios('http://localhost:3333/api/v2/locations', {
					params: {
						q: value
					}
				})
				.then( (data) => {
					this.setState({
						locations: JSON.parse(data)
					})
				})
				.catch( (err) => {
					console.log('get location err', err)
				})
			})
		}
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.registering && !nextProps.registering && nextProps.registered) {
			this.props.pushState('/register/success')
		}
	}

	handleFormSubmit(values) {
		const dispositions = []
		if (values.entrepreneur) dispositions.push('entrepreneur')
		if (values.vc) dispositions.push('vc')
		if (values.ba) dispositions.push('business-angel')
		if (values.advisor) dispositions.push('advisor')
		if (values.investor) dispositions.push('investor')
		if (values.contributor) dispositions.push('contributor')

		const data = {
			email: values.email,
			firstName: values.firstName,
			lastName: values.lastName,
			role: values.role,
			dispositions,
			password: values.password,
			location: values.location,
			receiveNotification: values.receiveNotification,
			graduationYear: values.graduationYear,
		}

		//this.props.submitRegister(data)
	}

	errorClass(error) {
		return(error.length === 0 ? '' : 'has-error');
	}

	render() {

		const email = {}
		const password = {}
		const repassword = {}
		const firstName = {};
		const lastName = {}
		const location = {}
		const education = {}
		const graduationYear = {}
		const role = {}
		const dispositions = {}
		const entrepreneur = {}
		const investor = {};
		const advisor = {};
		const others = {};
		const receiveNotification = {};
		const registering = null;
		const errorText = '';
		const formErrors = {
			email: ''
		}

		const { locations } = this.state

		return (

			<div className="stepOne">
				<Helmet title="Registration" />
				<Row className='header'>
					<Col xs={12}>
						<div className='title'>Ahoy!</div>
						<div className='sub'>Welcome onboard, matey! First tell us more about you.</div>
					</Col>
				</Row>

				<div className='regForm'>

					<form onSubmit={this.handleFormSubmit.bind(this)} className='registerFormOne'>
						<div className={`form-group ${this.errorClass(formErrors.email)}`}>
							<div className="col-100">
								<input
									type="email"
									placeholder="Email"
									className="form-control text-field"
									name="email"
									value={email}
									onChange={this.handleUserInput}
								/>
							</div>
						</div>
						<div className="container-fluid">
							<div className="row">
								<div className={'form-group' + (email.touched && email.error ? ' has-error' : '')}>
									<label className="control-label">My INSEAD email</label>
									<div>This email will act as your unique ID on INSEADERS. We will not spam you, promise!</div>
									<div className="col-xs-12 col-sm-8 col-sm-push-2">
										{this.props.email ?
											<div>
												<input
													type="text"
													placeholder="Email"
													disabled={disabledEmail}
													className={cx('inputEmail', 'form-control')}
													{...email}
												/>
												<span className='enableEmail' onClick={enableEmail}>change</span>
											</div>
										:
											<input
												type="text"
												placeholder="Email"
												className={cx('inputEmail', 'form-control')}
												{...email}
											/>
										}

										{email.touched && email.error && <span className="help-block" dangerouslySetInnerHTML={{__html: email.error}} />}
									</div>

								</div>
							</div>







							<div className="row">
					            <label className="control-label">My account's password</label>
					            <div>Please provide password for your profile.</div>
					            <div className="col-xs-12 col-sm-6">
					              <div className={'form-group' + (password.touched && password.error ? ' has-error' : '')}>
					                <input
					                  type="password"
					                  placeholder="Password"
					                  className="form-control"
					                  {...password}
					                  />
					                {password.touched && password.error && <span className="help-block">{password.error}</span>}
					              </div>
					            </div>
					            <div className="col-xs-12 col-sm-6">
					              <div className={'form-group' + (repassword.touched && repassword.error ? ' has-error' : '')}>
					                <input
					                  type="password"
					                  placeholder="Retype password"
					                  className="form-control"
					                  {...repassword}
					                  />
					                {repassword.touched && repassword.error && <span className="help-block">{repassword.error}</span>}
					              </div>
					            </div>
					          </div>
					          <div className="row">
					            <label className="control-label">My name is</label>
					            <div>Names are important. After all that's what us homosapiens use to identify each other.</div>
					            <div className="col-xs-12 col-sm-6">
					              <div className={'form-group' + (firstName.touched && firstName.error ? ' has-error' : '')}>
					                <input
					                  type="text"
					                  placeholder="First name"
					                  className="form-control"
					                  {...firstName}
					                  />
					              </div>
					            </div>
					            <div className="col-xs-12 col-sm-6">
					              <div className={'form-group' + (lastName.touched && lastName.error ? ' has-error' : '')}>
					                <input
					                  type="text"
					                  placeholder="Last name"
					                  className="form-control"
					                  {...lastName}
					                  />
					              </div>
					            </div>
					          </div>
					          <div className="row">
					            <div className={'form-group' + (role.touched && role.error ? ' has-error' : '')}>
					              <label className="control-label">My main role in INSEAD is</label>
					              <div>This is only for our information, there's no noticable differences in how you use the platform.</div>
					              <div className="col-xs-12 col-sm-4">
					                {role.value === 'student' ?
					                  <input type="radio" id="role-student" className={'btnRadio'} {...role} value="student" checked />
					                  :
					                  <input type="radio" id="role-student" className={'btnRadio'} {...role} value="student" />
					                }
					                <label htmlFor="role-student" className={cx('btn btn-default', 'btn')}>I'm a student/alumni</label>
					              </div>
					              <div className="col-xs-12 col-sm-4">
					                {role.value === 'faculty' ?
					                  <input type="radio" id="role-faculty" className={'btnRadio'} {...role} value="faculty" checked />
					                  :
					                  <input type="radio" id="role-faculty" className={'btnRadio'} {...role} value="faculty" />
					                }
					                <label htmlFor="role-faculty" className={cx('btn btn-default', 'btn')}>I'm a faculty member</label>
					              </div>
					              <div className="col-xs-12 col-sm-4">
					                {role.value === 'friend' ?
					                  <input type="radio" id="role-friend" className={'btnRadio'} {...role} value="friend" checked />
					                  :
					                  <input type="radio" id="role-friend" className={'btnRadio'} {...role} value="friend" />
					                }
					                <label htmlFor="role-friend" className={cx('btn btn-default', 'btn')}>I'm a friend of INSEAD</label>
					              </div>
					            </div>
					          </div>
					          {role.value !== 'friend' &&
					            <div className="row">
					              <div className={'form-group' + (education.touched && education.error ? ' has-error' : '')}>
					                <label className="control-label">My education is</label>
					                <div style={{width: '80%', textAlign: 'center', margin: '0 auto'}}>MBA, EMBA, or Executive Education</div>

					                <div className="col-sm-6 col-sm-push-3 col-xs-12">
					                  <select className="form-control" name="education" {...education}>
					                    <option value=""></option>
					                    <option value="emba">EMBA</option>
					                    <option value="mba">MBA</option>
					                    <option value="ee">Executive Education</option>
					                  </select>
					                </div>
					              </div>
					            </div>
					          }
					          {education.value && education.value === 'mba' &&
					            <div className="row">
					              <div className={'form-group' + (graduationYear.touched && graduationYear.error ? ' has-error' : '')}>
					                <label className="control-label">My graduation year is</label>
					                <div style={{width: '80%', textAlign: 'center', margin: '0 auto'}}>Let fellow INSEADERS know when you graduate.</div>

					                <div className="col-sm-6 col-sm-push-3 col-xs-12">
					                  <select className="form-control" name="graduationYear" {...graduationYear}>
					                    {GRADUATION_YEARS.map((y, i) => (
					                      <option value={i}>{y}</option>
					                    ))}
					                  </select>
					                </div>
					              </div>
					            </div>
					          }
					          <div className="row">
					            <div className={'form-group' + (location.error && location.touched ? ' has-error' : '')}>
					              <label className="control-label">I'm based at</label>
					              <div style={{width: '80%', textAlign: 'center', margin: '0 auto'}}>Let fellow INSEADERS know where you are usually found to improve networking relevancy.</div>

					              <div className="col-sm-6 col-sm-push-3 col-xs-12">
					                <Typeahead
					                  options={locations}
					                  maxVisible={5}
					                  placeholder="City or region name"
					                  value={location.value}
					                  onKeyUp={this.handleKeyUp.bind(this)}
					                  onOptionSelected={(data) => {
					                    location.onChange(data)
					                  }}
					                  className={'location'}
					                  />
					              </div>
					            </div>
					          </div>
					          <div className="row">
					            <div className={'form-group' + (dispositions.error ? ' has-error' : '')}>
					              <label className="control-label">I want to be active on INSEADERS as</label>
					              <div>You can choose more than one, we won't judge.</div>
					              <div className="col-xs-5 col-xs-offset-1 col-sm-3 col-sm-offset-0">
					                <label className={cx('checkbox-inline', 'checkboxInline')}>
					                  <input type="checkbox" {...entrepreneur} />
					                  Entrepreneur
					                </label>
					              </div>
					              <div className="col-xs-5 col-sm-3">
					                <label className={cx('checkbox-inline', 'checkboxInline')}>
					                  <input type="checkbox" {...investor} />
					                  Investor
					                </label>
					              </div>
					              <div className="col-xs-4 col-xs-offset-2 col-sm-3 col-sm-offset-0">
					                <label className={cx('checkbox-inline', 'checkboxInline')}>
					                  <input type="checkbox" {...advisor} />
					                  Advisor
					                </label>
					              </div>
					              <div className="col-xs-4 col-sm-3">
					                <label className={cx('checkbox-inline', 'checkboxInline')}>
					                  <input type="checkbox" {...others} />
					                  Others
					                </label>
					              </div>
					            </div>
					          </div>
					          <hr />
					          <div className="row">
					            <div className="col-xs-12">
					              <label className={cx('checkbox-inline', 'checkboxInline')}>
					                <input type="checkbox" {...receiveNotification} />
					                I want to receive message notifications by email
					              </label>
					            </div>
					            <div className="col-xs-10 col-xs-push-1">
					              <div>By clicking on the button below, you have read, understood and agree to INSEADERS’ <a href="/terms-conditions" target="_blank"><strong>terms and conditions</strong></a>, as well as our <a href="/policy" target="_blank"><strong>privacy policy</strong></a>.</div>
					              <button type="submit" className={cx('btn btn-primary', 'btn')} disabled={registering}>I agree, let me join INSEADERS</button>
					              {errorText}
					            </div>
					          </div>








						</div>
					</form>
				</div>

			</div>
		)
	}
}
