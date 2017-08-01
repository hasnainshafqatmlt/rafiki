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
						<h2 className='col-sm-12 text-center'>{'Aquí puedes actualizar tus datos'}</h2>
						<div className='col-sm-12 form'>
							<div className='center'>
								<div className="form-group">
								    <input
								    	type="text"
								    	className="form-control"
								    	placeholder="País"
								   	/>
								</div>
								<div className="form-group">
								    <input
								    	type="text"
								    	className="form-control"
								    	placeholder="Nombre"
								   	/>
								</div>
								<div className="form-group">
								    <textarea
								    	className="form-control"
								    	placeholder="ACERCA DE TI.  Por ejemplo: 
										-años de experiencia
										-que te apasiona
										-en que area tienes tu mayor conocimiento"
								   	/>
								</div>
								<div className='upload-pic'>
									<i>
										<img src='/images/profile-pic.png' className='icon'/>
									</i>
									<div className='float-left'>
										<h3>{'Foto de perfil o logo'}</h3>
										<p>{'Tamaño preferido: 200x200 px'}</p>
									</div>
									<span>{'Adjuntar'}</span>
									<input type='file'/>
								</div>

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

