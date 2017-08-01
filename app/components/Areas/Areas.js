import React, { Component } from 'react';

class Areas extends Component {

	constructor(props) {
    super(props);

    this.state = {

    };
  }

  socialMediaCategory() {
  	return(
  		<div className='subcategory col-100 float-left'>
				<div className='col-sm-5 float-left'>
					<h3>{'¿En qué Redes?'}</h3>
					<ul className='list'>
						<li>
							<i className='rectangle'/>
							<span>{'Facebook'}</span>
						</li>
						<li className='active'>
							<i className='rectangle'/>
							<span>{'Instagram'}</span>
						</li>
						<li>
							<i className='rectangle'/>
							<span>{'Twitter'}</span>
						</li>
						<li>
							<i className='rectangle'/>
							<span>{'LinkedIn'}</span>
						</li>
						<li>
							<i className='rectangle'/>
							<span>{'YouTube'}</span>
						</li>
						<li>
							<i className='rectangle'/>
							<span>{'G+'}</span>
						</li>
						<li>
							<i className='rectangle'/>
							<span>{'Pinterest'}</span>
						</li>
					</ul>
				</div>
				<div className='col-sm-7 float-left'>
					<h3>{'¿Qué Servicios?'}</h3>
					<ul className='list'>
						<li>
							<i className='rectangle'/>
							<span>{'Conseguir más seguidores / fans / likes'}</span>
						</li>
						<li>
							<i className='rectangle'/>
							<span>{'Promoción a miles o millones de fans'}</span>
						</li>
						<li>
							<i className='rectangle'/>
							<span>{'Creación / Manejo de Cuenta'}</span>
						</li>
						<li>
							<i className='rectangle'/>
							<span>{'Social Media Manager'}</span>
						</li>
						<li>
							<i className='rectangle'/>
							<span>{'Campaña de Paid Ads'}</span>
						</li>
						<li>
							<i className='rectangle'/>
							<span>{'Consulting / Analytics'}</span>
						</li>
						<li>
							<i className='rectangle'/>
							<span>{'Otro'}</span>
						</li>
					</ul>
				</div>
			</div>
  	)
  }

  seoCategory() {
  	return(
  		<div className='subcategory col-100 float-left'>
				<div className='col-sm-12 float-left'>
					<ul className='list'>
						<li>
							<i className='rectangle'/>
							<span>{'Backlinks'}</span>
						</li>
						<li>
							<i className='rectangle'/>
							<span>{'Optimización de sitios web'}</span>
						</li>
						<li>
							<i className='rectangle'/>
							<span>{'Análisis de sitios web'}</span>
						</li>
						<li>
							<i className='rectangle'/>
							<span>{'Mejora de posición en Google'}</span>
						</li>
						<li>
							<i className='rectangle'/>
							<span>{'Estudio de keywords o competidores'}</span>
						</li>
						<li>
							<i className='rectangle'/>
							<span>{'Consultoría / Analytics'}</span>
						</li>
						<li>
							<i className='rectangle'/>
							<span>{'Otro'}</span>
						</li>
					</ul>
				</div>
			</div>
  	)
  }

	render() {
		return (
			<div className="areas-block">
				<div className='container'>
					<div className='row'>
						<h1 className='col-sm-12 text-center heading-1 m-t-60'>{'Elige el área de tu servicio'}</h1>
						<div className='pull-left col-100 form'>
							<div className='center'>
								<ul
									className='category-list'
								>
									<li className='active'>
										<i className='radio'/>
										<span>{'Social Media'}</span>
									</li>
									{this.socialMediaCategory()}
									<li >
										<i className='radio'/>
										<span>{'SEO, Generación de tráfico '}</span>
									</li>
									{this.seoCategory()}
									<li>
										<i className='radio'/>
										<span>{'SEM, AdWords'}</span>
									</li>
									<li>
										<i className='radio'/>
										<span>{'Email Marketing'}</span>
									</li>
									<li>
										<i className='radio'/>
										<span>{'Inbound Marketing, Contenidos'}</span>
									</li>
									<li>
										<i className='radio'/>
										<span>{'Retargeting, Display Programático'}</span>
									</li>
									<li>
										<i className='radio'/>
										<span>{'Influenciadores'}</span>
									</li>
									<li>
										<i className='radio'/>
										<span>{'Video Ads y YouTube'}</span>
									</li>
									<li>
										<i className='radio'/>
										<span>{'Mobile Marketing'}</span>
									</li>
									<li>
										<i className='radio'/>
										<span>{'Otros'}</span>
									</li>
								</ul>
								<div className='float-left col-100 next'>
									<button type="button" className="btn btn-success col-100">
										{'Continuar'}
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Areas;

