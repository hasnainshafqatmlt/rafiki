import React, { Component } from 'react';

class Ventas extends Component {

	constructor(props) {
    super(props);

    this.state = {

    };
  }

	render() {
		return (
			<div className="ventas-block">
				<div className='container'>
					<h1 className='col-sm-12 text-center heading-1'>						
						{'Mis Ventas'}
					</h1>
					<h2 className='col-sm-12 text-center'>						
						{'Total de tus ventas hasta hoy'}
					</h2>
					
					<div className='float-left col-100 price text-center'>
						$10
					</div>

					<div className='float-left col-100 text-center'>
						<a
							href='#'
							className='add-btn'
						>
							<i className='plus-icon' />
							<span>Aumenta tus ventas incluyendo más servicios</span>
						</a>
					</div>
				</div>
			</div>
		);
	}
}

export default Ventas;

