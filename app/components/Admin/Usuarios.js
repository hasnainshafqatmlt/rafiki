import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Usuarios extends Component {

	constructor(props) {
    super(props);

    this.state = {

    };
  }

	render() {
		return (
			<div className="admin-usuarios">
				<div className='container'>
					<h1 className='col-sm-12 text-center heading-1'>						
						{'Usuarios'}
					</h1>
					<div className='float-left col-100'>
						<table className='table'>
							<thead>
								<th> Usuario </th>
								<th> Pais </th>
								<th>Email</th>
								<th width='170'> Ventas</th>
								<th width='40'><img src='/images/download-icon.png'/></th>
							</thead>
						  <tbody>
						    <tr>
						      <td>
						      	Name of user
						      </td>
						      <td>
						      	Country 1
						      </td>
						      <td> email-user@gmail.com</td>
						      <td>
						      	<input type='number' className='form-control number' />
						      	<img src='/images/tick-icon.png' className='icon tick' />
						      </td>
						      <td>
						      	<img src='/images/del-icon.png' className='icon' />
						      </td>
						    </tr>
						    <tr>
						      <td>
						      	Name of user
						      </td>
						      <td>
						      	Country 1
						      </td>
						      <td> email-user@gmail.com</td>
						      <td>
						      	<input type='number' className='form-control number' />
						      	<img src='/images/tick-icon.png' className='icon tick' />
						      </td>
						      <td>
						      	<img src='/images/del-icon.png' className='icon' />
						      </td>
						    </tr>
						    <tr>
						      <td>
						      	Name of user
						      </td>
						      <td>
						      	Country 1
						      </td>
						      <td> email-user@gmail.com</td>
						      <td>
						      	<input type='number' className='form-control number' />
						      	<img src='/images/tick-icon.png' className='icon tick' />
						      </td>
						      <td>
						      	<img src='/images/del-icon.png' className='icon' />
						      </td>
						    </tr>
						    
						    
						    
						  </tbody>
						</table>
					</div>
				</div>
			</div>
		);
	}
}

export default Usuarios;

