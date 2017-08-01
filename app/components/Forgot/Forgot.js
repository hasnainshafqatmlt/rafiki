import React, { Component } from 'react';

class Forgot extends Component {

	constructor(props) {
    super(props);

    this.state = {
      showForm: true
    };
  }

	render() {
		return (
			<div className="forgot-block">
				{this.state.showForm &&
					<div className='container'>
						<h1 className='col-sm-12 text-center heading-1'>{'Restablece tu contraseña'}</h1>
						<h2 className='col-sm-12 text-center'>{'Te enviaremos un email para restablecerla'}</h2>
						<div className='col-sm-12 form'>
							<div className='center'>
								<div className="form-group">
							    <input
							    	type="email"
							    	className="form-control"
							    	placeholder="Email"
							   	/>
								</div>
								<button type="submit" className="btn btn-success col-100">
									{'Enviar'}
								</button>
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

export default Forgot;

