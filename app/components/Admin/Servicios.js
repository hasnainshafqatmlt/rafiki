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
			<div className="admin-servicios">
				<div className='container'>
					<h1 className='col-sm-12 text-center heading-1'>						
						{'Servicios'}
					</h1>
					<div className='float-left col-100'>
						<table className='table'>
							<thead>
								<th> Status 
									<div className='filter-status'>
											<i className='status-icon red'/>
											<i className='status-icon green'/>
											<i className='status-icon yellow'/>
									</div>
								</th>
								<th> ID </th>
								<th>Categoria</th>
								<th> Servicio</th>
								<th>Usuario</th>
								<th><img src='/images/download-icon.png'/></th>
							</thead>
						  <tbody>
						    <tr>
						      <td width='40px'>
						      	<i className='status-icon green'/>
						      </td>
						      <td>
						      	170625001
						      </td>
						      <td>
						      	Social
						      </td>
						      <td>
						      	<Link to='/vistaPrevia'>
						      		Nombre de Servicio 1  asdfasdf  name name name name
						      	</Link>
						      </td>
						      <td>
						      	Nombre Seller
						      </td>
						      <td>
						      	<img src='/images/del-icon.png' className='icon' />
						      </td>
						    </tr>
						    <tr>
						      <td width='40px'>
						      	<i className='status-icon red'/>
						      </td>
						      <td>
						      	170625001
						      </td>
						      <td>
						      	Social
						      </td>
						      <td>
						      	<Link to='/vistaPrevia'>
						      		Nombre de Servicio 1  asdfasdf  name name name name
						      	</Link>
						      </td>
						      <td>
						      	Nombre Seller
						      </td>
						      <td>
						      	<img src='/images/del-icon.png' className='icon' />
						      </td>
						    </tr>
						    <tr>
						      <td width='40px'>
						      	<i className='status-icon yellow'/>
						      </td>
						      <td>
						      	170625001
						      </td>
						      <td>
						      	Social
						      </td>
						      <td>
						      	<Link to='/vistaPrevia'>
						      		Nombre de Servicio 1  asdfasdf  name name name name
						      	</Link>
						      </td>
						      <td>
						      	Nombre Seller
						      </td>
						      <td>
						      	<img src='/images/del-icon.png' className='icon' />
						      </td>
						    </tr>
						    
						  </tbody>
						</table>
					</div>
					
					<div className='float-left col-100'>
						<hr className='top-horizental-line'/>
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
									<ul className='list'>
										<li> Por ejemplo: </li>
										<li>-años de experiencia</li>
										<li>-en que área es tu mayor conocimiento</li>
										<li>-que te apasiona</li>
									</ul>
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
			</div>
		);
	}
}

export default Servicios;

