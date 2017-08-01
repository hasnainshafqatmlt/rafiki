import React, { Component } from 'react';

class VistaPrevia extends Component {

	constructor(props) {
    super(props);

    this.state = {

    };
  }

	render() {
		return (
			<div className="vista-previa-block">
				<div className='container'>
					<h1 className='col-sm-12 text-center heading-1'>{'Vista previa'}</h1>
					<h2 className='col-sm-12 text-center'>{'Envíanos tu servicio. El equipo de Kogno lo revisará antes de salir al aire'}</h2>					
				</div>
				<hr className='top-horizental-line'/>
				<div className='float-left col-100'>
					<div className='container'>
						<ol className='breadcrumb'>
						  <li className='breadcrumb-item'><a href='#'>SEM & AdWords</a></li>
						  <li className='breadcrumb-item'><a href='#'>Instagram</a></li>
						  <li className='breadcrumb-item active'>Social Media Manager</li>
						</ol>
						<div className='info-block float-left col-100'>
							<i className='thumb'>
								<img src='/images/profile-pic-lg.png' className='icon'/>
							</i>
							<div className='float-left col-100'>
								<h3>Titulo por ejemplo:  Social Account Manager para IG y FB</h3>
								<small>User Name,  en User Country</small>
								<price>$ 99</price>
								<p>
									Description text here.  Description text here.  Description text here.  Description text here.  Description text here.  Description text here.  
								</p>
								<p>
									Description text here.  Description text here.  Description text here.  Description text here.  Description text here. 
								</p>
								<strong>Acerca de mi:</strong>
								<p>About us description here.   About us description here.   About us description here.   About us description here.   </p>
								<a
									href='#'
									className='btn btn-gray'
								>
									Comprar
								</a>
							</div>
						</div>
					</div>
				</div>
				<hr className='bottom-horizental-line'/>
				<div className='float-left col-100 actions'>
					<div className='container'>
						<button
							type='button'
							className='btn btn-secondary sm'
						>
							Editar
						</button>
						<button
							type='button'
							className='btn btn-success sm'
						>
							Enviar
						</button>
					</div>	
				</div>

			</div>
		);
	}
}

export default VistaPrevia;

