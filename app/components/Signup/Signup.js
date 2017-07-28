import React, { Component } from 'react';
import TextField from 'material-ui/TextField';

class Signup extends Component {

	constructor(props) {
    super(props);

    this.state = {
      value: 'Property Value',
    };
  }

	 handleChange = (event) => {
	    this.setState({
	      value: event.target.value,
	    });
	 };


	render() {
		return (
			<div className="signup-block">
				<div className='container'>
					<div className='row'>
						<h1 className='col s12 text-center'>{'Abre tu cuenta, es gratis!'}</h1>
						<div className='col s12 form'>
							<div className='center'>
								<div className='input-field col s6'>
						          <input placeholder='Placeholder' id='first_name' type='text' className='validate'/>
						          <label htmlFor="first_name">First Name</label>
						        </div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Signup;

