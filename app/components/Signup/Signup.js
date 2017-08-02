import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Signup extends Component {

	constructor(props) {
    super(props);

    this.state = {
      showForm: true
    };
  }

	render() {
		return (
			<div className="signup-block">
				{this.state.showForm &&
					<div className='container'>
						<h1 className='col-sm-12 text-center heading-1'>{'Abre tu cuenta, es gratis!'}</h1>
						<div className='col-sm-12 form'>
							<div className='center'>
								<div className="form-group">
							    <input
							    	type="email"
							    	className="form-control"
							    	placeholder="Email"
							   	/>
								</div>
								<div className="form-group">
								  <input
								  	type="password"
								  	className="form-control"
								  	placeholder="Clave"
								  />
								</div>
								<button type="submit" className="btn btn-success col-100">
									{'Crear cuenta'}
								</button>
								<p className='text-center'>
								 	{'¿Ya tienes cuenta?  '}
								 	<Link to='/login'>
								 		{'Iniciar sesión'}
								 	</Link>
								 </p>
							</div>
						</div>
					</div>
				}
				{!this.state.showForm &&
					<div className='container message'>
						<h1 className='col-sm-12 text-center'>{'¡Has tomado la decisión correcta!'}</h1>
						<div className='col-sm-12 form'>
							<p>{'Te hemos enviado el link para activar tu cuenta. Revisa tu email'}</p>
							<small>{'Si no lo ves en tu inbox, revisa la bandeja de spam'}</small>
						</div>
					</div>
				}

			</div>
		);
	}
}

export default Signup;

