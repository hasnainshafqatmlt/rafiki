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
					        <h3>Encuentra</h3>
					        <p>Encuentra el servicio de Marketing Digital que necesitas</p>
					      </div>
					      <div className="col-lg-4 col-md-12 col-sm-12 animate-fadeInUp">
					        <i>2</i>
					        <h3>Encuentra</h3>
					        <p>Compra el servicio en nuestra red del top 5% de expertos</p>
					      </div>
					      <div className="col-lg-4 col-md-12 col-sm-12 animate-fadeInRight">
					        <i>3</i>
					        <h3>Encuentra</h3>
					        <p>Recibe tu servicio. Solo pagas si estás feliz! </p>
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
				        Cero riezgo para ti 
				        <img src="/images/tick-icon@2x.png" width="24" className="tick-icon" />
				      </li>
				      <li className="animate-fadeInUp">
				        El experto recibe tu pago solo si estas 100% feliz
				        <img src="/images/tick-icon@2x.png" width="24" className="tick-icon" />
				      </li>
				      <li className="animate-fadeInUp">
				        Si no estas satisfecho, te devolvemos el 100% del dinero
				        <img src="/images/tick-icon@2x.png" width="24" className="tick-icon" />
				      </li>
				    </ul>
				    <div className="float-left w-100 text-center animate-fadeIn">
				      <a href="#"><button type="button" className="btn btn-success"> Quiero iniciar</button></a>
				    </div>
				  </div>
				</div>

				<div className="float-left w-100 banner-block">
				  <div className="container">
				    <div className="text">Text goes here - text here - fixed position, in any screen size</div>
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
					      <h3>Top 5%</h3>
					      <p>Los mejores expertos a tu servicio </p>
					    </div>
				    </div>
				  </div>
				</div>

				<div className="float-left w-100 contact-info-block">
				  <div className="container">
				    <h2 className="text-center animate-fadeInUp">¿Quieres ser tu propio jefe?</h2>
				    <div className="float-left w-100 text-center">
				      <a href="#"><button type="button" className="btn btn-success fixed animate-fadeInRight"> Quiero mi cuenta gratis </button></a>
				    </div>
				  </div>
				</div>

				<div className="float-left w-100 social-info-block">
				  <div className="container animate-fadeInUp">
				    <a href="#" className="twitter"></a>
				    <a href="#" className="fb"></a>
				    <a href="#" className="gplus"></a>
				  </div>
				</div>
			</div>
		);
	}
};

export default Home;
