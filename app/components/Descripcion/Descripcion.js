import React, { Component } from 'react';

class Description extends Component {

	constructor(props) {
    super(props);

    this.state = {
      showForm: true
    };
  }

	render() {
		return (
			<div className="description-block">
				{this.state.showForm &&
					<div className='container'>
						<h1 className='col-sm-12 text-center heading-1'>{'Describe de tu servicio'}</h1>
						<h2 className='col-sm-12 text-center'>{'Entre más específico seas, más clientes tendrás'}</h2>
						<div className='col-sm-12 form'>
							<div className='center'>
								<div className="form-group">
								    <input
								    	type="text"
								    	className="form-control"
								    	placeholder="TÍTULO:  por ejemplo “Soy tu Social Media Manager”"
								   	/>
								</div>
								<div className="form-group">
								    <textarea
								    	className="form-control"
								    	placeholder="DESCRIPCIÓN: 
										que incluye, que lo hace especial, requisitos,
										tiempo de entrega, etc."
								   	/>
								</div>
								<div className="form-group">
								  	<div className='col-lg-6 col-md-6 col-sm-12 row'>
									  <input
									  	type="text"
									  	className="form-control sm"
									  	placeholder="Precio en USD $"
									  />
									</div>
								</div>
								<div className="form-group">
								  <input
								  	type="text"
								  	className="form-control"
								  	placeholder="Tu Nombre"
								  />
								</div>
								<div className="form-group">
								  <input
								  	type="text"
								  	className="form-control"
								  	placeholder="Tu País"
								  />
								</div>
								<div className="form-group">
								    <textarea
								    	className="form-control"
								    	placeholder="ACERCA DE TI:
										Por ejemplo años de experiencia, 
										en que área es tu mayor conocimiento,
										que te apasiona"
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
								<button type="submit" className="btn btn-success col-100">
									{'Continuar'}
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

export default Description;

