import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Home extends Component {

	componentDidMount() {

	}
	render () {
		return (
			<div className='home-block'>
				<div className='hero-section float-left w-100'>
					<div className='container'>
						<h1 className='heading-2'>Gana dinero con tu conocimiento en Marketing Digital </h1>
						<div className='row'>
							<div className='col-sm-12 col-md-7 col-lg-6'>
								<ul className='list'>
									<li>
										Sé tu propio jefe 
									</li>
									<li>
										Decide tu horario 
									</li>
									<li>
										Trabaja desde cualquier sitio
									</li>
								</ul>
								<div className='float-left w-100'>
									<Link to='/signup'>
										<button className='btn btn-success'>
											Crea tu cuenta, es gratis!
										</button>
									</Link>
								</div>
							</div>
							<div className='col-sm-12 col-md-5 col-lg-6'>
								<img src='/images/photo.png' className='photo'/>
							</div>
						</div>
					</div>
				</div>
				<div className="float-left w-100 como-block">
				  <div className="container">
				    <h2 className="animate-fadeIn">Como funciona</h2>
				    <section className="float-left w-100">
				      <div className='row'>
					      <div className="col-lg-4 col-md-12 col-sm-12 animate-fadeInLeft">
					        <i>1</i>
					        <h3>Crea tu cuenta</h3>
					        <p>Publica gratis tus mejores servicios de Marketing Digital</p>
					      </div>
					      <div className="col-lg-4 col-md-12 col-sm-12 animate-fadeInUp">
					        <i>2</i>
					        <h3>Trabaja en lo que te gusta</h3>
					        <p>Te conectamos con clientes que buscan tus servicios</p>
					      </div>
					      <div className="col-lg-4 col-md-12 col-sm-12 animate-fadeInRight">
					        <i>3</i>
					        <h3>Gana dinero</h3>
					        <p>Al completar tu servicio recibes tu pago de inmediato</p>
					      </div>
				      </div>
				    </section>
				  </div>
				</div>

				<div className="float-left w-100 seguro-block">
				  <div className="container">
				    <h2 className="animate-fadeInLeft">100% seguro</h2>
				    <h3 className="animate-fadeInRight">Tu tranqulidad primero</h3>
				    <ul>
				      <li className="animate-fadeInUp">
				        Cero riezgo para ti. Tus clientes pagan antes de que inicies el trabajo 
				        <img src="/images/tick-icon@2x.png" width="24" className="tick-icon" />
				      </li>
				      <li className="animate-fadeInUp">
				        Siempre te quedas con el 80% de tus ventas
				        <img src="/images/tick-icon@2x.png" width="24" className="tick-icon" />
				      </li>
				      <li className="animate-fadeInUp">
				        Trabaja el tiempo que quieras, desde cualquier sitio del mundo
				        <img src="/images/tick-icon@2x.png" width="24" className="tick-icon" />
				      </li>
				    </ul>
				    <div className="float-left w-100 text-center animate-fadeIn">
				      <Link to="/signup">
				      	<button type="button" className="btn btn-success"> Quiero iniciar</button>
				      </Link>
				    </div>
				  </div>
				</div>

				<div className="float-left w-100 banner-block">
				  <div className="container">
				    <div className="text">Gana dinero desde cualquier sitio!</div>
				  </div>
				</div>

				<div className="float-left w-100 bussiness-block">
				  <div className="container">
				    <div className='row'>
					    <div className="col-lg-3 col-md-12 col-sm-12 first animate-fadeInLeft">
					      <h3>22</h3>
					      <p>Paises</p>
					    </div>
					    <div className="col-lg-5 col-md-12 col-sm-12 second animate-fadeInUp">
					      <h3>$50 Billones</h3>
					      <p>Compras anuales de Marketing Digital en el mundo</p>
					    </div>
					    <div className="col-lg-4 col-md-12 col-sm-12 animate-fadeInRight">
					      <h3>117.800</h3>
					      <p>Clientes buscando tus servicios</p>
					    </div>
				    </div>
				  </div>
				</div>

				<div className="float-left w-100 contact-info-block">
				  <div className="container">
				    <h2 className="text-center animate-fadeInUp">¿Quieres ser tu propio jefe?</h2>
				    <div className="float-left w-100 text-center">
				      <Link to="/signup">
				      	<button type="button" className="btn btn-success fixed animate-fadeInRight"> Quiero mi cuenta gratis </button>
				      </Link>
				    </div>
				  </div>
				</div>
			</div>
		);
	}
};

export default Home;
