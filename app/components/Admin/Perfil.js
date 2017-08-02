import React, { Component } from 'react';

class Perfil extends Component {

	constructor(props) {
    super(props);

    this.state = {
      showForm: true
    };
  }

	render() {
		return (
			<div className="perfil-block">
				{this.state.showForm &&
					<div className='container'>
						<h1 className='col-sm-12 text-center heading-1'>{'Mi perfil'}</h1>
						<div className='col-sm-12 form'>
							<div className='center sm'>
								<div className="form-group">
								    <input
								    	type="text"
								    	className="form-control"
								    	placeholder="Email"
								   	/>
								</div>
								<div className="form-group">
								    <input
								    	type="text"
								    	className="form-control"
								    	placeholder="Clave nueva"
								   	/>
								</div>
								
								<button type="submit" className="btn btn-success col-100">
									{'Guardar cambios'}
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

export default Perfil;

