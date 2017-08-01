import React, { Component } from 'react';

class Felicitaciones extends Component {

	constructor(props) {
    super(props);

    this.state = {

    };
  }

	render() {
		return (
			<div className="felicitaciones-block">
				<div className='container'>
					<h1 className='col-sm-12 text-center heading-1'>{'¡Felicitaciones!'}</h1>
					<h2 className='col-sm-12 text-center'>{'Revisaremos tu servicio y en 24 horas te confirmaremos via email si ha sido aprobado'}</h2>					
				</div>
				<div className='float-left col-100'>
					<div className='container'>
						<div className='float-left col-100 text-center'>
							<a
								href='#'
								className='add-btn'
							>
								<i className='plus-icon' />
								<span>Agregar otro servicio</span>
							</a>
						</div>
					</div>
				</div>

			</div>
		);
	}
}

export default Felicitaciones;

