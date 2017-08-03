import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Servicios extends Component {

	constructor(props) {
    super(props);

    this.state = {

    };
  }

	render() {
		return (
			<div className="servicios-block">
				<div className='container'>
					<h1 className='col-sm-12 text-center heading-1'>						
						{'Mis Servicios'}
					</h1>
					<ul className='status'>
						<li>
							<i className='green'/>
							<span> Al aire</span>
						</li>
						<li>
							<i className='red'/>
							<span> Rechazado</span>
						</li>
						<li>
							<i className='yellow'/>
							<span> En revisión</span>
						</li>
					</ul>
					<div className='float-left col-100'>
						<table className='table'>
						  <tbody>
						    <tr>
						      <td width='40px'>
						      	<img src='/images/edit-icon.png' className='icon' />
						      </td>
						      <td width='40px'>
						      	<img src='/images/del-icon.png' className='icon' />
						      </td>
						      <td width='40px'>
						      	<i className='status-icon green'/>
						      </td>
						      <td>
						      	<Link to='/vistaPrevia'>
						      		Nombre de Servicio 1  asdfasdf
						      	</Link>
						      </td>
						    </tr>
						    <tr>
						      <td>
						      	<img src='/images/edit-icon.png' className='icon' />
						      </td>
						      <td>
						      	<img src='/images/del-icon.png' className='icon' />
						      </td>
						      <td>
						      	<i className='status-icon red'/>
						      </td>
						      <td>
						      	<Link to='/vistaPrevia'>
						      	Nombre de Servicio 1  asdfasdf
						      	</Link>
						      </td>
						    </tr>
						    <tr>
						      <td>
						      	<img src='/images/edit-icon.png' className='icon' />
						      </td>
						      <td>
						      	<img src='/images/del-icon.png' className='icon' />
						      </td>
						      <td>
						      	<i className='status-icon yellow'/>
						      </td>
						      <td>
						      	<Link to='/vistaPrevia'>
						      	Nombre de Servicio 1  asdfasdf
						      	</Link>
						      </td>
						    </tr>
						  </tbody>
						</table>
					</div>

					<div className='float-left col-100 text-center'>
						<Link
							to='/areas'
							className='add-btn'
						>
							<i className='plus-icon' />
							<span>Agregar otro servicio</span>
						</Link>
					</div>
				</div>
			</div>
		);
	}
}

export default Servicios;

