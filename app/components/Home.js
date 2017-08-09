import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Home extends Component {

	componentDidMount() {

	}
	render () {
		return (
			<div className='home-block'>
				<div className='container'>
					<h1 className='heading-2'>Gana dinero con tu conocimiento en Marketing Digital </h1>
					<div className='row'>
						<div className='col-sm-6'>
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
							<div className='float-left col-100'>
								<Link to='/signup'>
									<button className='btn btn-success'>
										Crea tu cuenta, es gratis!
									</button>
								</Link>
							</div>
						</div>
						<img src='/images/photo.png' className='photo'/>
					</div>
				</div>
			</div>
		);
	}
};

export default Home;
